# AGENTS.md — Serenity 3D Studio skill

## 1. What it is

An OpenCode skill and a tested scaffold for building a bilingual (EN/TH), static Three.js mind-watching
app. The skill teaches the content contract (20 practices / 65 cues), the scaled session engine,
cognitive-defusion labeling, three 3D worlds, Web Speech + Web Audio, local persistence, headless
verification and a GitHub Pages release. This repository is the distribution/backup copy; it is **not**
the app itself and has no build step.

Live catalog: <https://somphol.github.io/serenity-3d-studio-skill/> · Local master:
`~/Projects/serenity-3d-studio-skill` · Reference app:
<https://somphol.github.io/serenity-3d-studio/>

## 2. Commands

```bash
# validate the skill folder
node ~/.config/opencode/skills/skill-publish/scripts/check-skill.mjs ./serenity-3d-studio

# prove the scaffold from a clean directory
node serenity-3d-studio/scripts/scaffold.mjs /tmp/serenity-try
cd /tmp/serenity-try && node scripts/verify-browser.mjs

# serve the catalog locally
python3 -m http.server 8080
# http://localhost:8080/index.json
```

`verify-browser.mjs` requires Node 22+, Python 3 and Chrome/Chromium; it starts its own static server and
uses SwiftShader for WebGL. `check-skill.mjs` fails on missing frontmatter, bad IDs, vendored
`node_modules`, build output and token/email patterns.

Deploy = push `main`; Pages serves the repository root. Clients read `index.json` from the base URL.

## 3. Architecture

```text
index.json                       catalog: name, version hash, description, file list
serenity-3d-studio/SKILL.md      entry point: when to use, gates, workflow, recipes
serenity-3d-studio/references/   method, verification, lessons, release
serenity-3d-studio/assets/       preview + runnable reference app
serenity-3d-studio/scripts/      scaffold.mjs
README.md AGENTS.md ATTRIBUTION.md LICENSE docs/preview.png
```

The catalog entry's `version` is the first 12 hex characters of a SHA-256 over the sorted relative paths
and file bytes. It must change whenever any listed file changes, or clients keep a stale copy. The folder
name under the catalog root is the skill ID (`serenity-3d-studio`); the frontmatter `name` is only a
display label.

`assets/reference/` contains the three app files plus `scripts/verify-browser.mjs`. The scaffold copies
them and writes starter metadata. It intentionally does **not** copy release docs or `check.mjs`, because
those are product-specific and are written in the release phase.

## 4. Decisions and constraints

- **The reference app is the source of truth.** Do not rewrite the scaffold by hand; copy from
  `assets/reference/` and re-run the scaffold proof.
- **Keep the content contract intact** in the template: 20 practices, 65 bilingual cues, 90-second arc.
  Users are told to rewrite the copy, not to start from an empty shell.
- **No dependencies in the scaffold.** It runs with a static server; the verifier uses Node's built-in
  WebSocket.
- **Skill IDs are folder names.** Do not rename `serenity-3d-studio/` without updating `index.json`,
  README links and the install URL.
- **Version hash is content-derived.** Regenerate `index.json` after any skill edit.
- **No secrets, exported personal logs, browser profiles or absolute machine paths.** The skill must be
  portable.
- **The skill must not make medical claims.** It is a self-reflection tool; see SKILL.md boundaries.

## 5. Known issues

- A catalog entry can be served while one of its listed files 404s; always fetch every listed file after
  publishing.
- Pages caches aggressively; a client keeps a skill until `version` changes.
- The skill's browser verifier depends on Chrome + SwiftShader; other headless setups may fail WebGL.
- The scaffold's starter docs are deliberately minimal and fail the reference app's full static check
  until the release phase adds docs/state. This is intentional, not a broken template.
- Thai voice availability on a user's OS is outside the skill's control.

## 6. Continuity

- Catalog: <https://somphol.github.io/serenity-3d-studio-skill/>
- Repository: <https://github.com/somphol/serenity-3d-studio-skill>
- Local master: `~/Projects/serenity-3d-studio-skill`
- Installed skill: `~/.config/opencode/skills/serenity-3d-studio`
- Reference app: <https://github.com/somphol/serenity-3d-studio> ·
  <https://somphol.github.io/serenity-3d-studio/>
- Credit: built with OpenCode + DeepSeek V4.1 Flash.
