# Method — build order, contracts and design

## The shape of the product

A static page that teaches **cognitive defusion** and **self-as-context**. The user does not try to stop
thoughts. They label a thought, see it reframed as an observed event, and release it into a 3D metaphor.
The three metaphors are not decoration; each supports a different stance:

- **Clouds in the sky** — awareness is the sky, thoughts are weather.
- **Leaves on a stream** — non-attachment; let the current carry the leaf.
- **Breathing orb sanctuary** — grounding; breath paces the orb, thoughts become motes absorbed by light.

## Content contract

```js
MODULES = [{
  id: 'sky',
  title_en: 'The Sky & the Clouds', title_th: 'ท้องฟ้ากับเมฆ',
  subtitle_en: 'Expanding awareness', subtitle_th: 'การขยายความรู้ตัว',
  practices: [{
    id: 'vast-blue-sky',
    title_en: 'The Vast Blue Sky', title_th: 'ท้องฟ้าสีครามอันกว้างใหญ่',
    cues: [{ time: 0, text_en: '…', text_th: '…' }]
  }]
}]
```

- 4 modules × 5 practices = 20. 65 cues in the shipped corpus (19 + 16 + 15 + 15).
- Cue times strictly ascending, first 0, last ≤ 90.
- Both languages required on every title and cue.
- Flatten to `PRACTICES` with a 1-based `index`, `moduleId`, `module_en`, `module_th`.
- IDs are stable and kebab-case; they are persisted in log entries and validated by the release check.

The shipped corpus is in `assets/reference/script.js` under `const MODULES`. Copy it, then rewrite the
practices you need; do not retype from the running app.

### Timing

```js
scaledCueTime(cue, totalSec) = (cue.time / 90) * totalSec
```

At 10 minutes: cue 85 → 566.7 s. At 2 minutes: → 113.3 s. Cue 0 is immediate. The short scripts end at
60/90, leaving deliberate silence before the closing gong.

## UI anatomy

```text
topbar: brand | mode tabs (sky/stream/sanctuary) | language, sound, settings, help | mobile drawers
left: duration readout + presets + 1–60 slider | practice list by module | start + streak
centre: cue card | mode caption | HUD (phase, countdown, progress, breath, pause/end)
right: thought textarea | category buttons | reframe preview | submit | recent notes | export
dialogs: settings (voice, gong, ambience, binaural, breath, data, credits), help
```

Boot order: static i18n → dynamic render → settings sync → session reset → Three.js init → events →
debug API.

## Persistence contract

Key `serenity3d.v1`:

```json
{
  "version": 1,
  "settings": { "lang": "en|th", "mode": "sky|stream|sanctuary", "durationMin": 1–60,
    "practiceId": "…", "voiceURI": "", "rate": 0.9, "pitch": 1, "ttsMuted": false,
    "gongPitch": 100–440, "gongDecay": 1–10, "gongVolume": 0–1,
    "ambience": "off|rain|forest", "ambienceVolume": 0–1,
    "binaural": "off|alpha|theta", "breathPattern": "box|478|calm",
    "autoAmbience": false },
  "stats": { "sessions": 0, "completed": 0, "totalSeconds": 0, "streak": 0,
    "bestStreak": 0, "lastDate": "YYYY-MM-DD",
    "categories": { "thought": 0, "emotion": 0, "body": 0 } },
  "log": [{ "id": "n…", "cat": "thought|emotion|body", "raw": "…", "ts": 0, "practiceId": "…" }]
}
```

Normalise on read (clamp numbers, validate enums, trim raw to 140, keep last 500). Export adds `app`,
`version`, `exportedAt`, `entries[]` with `category`, `original`, `reframed_en`, `reframed_th`,
`timestamp`, and `practicesCompleted: 20`.

## Session rules

- `startSession` sets total, resets elapsed/fired/complete, locks controls, plays the start gong, starts
  a 200 ms interval, ticks once.
- `tick` is the only place that fires cues and speaks them. It updates progress, countdown and breath.
- `pauseSession` freezes elapsed and calls `speechSynthesis.pause()`; `resumeSession` resets `lastTick`.
- `finishSession` (auto) records exactly once, sets complete, cancels speech, plays the end gong, fades
  ambience.
- `endSession(true)` (manual) confirms, records only if elapsed ≥ 20, and must not double-record after
  auto completion. Use `session.recorded`.
- Streak increments on any recorded session on a new calendar day; consecutive days increment, a gap
  resets to 1 on the next session. Display 0 if `lastDate` is older than yesterday.

## Thought flow

1. User types up to 140 chars.
2. Chooses Thought / Emotion / Body.
3. Preview shows `prefix + raw` in the active language.
4. Submit increments the category count, pushes `{id, cat, raw, ts, practiceId}`, persists, renders the
   newest-first log, calls `addThoughtToWorld(raw, cat)`, clears the input.
5. Export computes both framed forms; the log re-frames live when language changes.

## Design system

Deep dusk navy (`#070e18` / `#0b1626`), aqua action (`#7fe3dc`), gold cue eyebrow (`#f3cf8a`), serif for
the cue card (Iowan/Palatino/Sarabun/Georgia), humanist sans for controls (Avenir Next/Segoe UI/Sarabun).
Glass panels: 1 px `rgba(164,215,240,.16)` border, 20 px backdrop blur, 18 px radius, layered gradient.
Toasts top-centre. Cue card low-centre so the world stays visible. Thai line-height generous.

## Scene recipes

**Sky** — BackSide sphere gradient shader, hemisphere + directional light, additive sun sprite, 16
distant flattened cloud puffs below, 14 drifting ambient clouds, cone mountains, user cloud + leader
line. Drift +x; reset at +46 to −46.

**Stream** — 26×120 water plane with vertex sine displacement and two low-frequency glints; banks at
x ±22; 26 low-poly trees; rocks; 12 leaves flowing +z; firefly points with a radial texture.

**Sanctuary** — circular floor with five concentric rings, pedestal, emissive icosahedron orb at y 2.55,
BackSide halo, three torus rings, 160 seeded motes. Breath 0.6–1.15 maps to orb scale and emissive.

**Labels** — 960×200 canvas; 42 px shrinking to 32 px; max 840 px with ellipsis; dark rounded pill; teal
stroke; sprite `depthTest:false`, `depthWrite:false`, `renderOrder:20`. Scale compensates for host scale.
Cloud labels get a thin line from the cloud to the label.

**Thought objects** — clouds TTL 18 s drift +x; leaves TTL 18 s flow +z; motes TTL 7.5 s lerp to orb.
Fade opacity in the last 3 s. Cap 12, dispose geometry/material/map.

## Audio recipe

Lazy `AudioContext`; master gain 0.9. Gong: partials 1, 2.02, 2.74, 4.1 with an FM pair; envelope
0.0001 → volume*0.55 in 12 ms → 0.0001 over decay. Rain: pink buffer 4 s loop → highpass 900 →
lowpass 7200. Forest: → lowpass 620 → highpass 90 with 0.07 Hz LFO. Binaural: 174 Hz L / 174+10 or +6 Hz
R → channel merger → 0.035. Fade ambience over 1.4 s and stop after 1.6 s.

## TTS recipe

Voices arrive asynchronously. Filter by `lang` prefix; offer “Automatic for language”. Preference: saved
URI → exact language → loose match → any voice. Cancel before speaking. Rate 0.9, pitch 1.0. Warn once if
no voices. Pause/resume with the session; mute cancels.
