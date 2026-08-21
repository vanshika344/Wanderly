# Wanderly — Project Rules

Shared conventions for both collaborators (and for any AI assistant helping
either of you). Keep this short enough that you'll actually follow it.

---

## Source of truth

- **Database structure** → `schema.md` is authoritative. If code disagrees
  with it, fix the code, not the doc (unless you're intentionally changing
  the schema — then update `schema.md` first, and log it in the Migration Log).
- **API contract** → `TECHSPEC.md` section 4. If backend and frontend
  disagree on a field name or shape, that doc wins; whoever's code is wrong
  fixes their code.
- **Feature scope** → `PRD.md`. If you're unsure whether something's in scope
  for the hackathon, check there before spending time on it.

## Secrets

- `GEMINI_API_KEY` and `SUPABASE_SERVICE_KEY` live **only** in
  `backend/.env`. Never in frontend code, never in a component, never logged
  to console, never pasted into chat/Discord/anywhere public.
- `VITE_SUPABASE_ANON_KEY` (publishable key) is safe in frontend — that's by
  design, RLS protects the data, not key secrecy.
- `.env` must always be in `.gitignore`. Check this before every commit if
  you're ever unsure.
- If a secret is ever accidentally committed to git: rotate it immediately
  (regenerate in Supabase/Google AI Studio), don't just delete the commit.

## Auth

- Backend never trusts a `user_id` sent in a request body. It always comes
  from `req.user.id`, set by `verifyAuth` middleware after validating the
  Supabase JWT.
- Every protected backend route must use `verifyAuth`. If you add a new
  route that touches user data, add the middleware — don't skip it "just for
  now."
- Frontend always sends `Authorization: Bearer <access_token>` on calls to
  the backend. Get the token via `supabase.auth.getSession()`.

## Git workflow (2-person team)

- `git pull` before you start working, every time.
- Commit messages: short, describe what changed (`"add photo upload validation"`,
  not `"fixes"`).
- If you're both about to touch the same file, say so first — avoid silent
  merge conflicts.
- Never commit `node_modules/` or `.env` — both must be in `.gitignore`.

## Code style (keep it simple, this is a hackathon)

- No new libraries/frameworks without a quick check-in with the other person
  — extra dependencies cost setup time neither of you can spare right now.
- Prefer editing existing files over creating parallel/duplicate ones (e.g.
  don't create `collections2.js` — edit `collections.js`).
- Every new file must actually be saved and the running server/dev process
  restarted before assuming a change "works." (This bit us once already —
  always verify with a fresh restart + test call.)
- Error handling: never return raw error objects or stack traces to the
  client. Log detail server-side (`console.error`), return a short generic
  message to the client.

## Testing before calling something "done"

- Backend route: test with `curl` or the browser directly, not just "the code
  looks right."
- After any change to `server.js` or a route file: `Ctrl+C`, `node server.js`,
  re-test. Don't assume a running process picked up your edit.
- Before marking a Phase/item done in `tracker.md`, it should have been
  actually run and observed working, not just written.

## AI-assisted development

- Fine to use Claude/Claude Code for boilerplate, debugging, and styling —
  faster than typing everything by hand.
- Read every line of AI-generated code before running it, especially
  anything touching auth, the database, or secrets.
- Don't let an AI assistant write DSA/learning-focused code outside this
  project — that's separate from shipping Wanderly.
- When asking an AI for animation/design help, prefer attaching real
  reference images/screenshots over describing purely in words when
  possible — more reliable, less back-and-forth.

## Scope discipline (hackathon-specific)

- One format (recommend: **Scrapbook**, matches the design direction best)
  should be fully polished. The other three should be functional but don't
  need to be pixel-perfect.
- If a feature isn't in the PRD's "Must-have" row, don't build it before the
  must-haves are done and tested live.
- Deferred items (see `implementationplan.md` bottom section) stay deferred
  unless there's clearly spare time on Day 3 after everything else works.
