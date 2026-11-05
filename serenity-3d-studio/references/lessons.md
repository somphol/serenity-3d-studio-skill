# Lessons — bugs hit in this build

These are real failures from the Serenity 3D session. Each cost time; each has a concrete fix.

## 1. The test server hit another project

`python3 -m http.server 8099` failed silently because another app already owned the port. Chrome then
loaded a different project and the test reported “no `window.Serenity`”. Always capture the server's
exit/log, use a free port, and assert a unique string from the page before testing. The final script uses
an OS-assigned free port.

## 2. `audio.fadeOutAmbience is not a function`

`startAmbience`, `fadeOutAmbience`, `startBinaural`, `stopBinaural` were declared as local functions but
the session engine called `audio.startAmbience()` / `audio.fadeOutAmbience()`. `startSession` never hit
the path (auto-ambience off), but `endSession` always did. Fix: attach the functions to the `audio`
object after declaration. Test a session end every time audio changes.

## 3. WebGL “failed” in headless Chrome

The first browser run used `--disable-gpu`, so `new THREE.WebGLRenderer` threw and the canvas stayed
300×150. This was a harness problem. Use:
`--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.
Do not rewrite the renderer to chase this.

## 4. Top-level `THREE.Vector3` broke CDN failure handling

`CAMERA_PRESETS` constructed `THREE.Vector3` at module evaluation. If the Three.js CDN failed, the whole
IIFE threw before the UI was wired. Store plain arrays and build vectors inside `cameraPreset()`. The UI
must survive a failed CDN and show the CSS gradient.

## 5. Double first narration

`startSession` called `tick()` (which fires cue 0 and speaks it) and then `speakCue(0)` again. The first
line played twice. Fire and speak only from `tick`.

## 6. White zebra water

The first stream shader used `sin(vUv.y * 110.0)` with `pow(flow, 14.0) * 0.55`, producing bright
horizontal stripes. Reduce to two broad glints (`26` and `41` frequency, powers `10` and `18`, amplitudes
~0.16/0.07) and deepen the water colors. Check the screenshot, not just the shader math.

## 7. Labels that float away from the cloud

The cloud label was a child of a scaled group, so its world position and size were surprising. It ended
up visibly above the cloud with no visual connection. Fixes: place it at a known local offset, increase
canvas resolution to 960×200 so long reframes fit, keep `depthTest:false` + `renderOrder:20`, and draw a
thin teal `THREE.Line` from cloud body to label. For leaves and motes, tune scale separately.

## 8. A label hidden behind the orb

A sprite behind the orb was drawn before the transparent orb, so it disappeared. `renderOrder=20` and
positioning the mote in front of the orb made it readable. Remember transparent sorting is by distance,
not intent.

## 9. Orb rendered as a flat white disc

High ambient + key light + emissive intensity 1.35 blew it out. Lower to ambient 0.45, key 1.0, emissive
0.7, cyan base `0x63d8e6`, darker emissive `0x188fa8`. Let the breath scale supply the life. Review on a
real screenshot with ACES tone mapping.

## 10. Toast covered the HUD

Bottom-centre looked natural but sat on top of the cue/HUD. Move it to top-centre on desktop and below
the mobile header (`top: 112px` at ≤900 px). Keep it above the scene, never over controls.

## 11. Session streak stayed 0 for a 22-second session

`recordSession` only updated the streak when `completed || seconds >= 60`, but a manual 20–59 s session
was already being counted as a session. Fix: any recorded session updates the streak. Make the 20 s
threshold the single gate.

## 12. Stale cue language after toggle

Switching language re-rendered the static UI and library but not the currently spoken cue (the handler
only called `updateCueCard` with reset). Add `refreshCueLanguage()` that reads the last index from
`session.fired` and re-renders it. Do not restart the cue or re-speak it.

## 13. Self-test coupled to persisted language

The English reframing check failed after a prior test left `lang: 'th'` in localStorage. Force the
language inside the test (and restore it), or make the test language-agnostic. Tests must not depend on
user state.

## 14. Scene composition needed a second pass

The first sky placed clouds at z −24, so they filled the frame like boulders. The stream looked washed
out; the orb label was enormous. Fixes were camera distance, cloud field z −52…−26, water glint
frequency, orb lighting and per-mode label scales. Budget a review-and-tune pass after the code works.

## 15. Credentials and repeated prompts

Every `git credential fill` / `security` lookup can prompt on macOS. Read the GitHub token **once**, write
it to a mode-600 temp file outside the repo, reuse it for API and push, and delete it at the end. Never
print it. Use a temp Chrome profile; never sign a headless browser into anything.

## 16. `state.json` must be captured late

Token counters in the OpenCode database keep rising while docs, the skill and the push are written.
Capture the snapshot after the app and docs are final, label it `capturedAt`, and report both fresh
tokens (input + output + reasoning) and total including cache reads. Do not pretend the number is live.
