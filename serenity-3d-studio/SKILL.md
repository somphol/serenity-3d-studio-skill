---
name: Serenity 3D Studio
description: Build a bilingual, static Three.js mind-watching studio — 20 guided observer scripts, cloud/stream/orb worlds, cognitive-defusion logging, Web Speech narration, Web Audio gong and ambience, scaled session timing, local persistence, headless verification and a GitHub Pages release.
version: 1.0.0
---

# Serenity 3D Studio

Build a release-grade “observer / mind-watching” app rather than a generic meditation timer: a real
Three.js world, a complete bilingual script corpus, a thought-labeling engine that reframes entries as
observed events, synthesized sound, local history and a verified static release.

Written from the completed **Serenity 3D — The Observer & Mind-Watching Studio** build: 20 practices,
65 bilingual cues, 12/12 in-app self-tests, 6/6 headless DOM checks, zero console errors. The working
reference is in `assets/reference/`; the shipped project is at
<https://somphol.github.io/serenity-3d-studio/>.

## When to use

Use this skill when the user asks for:

- a 3D mindfulness, meditation, anxiety or “observer” app with guided scripts;
- an interactive metaphor app — clouds, leaves on a stream, a breathing orb;
- cognitive defusion / self-as-context exercises with thought labeling;
- a bilingual (English + Thai) wellness or reflection tool with narration and ambience;
- a static, privacy-first Three.js release with tests, docs, screenshots and Pages.

Do **not** use it for clinical treatment, crisis support, diagnosis, or a product that claims therapeutic
outcomes. Do not build accounts, cloud sync, analytics or a backend for this brief; the privacy promise
is part of the design.

## What “done” means

| Gate | Command / check | Expected |
| --- | --- | --- |
| Content | `node scripts/check.mjs` after writing the release check | 20 practices, 65 cues, bilingual |
| In-app | `/?selftest=1` or `Serenity.runSelfTests()` | 12/12 |
| Browser | `node scripts/verify-browser.mjs` | 12 self-tests + 6 DOM + interaction + no errors |
| Visuals | `--screenshots` and inspect sky, stream, orb, mobile, settings | readable labels, no clipped UI |
| Docs | README, AGENTS, reproduction, architecture, testing, deployment, design, content | links resolve |
| Release | Pages URL loads, Thai switch works, no console errors | live |
| Build record | `state.json` + `docs/BUILD-STATE.md` | duration, tokens, model, credits |

Never lower a claim to match a failed check; fix the cause.

## Non-negotiables

1. **The 20-practice corpus is the product.** Four modules, 20 practices, 65 cues, complete `text_en`
   and `text_th` for every cue. Keep the authored 0–90 s arc; do not store absolute times.
2. **Scale cue timing at runtime:** `scaled = (cue.time / 90) * (durationMin * 60)`. A 1-minute primer
   and a 60-minute session must use the same dataset unchanged.
3. **Reframing is the therapeutic move.** Every entry is prefixed with “I notice the thought that…”,
   “I notice a feeling of…”, or “I notice a sensation of…” in the active language. Store the raw entry,
   not the framed string, so language switching re-renders naturally.
4. **Three genuinely different scenes.** Clouds, stream and orb need their own fog, light, camera and
   update loop. A reskinned single scene is not the same product.
5. **Attach labels with care.** Canvas sprites with `depthTest:false` and `renderOrder=20`; cloud labels
   need a leader line and must not sit inside the cloud. Long Thai labels ellipsise in 3D while the log
   preserves the full text.
6. **Audio starts only on a gesture.** Attach `startAmbience`, `fadeOutAmbience`, `startBinaural`,
   `stopBinaural` to the `audio` object; the session engine calls `audio.*`. A local function throws at
   session end.
7. **Session state must be honest.** Pause freezes elapsed and speech; resume resets the tick; automatic
   completion records once; manual sessions under 20 s are not counted. `session.recorded` prevents
   double counting.
8. **Keep the UI offline-capable except for pinned CDNs.** No analytics, cookies, remote fonts or
   third-party images. Persist only under one versioned localStorage key.
9. **Both languages are equal.** Every visible string, toast, validation message, practice title and cue
   exists in EN and TH; a self-test must prove the key sets match.
10. **Use mock/no-prompt credentials in automation.** Avoid repeated macOS Keychain prompts: read a
    GitHub token once, cache it in a temp file with mode 600, and reuse it for API + push. Never print
    it. In Chrome headless, use a temp profile.
11. **`AGENTS.md` ships in the same push as the release.** State file and credit are part of the repo,
    not a chat message.

## Workflow

### Phase 0 — freeze the corpus (30–45 min)

- Decide the modules and practices. For this product: Sky & Clouds (5), Leaves on a Stream (5), Theater
  Screen (5), Everyday Defusion (5).
- Write each cue as 1–2 sentences on a 0–90 s arc. Author Thai as contemplative prose.
- Validate IDs, order, bilingual fields and times with a script before touching the UI. The exact
  content contract and timing table are in `references/method.md`.

### Phase 1 — shell and design system (30 min)

- Build `index.html`, `style.css`, `script.js` as three files, no build step.
- Desktop: library / 3D stage / observer log. Mobile: fixed drawers below 900 px.
- Native settings and help dialogs; toast top-centre; skip link; ARIA labels; reduced motion and
  contrast media queries.
- Dusk sea-glass tokens: deep navy, aqua action, gold cue eyebrow, serif cue text, humanist sans UI.

### Phase 2 — session engine and persistence (40 min)

- Implement the state machine and `scaledCueTime`; preview the first cue before starting.
- Lock duration/practice controls while running; update progress and countdown every 200 ms.
- Persist settings/stats/log; normalise every field on read; export/import JSON.
- Streak: one recorded session per day, reset after a gap; display only today/yesterday.

### Phase 3 — Three.js worlds (60–90 min)

- One renderer, camera and OrbitControls; three scenes with their own fog and lights.
- Sky: shader gradient dome, sun sprite, distant cloud sea, drifting ambient clouds.
- Stream: shader water plane with subtle glints, banks, trees, fireflies, floating leaves.
- Sanctuary: floor rings, pedestal, emissive orb, halo, torus rings, orbiting motes.
- Labels: 960×200 canvas, 42→32 px, 840 px max, dark pill, teal stroke, `renderOrder=20`.
- Thought objects: cloud + leader, leaf, mote; cap 12, fade and dispose.
- Test with software WebGL; plain headless `--disable-gpu` is not a valid failure.

### Phase 4 — speech, sound, breath (40 min)

- TTS voices load asynchronously; filter by language, save `voiceURI`, warn once when none.
- Gong: 4 inharmonic partials + FM pair, exponential decay, pitch/decay/volume sliders.
- Pink noise rain/forest; optional alpha/theta binaural; fade out at end.
- Breath patterns box / 4·7·8 / calm drive both the HUD orb and the 3D orb.

### Phase 5 — verification (30 min)

- Add in-app self-tests covering content, formula, i18n key parity, reframing, formatting,
  normalisation, export shape and DOM landmarks.
- Add a headless Chrome script that starts its own server, runs with SwiftShader, checks 12 + 6 gates,
  exercises Thai/stream/session/log, and fails on console errors.
- Run `--screenshots` and inspect the composition at 1440×900 and 390×844.
- Full recipes and failure modes: `references/verification.md` and `references/lessons.md`.

### Phase 6 — release (30 min)

- Write README, AGENTS, LICENSE, changelog, contributing, code of conduct, security, attribution,
  architecture, reproduction, testing, deployment, design, content, build-state.
- Add `state.json` with wall-clock start/end, token snapshot, model/harness, verification summary.
- Add `.nojekyll`, `robots.txt`, `sitemap.xml`, screenshots.
- Commit, create the GitHub repo, push, enable Pages, verify the live URL.
- Publish the skill backup as `skills/<id>/` in its own repo. See `references/release.md`.

## Module map (the shipped reference)

```text
index.html              UI shell, panels, dialogs, CDN tags
style.css               tokens, glass panels, responsive drawers, dialogs
script.js               MODULES + I18N + persistence + session + breath + TTS + audio + three scenes + tests
scripts/check.mjs       dataset extraction + structure/link/syntax checks
scripts/verify-browser.mjs  headless Chrome verification + screenshots
docs/                   architecture, reproduction, testing, deployment, design, content, build state
```

`script.js` is one strict-mode IIFE with numbered sections. Read its top-to-bottom order before editing:
content, i18n, utilities/persistence, state, UI helpers, library, session, breath, TTS, audio, world,
log/export, settings wiring, self-tests, boot.

## Recipes that are easy to get wrong

**Double narration.** Let `tick()` fire cue 0; do not also call `speakCue(0)` in `startSession`.

**Detached cloud label.** A dark pill at cloud centre hides the cloud; a label above without a stem looks
unrelated. Put the label above and draw a thin teal `THREE.Line` from the cloud body to the label.

**White zebra water.** High-frequency sine stripes read as stripes. Use two low-frequency glints
(frequencies ~26 and 41, powers 10 and 18) and keep the amplitude small.

**Orb as a white disc.** Reduce ambient/key light and emissive intensity; use a cyan base with a darker
emissive and a subtle halo, then let the breath scale carry the life.

**Broken audio at end.** Attach the four ambience/binaural functions to `audio`; otherwise
`audio.fadeOutAmbience()` is undefined and `endSession` throws.

**Lost cue language on toggle.** Re-render the current cue from `session.fired` after switching language;
do not only translate static markup.

**Toast over the HUD.** Put it top-centre on desktop and below the header on mobile.

**Counting a 1-second test.** Keep the 20 s manual-session threshold. Automatic completion always counts.

## Failure boundaries

- Do not add clinical claims, diagnosis, crisis intervention or “cure” language.
- Do not call the app offline-first while it loads Three.js from a CDN.
- Do not put user notes in URL parameters, analytics, logs or screenshots.
- Do not ship a skill that scaffolds only a screenshot; prove the scaffold runs and self-tests.
- Do not publish a repo until `AGENTS.md`, state, licence and attribution are in the same push.
- If a headless WebGL test fails, first check SwiftShader flags and the canvas size; do not rewrite the
  renderer for a tooling problem.

## Reference

- `assets/reference/` — working `index.html`, `style.css`, `script.js`, `scripts/verify-browser.mjs`.
- `scripts/scaffold.mjs` — copies the reference into a new directory and writes starter metadata.
- `references/method.md` — content contract, data shapes, phase order, design rationale.
- `references/verification.md` — test layers, exact commands, what to assert, screenshot recipe.
- `references/lessons.md` — bugs hit in this build and how they were fixed.
- `references/release.md` — docs checklist, GitHub Pages, skill-backup publishing, state file.
