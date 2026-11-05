#!/usr/bin/env node
/**
 * Serenity 3D — headless browser verification (no npm dependencies).
 *
 * Starts a local static server, launches Chrome/Chromium with SwiftShader,
 * runs window.Serenity.runSelfTests(), and exercises the DOM. Exits non-zero
 * on any failure. Use --screenshots to refresh docs/screenshot-*.png.
 *
 *   node scripts/verify-browser.mjs
 *   CHROME_PATH="/path/to/Chrome" node scripts/verify-browser.mjs --screenshots
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wantShots = process.argv.includes('--screenshots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser'
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p));
}

async function waitFor(url, timeoutMs) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch (err) { /* not up yet */ }
    await sleep(200);
  }
  throw new Error('Timed out waiting for ' + url);
}

async function main() {
  const chrome = chromePath();
  if (!chrome) {
    console.error('SKIP: Chrome/Chromium not found. Set CHROME_PATH to run browser verification.');
    process.exit(2);
  }

  const port = await freePort();
  const remote = await freePort();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'serenity-chrome-'));
  const server = spawn('python3', ['-m', 'http.server', String(port)], { cwd: root, stdio: 'ignore' });
  let browser;
  let ws;
  let failures = 0;

  try {
    await waitFor('http://127.0.0.1:' + port + '/index.html', 5000);
    browser = spawn(chrome, [
      '--headless=new', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      '--disable-extensions', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
      '--remote-debugging-port=' + remote, '--user-data-dir=' + profile,
      '--window-size=1440,900', 'about:blank'
    ], { stdio: 'ignore' });

    await waitFor('http://127.0.0.1:' + remote + '/json/version', 15000);
    const target = await (await fetch('http://127.0.0.1:' + remote + '/json/new?about:blank', { method: 'PUT' })).json();
    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

    let seq = 0;
    const pending = new Map();
    const errors = [];
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
      }
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        const text = msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ');
        if (!/GPU stall|WebGL context was lost/i.test(text)) errors.push(text);
      }
    });

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (pending.has(id)) { pending.delete(id); reject(new Error('CDP timeout: ' + method)); }
      }, 30000);
    });
    const evaluate = async (expression) => {
      const out = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (out.exceptionDetails) throw new Error(out.exceptionDetails.exception?.description || out.exceptionDetails.text);
      return out.result.value;
    };
    const capture = async (file) => {
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(root, file), Buffer.from(shot.data, 'base64'));
      return file;
    };

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://127.0.0.1:' + port + '/' });

    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      if (await evaluate('!!window.Serenity')) break;
      await sleep(250);
    }

    const result = await evaluate('window.Serenity ? window.Serenity.runSelfTests(false) : null');
    console.log(result ? (result.pass ? 'PASS' : 'FAIL') + ' ' + (result.total - result.failed) + '/' + result.total + ' in-app self-tests' : 'FAIL no app');
    if (!result || !result.pass) {
      if (result) result.checks.filter((c) => !c.pass).forEach((c) => console.error('  ✗ ' + c.name + ' ' + c.detail));
      failures++;
    }

    const dom = await evaluate(`({
      practices: document.querySelectorAll('.practice').length,
      modules: document.querySelectorAll('.module-label').length,
      canvasReady: !!(window.Serenity && window.Serenity.world.ready),
      canvas: [document.querySelector('#scene-canvas').width, document.querySelector('#scene-canvas').height],
      langButton: !!document.querySelector('#langBtn'),
      settings: !!document.querySelector('#settingsDialog')
    })`);
    const domChecks = [
      ['20 practices rendered', dom.practices === 20],
      ['4 modules rendered', dom.modules === 4],
      ['WebGL scene ready', dom.canvasReady],
      ['canvas at viewport size', dom.canvas[0] === 1440 && dom.canvas[1] === 900],
      ['language toggle present', dom.langButton],
      ['settings dialog present', dom.settings]
    ];
    domChecks.forEach(([name, pass]) => {
      if (!pass) { failures++; console.error('  ✗ ' + name); }
    });
    console.log((domChecks.every(([, p]) => p) ? 'PASS' : 'FAIL') + ' ' + domChecks.filter(([, p]) => p).length + '/' + domChecks.length + ' DOM checks');

    // Interaction smoke test: language, mode, thought, session transport.
    const interaction = await evaluate(`(() => {
      const S = window.Serenity;
      S.setLanguage('th');
      document.querySelector('[data-mode="stream"]').click();
      S.addThought('ทดสอบการปล่อยความคิด', 'thought');
      S.start();
      const running = S.state.session.running;
      S.pause();
      const paused = S.state.session.paused;
      S.resume();
      S.end();
      S.setLanguage('en');
      document.querySelector('[data-mode="sky"]').click();
      return { running, paused, ended: S.state.session.complete, log: S.state.log.length, lang: S.state.settings.lang, mode: S.state.settings.mode };
    })()`);
    const interactionOK = interaction.running && interaction.paused && interaction.ended && interaction.log >= 1 && interaction.lang === 'en' && interaction.mode === 'sky';
    if (!interactionOK) { failures++; console.error('  ✗ interaction smoke test', interaction); }
    console.log((interactionOK ? 'PASS' : 'FAIL') + ' session transport + logging smoke test');

    if (wantShots) {
      await evaluate('localStorage.clear()');
      await send('Page.reload');
      await sleep(3500);
      await evaluate(`window.Serenity.addThought('The meeting tomorrow', 'thought')`);
      await sleep(1000);
      console.log('WROTE ' + await capture('docs/screenshot-sky.png'));
      await evaluate(`document.querySelector('[data-mode="stream"]').click(); window.Serenity.addThought('I am not doing enough', 'emotion')`);
      await sleep(1200);
      console.log('WROTE ' + await capture('docs/screenshot-stream.png'));
      await evaluate(`document.querySelector('[data-mode="sanctuary"]').click(); window.Serenity.addThought('My shoulders are tight', 'body')`);
      await sleep(1200);
      console.log('WROTE ' + await capture('docs/screenshot-sanctuary.png'));
      await evaluate(`document.querySelector('#settingsBtn').click()`);
      await sleep(500);
      console.log('WROTE ' + await capture('docs/screenshot-settings.png'));
      await evaluate(`document.querySelector('#settingsDialog').close()`);
      await evaluate(`localStorage.clear(); window.Serenity.setLanguage('en'); document.querySelector('[data-mode="sky"]').click()`);
      if (await evaluate('document.querySelector("#durationValue").textContent') !== '10') {
        await evaluate(`(() => { const s = document.querySelector('#durationSlider'); s.value = '10'; s.dispatchEvent(new Event('input', { bubbles: true })); })()`);
      }
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await sleep(900);
      console.log('WROTE ' + await capture('docs/screenshot-mobile.png'));
    }

    if (errors.length) {
      failures++;
      console.error('FAIL console/runtime errors:');
      errors.slice(0, 10).forEach((e) => console.error('  ✗ ' + e));
    } else {
      console.log('PASS no uncaught runtime errors');
    }

    if (failures) {
      console.error('FAIL ' + failures + ' browser verification group(s)');
      process.exitCode = 1;
    } else {
      console.log('OK browser verification complete');
    }
  } finally {
    try { ws && ws.close(); } catch (err) {}
    try { browser && browser.kill('SIGKILL'); } catch (err) {}
    try { server.kill('SIGKILL'); } catch (err) {}
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('FAIL ' + err.message);
  process.exit(1);
});
