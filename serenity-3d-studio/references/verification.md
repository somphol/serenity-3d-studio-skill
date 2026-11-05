# Verification

Prove four things separately: the content contract, the in-app logic, the real browser, and the visual
composition. A green unit test does not prove the 3D scene isn't blank.

## Layer 1 — content/static check

Write `scripts/check.mjs` with no dependencies. It should:

- assert required files exist;
- resolve every local `src`/`href` in `index.html`;
- resolve every relative Markdown link;
- `node --check` each JS file;
- parse `package.json`;
- extract the `MODULES` literal:

  ```js
  const start = src.indexOf('const MODULES = [');
  const end = src.indexOf('/* Flatten', start);
  const literal = src.slice(start + 'const MODULES = '.length, end).trim().replace(/;\s*$/, '');
  const modules = Function('"use strict"; return (' + literal + ');')();
  ```

- assert 4 modules, 20 practices, 65 cues, exact IDs, bilingual titles/cues, ascending times, 0–90,
  at least 3 cues;
- grep for the timing formula, speechSynthesis, Web Audio oscillator, localStorage, JSON export, all
  three mode names;
- check CSS media queries, reduced motion, glass tokens;
- check screenshots are non-trivial files.

Exit non-zero with a list of failures. Run after every content edit.

## Layer 2 — in-app self-tests

Expose `window.Serenity.runSelfTests(verbose)` and run it from `/?selftest=1` (set the document title to
`PASS …` / `FAIL …`) or the console. The 12 checks:

1. 20 practices loaded.
2. 4 modules present.
3. Every practice has titles in both languages, ≥3 cues, strictly ordered times, 0–90.
4. `scaledCueTime` maps cue 85 to `(85/90)*600` at 10 minutes (within 1e-9).
5. EN/TH key counts equal and every TH value is a string.
6. Every `data-i18n` key in the DOM exists in both tables.
7. English reframing includes “I notice”.
8. Thai reframing starts with “ฉันรู้ทัน”.
9. `formatTime(0) === '00:00'`, `formatTime(605) === '10:05'`.
10. Normalisation clamps `999 → 60`, unknown mode → sky, unknown language → en.
11. Export has version, stats, entries array, `practicesCompleted === 20`.
12. Required DOM landmarks exist.

## Layer 3 — headless browser

Node 22+ has global `fetch` and `WebSocket`; no Puppeteer/Playwright needed.

1. Start `python3 -m http.server <free port>`.
2. Launch Chrome with a temp profile and:
   `--headless=new --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.
3. Connect to `/json/new?about:blank` over the DevTools WebSocket.
4. Enable `Runtime` and `Page`; navigate; poll `!!window.Serenity`.
5. Call `runSelfTests(false)`.
6. Run 6 DOM checks: 20 practice buttons, 4 module labels, `world.ready`, canvas viewport size, language
   toggle, settings dialog.
7. Interaction smoke: `setLanguage('th')` → click stream → add a thought → start/pause/resume/end →
   `setLanguage('en')` → click sky; assert running, paused, ended, log ≥1, language/mode changed.
8. Fail on `Runtime.exceptionThrown` and `console.error`, ignoring GPU stall warnings.
9. Kill browser/server, remove the profile.

The script must start its own server on a free port; otherwise it silently tests another project on a
busy port.

### Screenshots

`--screenshots` should clear localStorage, reload, then capture:

- sky with a thought label, 1440×900;
- stream with a thought, 1440×900;
- sanctuary with a mote, 1440×900;
- settings dialog open, 1440×900;
- mobile 390×844 @2x.

Review each image for: label readability, no detached label, no zebra water, no white-disc orb, no toast
over the HUD, no clipped dialog, Thai wrapping.

## Layer 4 — manual

- 1-minute and 10-minute sessions: cue firing order and spacing.
- Pause freeze (compare countdown over 2 s), resume.
- End after 25 s: recorded; end after 1 s: not recorded.
- Auto-complete: progress 100%, closing gong, streak +1.
- Reload: session count, streak, language, mode, log restored.
- Thai mid-session: current cue re-renders, session continues.
- Cloud/leaf/mote creation, drift, fade; cap at 12 objects.
- Breath patterns drive both HUD and 3D orb.
- Gong sliders audibly change; ambience fades at end.
- Export → inspect JSON → import; reset.
- Mobile drawers, scrim, close, Escape; 44 px targets.
- Reduced motion; high contrast; keyboard-only.

## Recording results

State the environment and exact pass counts. Do not write “tested” without a command. The shipped build
recorded: Node 26.13, Chrome 156 headless/SwiftShader, macOS; 12/12 self-tests, 6/6 DOM, interaction
smoke pass, zero uncaught errors. Keep that level of specificity.

## Common false failures

- Headless Chrome without SwiftShader → blank canvas / WebGL context error. This is tooling, not app.
- Port already occupied → the script tests another site. Use a free port.
- `localStorage.clear()` with the page already open → in-memory state remains; reload.
- Audio warnings from autoplay policy in headless → expected; do not treat as console errors.
- Voice list empty on first tick → voices load asynchronously; wait or click again.
