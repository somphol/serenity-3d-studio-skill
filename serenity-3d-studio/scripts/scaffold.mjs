#!/usr/bin/env node
/**
 * Scaffold a working Serenity 3D starter from the reference implementation.
 *
 *   node scripts/scaffold.mjs ~/Projects/my-observer-studio
 *   node scripts/scaffold.mjs ~/Projects/my-observer-studio --force
 *
 * The result is a runnable static app. It is a starting point, not a finished
 * release: rewrite the practices, copy, palette and documentation.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const reference = resolve(here, '..', 'assets', 'reference');
const args = process.argv.slice(2);
const force = args.includes('--force');
const target = resolve((args.find((a) => !a.startsWith('--')) || '').replace(/^~/, process.env.HOME || '~'));

if (!target || target === resolve('')) {
  console.error('usage: node scripts/scaffold.mjs <target-directory> [--force]');
  process.exit(2);
}
if (existsSync(target) && readdirSync(target).length && !force) {
  console.error('refusing to write into non-empty directory: ' + target);
  console.error('pass --force if that is really what you want');
  process.exit(1);
}

mkdirSync(join(target, 'scripts'), { recursive: true });
for (const file of ['index.html', 'style.css', 'script.js']) {
  cpSync(join(reference, file), join(target, file));
}
cpSync(join(reference, 'scripts', 'verify-browser.mjs'), join(target, 'scripts', 'verify-browser.mjs'));

writeFileSync(join(target, 'package.json'), JSON.stringify({
  name: 'serenity-3d-starter',
  version: '0.1.0',
  private: true,
  description: 'A bilingual 3D mind-watching starter built from Serenity 3D.',
  type: 'module',
  license: 'MIT',
  scripts: {
    start: 'python3 -m http.server 8080',
    verify: 'node scripts/verify-browser.mjs'
  },
  engines: { node: '>=22' }
}, null, 2) + '\n');

writeFileSync(join(target, 'README.md'), `# Serenity 3D Starter

A working bilingual 3D mind-watching app scaffolded from the Serenity 3D skill.

- 20 practices / 65 cues are sample content — rewrite them for your product.
- Three worlds: clouds, stream, breathing orb.
- Web Speech + Web Audio + localStorage + JSON export.

## Run

\`\`\`bash
python3 -m http.server 8080
# http://localhost:8080/
node scripts/verify-browser.mjs
\`\`\`

## Next

1. Rewrite \`MODULES\` and \`I18N\` in \`script.js\`.
2. Change the palette in \`style.css\` and the product name in \`index.html\`.
3. Write README, AGENTS.md, docs and state.json before publishing.
   The skill references explain the contracts, verification and release.
`);

writeFileSync(join(target, 'AGENTS.md'), `# AGENTS.md

A static, bilingual 3D mind-watching app scaffolded from the Serenity 3D skill.

## Commands

\`\`\`bash
python3 -m http.server 8080
node scripts/verify-browser.mjs
\`\`\`

## Constraints

- No build step; three source files.
- Three.js r128 via CDN; if it fails the UI must still work.
- Cue times are authored on a 0–90 s arc and scaled at runtime.
- 20 practices / 65 cues are a content contract; update the validator when changing counts.
- All audio starts on a user gesture.
- Keep both languages complete.

## Known issues

- Headless WebGL needs SwiftShader flags (the verifier passes them).
- Voices depend on the operating system.
- CDN required on first load.

Replace this file with the full handoff before publishing.
`);

writeFileSync(join(target, '.nojekyll'), '\n');

console.log('Scaffolded the Serenity 3D reference into ' + target);
console.log('');
console.log('Next:');
console.log('  1. python3 -m http.server 8080  →  http://localhost:8080/');
console.log('  2. node scripts/verify-browser.mjs');
console.log('  3. Rewrite MODULES, I18N, palette and product copy.');
console.log('  4. Write README, AGENTS, docs, state.json and publish.');
