## Quick orientation for AI coding agents

Purpose: make an AI immediately productive in this repo by documenting the architecture, developer workflows, conventions and safe edit points.

High-level architecture
- Frontend: Vite + React (TypeScript). Entry: `index.html` -> `src/main.tsx` -> `src/App.tsx`. Routes are client-side (React Router) and lazy-loaded.
- Backend API: single Express app at `server/index.js`. Uses JWT auth, Joi validation, SendGrid email, and an in-memory `Map` fallback for users. Persistence is provided via Prisma when `DATABASE_URL` is set (see `server/prisma/schema.prisma` and `server/db.js`).
- Deployment: Static build deployed to Vercel. `vercel.json` maps static assets (`/sitemap.xml`, `/ads.txt`, `/robots.txt`, `/assets/*`) and falls back to `index.html` for SPA routing. Vite outputs to `dist` per `vercel.json`.

Key files (start here)
- `server/index.js` – main API, auth helpers, routes and seeds. Many patterns and middleware live here (helmet, rate-limit, CORS). Edit here for new endpoints but prefer small, testable modules.
- `server/db.js` – thin Prisma wrapper. Call `createUserInDB`, `findUserByEmailInDB`, etc. Use these helpers when migrating logic from in-memory `users` Map to DB-backed.
- `server/prisma/schema.prisma` – Prisma schema (User model). Run `npx prisma generate` after edits and `npx prisma migrate dev` or `prisma db push` to apply.
- `src/` – React components, pages, contexts (`AuthContext.tsx`, `AppContext.tsx`). Use `@/*` path alias.
- `index.html` – SEO and meta tags (site verification, AdSense). `public/` holds `ads.txt`, `sitemap.xml`, `robots.txt` and other static assets.

Developer workflows / commands
- Frontend dev: from repo root
  - `npm install`
  - `npm run dev` (Vite local server)
- Backend dev (server/):
  - `cd server`
  - `npm install`
  - `npm run dev` (node --watch index.js)
- Production build (Vercel): `npm run build` (root) or `npm run vercel-build` – Vite builds into `dist`.
- Prisma: after editing `schema.prisma` run in `server/`:
  - `npx prisma generate --schema=prisma/schema.prisma`
  - to create tables: `npx prisma migrate dev --name init` or `npx prisma db push` for a no-migration push.

Project-specific conventions & patterns
- In-memory fallback: the app uses a `Map` for users and seeds admin users on startup. New persistence should prefer `server/db.js` helpers but keep Map behavior for local dev if `DATABASE_URL` is not set.
- Seed users: `seedAdminUser()` and `seedSuperUser()` exist in `server/index.js`. They persist to both the Map and DB (if available). Avoid duplicating seed logic when editing.
- Env handling: many features fall back to insecure defaults (e.g. `JWT_SECRET || 'fallback-secret-key'`). Do not remove fallbacks blindly — instead add a startup check for `NODE_ENV === 'production'` to require secrets.
- Routing & static files: `vercel.json` contains explicit routes for `sitemap.xml`, `ads.txt`, `robots.txt` to ensure they are served as static files rather than SPA HTML. Keep that when changing deploy config.
- Path alias: `@/*` maps to `src/*` (see `tsconfig.json`). Use the alias when editing imports to match project style.

Integration points & external deps to be careful with
- SendGrid (`@sendgrid/mail`) – `SENDGRID_API_KEY` required to send email. Code logs warnings if missing, but runtime errors will occur when attempting to send.
- Auth: JWT secrets (env var `JWT_SECRET`) and refresh token handling are in `server/index.js`. Changing token format affects the frontend `AuthContext` and `authService.ts`.
- Vercel Postgres / DATABASE_URL – when present, Prisma client is enabled. Make schema migrations part of deploy or CI.

How to add or change an API route (example)
1. Add route handler to `server/index.js` under an appropriate section (auth, admin, email). Follow existing patterns: Joi validation -> try/catch -> consistent JSON shape { success, message, data }.
2. If the route needs persistence, call `createUserInDB` / `updateUserInDB` / `findUserByEmailInDB` from `server/db.js`. These functions are async; `findUserByEmail` helper in `server/index.js` already prefers DB.
3. Add tests (see testing note) and run the server locally to smoke test.

Testing & CI notes
- There are currently no automated tests or GitHub Actions in the repo. Suggested quick CI: run `npm run lint`, `npm run build`, and `npx prisma generate` in `server/` as part of workflow.
- Use Vitest or Jest + React Testing Library for frontend and Mocha/Jest for backend.

Editing guidelines for AI agents
- Keep changes small and focused. Many files are tightly coupled (Auth, AuthContext, authService, server JWT handling). If changing token formats or payloads, update both frontend and backend.
- Commit message style used in repo: conventional prefixes like `chore:`, `fix:`, `feat:`, `docs:`. Follow that for automated changes.
- Never hardcode secrets. If a change requires env vars, add instructions in README and update `vercel` environment variables instead of embedding values.

Repo housekeeping notes
- There are large TailAdmin template files under `public/Downloads` and `media/static/...` that inflate the repository. Consider archiving or removing them if unused.
- Static assets referenced in `index.html` (e.g. `/og.jpg`, `/placeholder.svg`, `/logo.png`) should exist in `public/` — verify before production.

If anything is unclear or you want me to expand a section (CI workflow, Prisma migration automation, or example code edits), tell me which area and I'll iterate.
