# Release and publishing

## Repository checklist

```text
index.html style.css script.js
package.json
scripts/check.mjs scripts/verify-browser.mjs
docs/
  ARCHITECTURE.md REPRODUCTION.md TESTING.md DEPLOYMENT.md DESIGN.md CONTENT.md BUILD-STATE.md
  screenshot-sky.png screenshot-stream.png screenshot-sanctuary.png screenshot-settings.png screenshot-mobile.png
README.md AGENTS.md LICENSE CHANGELOG.md CONTRIBUTING.md CODE_OF_CONDUCT.md SECURITY.md ATTRIBUTION.md
state.json robots.txt sitemap.xml .nojekyll .gitignore
```

Every relative Markdown link must resolve. `AGENTS.md` follows the working agreement: what it is,
commands, architecture, decisions/constraints, known issues, continuity — all in the same push as the
release.

## README shape

Title + one-sentence promise + live badge + hero screenshot. Then: what it is, features, quick start
(no build), how to practise, screenshots, verification with exact numbers, structure, bilingual note,
privacy, credits, license. Do not duplicate the docs; link them.

## state.json

Capture after the app, docs and verification are final:

```json
{
  "project": "…",
  "version": "1.0.0",
  "session": { "startedAt": "ISO", "finishedAt": "ISO", "wallClockSeconds": 0, "wallClock": "…" },
  "agent": { "harness": "OpenCode", "model": "DeepSeek V4.1 Flash",
             "providerID": "opencode-go", "modelID": "deepseek-v4.1-flash" },
  "tokens": { "input": 0, "output": 0, "reasoning": 0,
              "cacheRead": 0, "cacheWrite": 0, "fresh": 0, "totalReported": 0,
              "capturedAt": "ISO", "source": "…" },
  "costUsd": 0,
  "artifacts": { "practices": 20, "cues": 65, "sourceLines": 0, "sourceBytes": 0 },
  "verification": { "static": "…", "selfTests": "12/12", "dom": "6/6", "browser": "…" },
  "credits": "…"
}
```

`fresh = input + output + reasoning`; `totalReported` includes cache reads/writes. Say clearly that it is
a snapshot of the harness-reported counters, not a live meter. `docs/BUILD-STATE.md` is the human summary
with the same numbers.

If reading OpenCode's SQLite store on macOS:

```bash
sqlite3 -json ~/.local/share/opencode/opencode.db \
  "select tokens_input,tokens_output,tokens_reasoning,tokens_cache_read,tokens_cache_write,cost,model,
   datetime(time_created/1000,'unixepoch','localtime') created,
   datetime(time_updated/1000,'unixepoch','localtime') updated
   from session_v2 where id='<session-id>';"
```

Find `<session-id>` from the most recent row. Do not include credentials, email, tokens or paths.

## GitHub without repeated prompts

1. Read the token once:

   ```bash
   umask 077
   TOK=$(printf 'protocol=https\nhost=github.com\n\n' | git credential fill | sed -n 's/^password=//p')
   printf '%s' "$TOK" > /tmp/gh.token
   ```

2. Use `Authorization: token $TOK` for API calls and the credential helper for push. Keep the token in a
   variable; never echo it.
3. Create the repository:

   ```bash
   curl -s -X POST -H "Authorization: token $TOK" https://api.github.com/user/repos \
     -d '{"name":"serenity-3d-studio","description":"…","homepage":"https://somphol.github.io/serenity-3d-studio/","private":false,"has_issues":true,"has_wiki":false}'
   ```

4. `git init`, add, commit on `main`, `git remote add origin https://github.com/<user>/<repo>.git`,
   `git push -u origin main`. If the remote URL stores credentials, prefer the helper; do not embed the
   token in `.git/config`.
5. Enable Pages:

   ```bash
   curl -s -X POST -H "Authorization: token $TOK" \
     https://api.github.com/repos/<user>/<repo>/pages \
     -d '{"source":{"branch":"main","path":"/"}}'
   ```

6. Poll `GET /repos/<user>/<repo>/pages` for `status: "built"`, then fetch the live URL. Also fetch
   `index.html` and one CSS/JS asset to prove Pages is serving the root.
7. Delete the temp token file and any Chrome profile used for testing.

## Skill backup

Layout for a publishable skill repo:

```text
serenity-3d-studio-skill/
  README.md
  AGENTS.md
  ATTRIBUTION.md
  LICENSE
  docs/preview.png
  skills/serenity-3d-studio/
    SKILL.md
    references/*.md
    assets/preview.png
    assets/reference/{index.html,style.css,script.js,scripts/verify-browser.mjs}
    scripts/scaffold.mjs
```

Test the skill from a clean directory:

```bash
node scripts/scaffold.mjs /tmp/serenity-try
cd /tmp/serenity-try
python3 -m http.server 8080
node scripts/verify-browser.mjs   # after copying the verifier
```

Then push the skill repo. A backup that has never been scaffolded is not a skill; it is a folder.

## Post-release

- Open the live URL on desktop and mobile; run one 1-minute Thai session.
- Confirm the console is clean and the CDN scripts load.
- Add the live URL to README and AGENTS.
- If the repo is public, check that no personal log export, token, temp profile or transcript was
  committed.
- Update `state.json` only when the artifact meaningfully changes; it is a build record, not telemetry.
