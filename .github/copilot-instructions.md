## Quick orientation for AI coding agents

Purpose: make an AI immediately productive in this repo by documenting the architecture, developer workflows, conventions and safe edit points.

High-level architecture
- Frontend: Next.js 15 (React + TypeScript). Entry: `src/app/layout.tsx` -> `src/app/page.tsx`. Routes are file-based (Next.js App Router) with automatic code splitting.
- Backend API: Next.js API routes at `src/app/api/*`. Uses JWT auth, Joi validation, SendGrid email. Persistence via Prisma when `DATABASE_URL` is set (see `prisma/schema.prisma` and `src/lib/db.ts`).
- Deployment: Next.js build deployed to Vercel. Automatic optimization for images, fonts, and scripts. SEO handled via metadata API.

Key files (start here)
- `src/app/layout.tsx` – root layout with providers, metadata, fonts, and global structure
- `src/app/page.tsx` – home page (server component by default)
- `src/app/api/` – API routes replacing Express server
  - `auth/login/route.ts`, `auth/register/route.ts`, `auth/verify/route.ts` – authentication
  - `contact/route.ts` – contact form
  - `newsletter/route.ts` – newsletter subscriptions
  - `admin/users/route.ts` – admin user management
- `src/lib/db.ts` – Prisma wrapper with TypeScript types
- `src/lib/auth-middleware.ts` – JWT verification and admin check utilities
- `prisma/schema.prisma` – Prisma schema (User model). Run `npx prisma generate` after edits and `npx prisma migrate dev` to apply.
- `src/components/` – React components. Add `'use client'` directive for interactive components.
- `public/` – static assets (logo.png, placeholder.svg, manifest.json, etc.)

Developer workflows / commands
- Development: `npm run dev` (Next.js dev server on port 3000)
- Production build: `npm run build` (creates optimized `.next` directory)
- Start production: `npm start` (serves built app)
- Lint: `npm run lint` (Next.js ESLint)
- Prisma commands (from root):
  - `npx prisma generate` – regenerate Prisma client
  - `npx prisma migrate dev --name <name>` – create and apply migration
  - `npx prisma db push` – push schema without migration (dev only)
  - `npx prisma studio` – visual database browser

Project-specific conventions & patterns
- **Server vs Client Components**: Components are server components by default. Add `'use client'` at top of file for interactivity (useState, useEffect, event handlers).
- **Routing**: File-based. `src/app/about/page.tsx` = `/about` route. Dynamic routes use `[id]` folders.
- **API Routes**: Each API route exports `GET`, `POST`, `PUT`, `DELETE` functions. Use `NextRequest` and `NextResponse`.
- **Data Fetching**: Server components can `await` data directly. Client components use React Query (`QueryProvider` wraps app).
- **Images**: Use Next.js `<Image>` component from `next/image` for automatic optimization.
- **Links**: Use `<Link>` from `next/link` instead of `<a>` tags.
- **Metadata**: Define in `layout.tsx` or per-page via `export const metadata`.
- **Auth Middleware**: Use `verifyAuth()` or `requireAdmin()` from `src/lib/auth-middleware.ts` in API routes.
- **In-memory fallback**: App uses in-memory Map for users when DB not configured. New persistence should prefer `src/lib/db.ts` helpers.
- **Env handling**: Features fall back to insecure defaults (e.g. `JWT_SECRET || 'fallback-secret-key'`). Add startup check for `NODE_ENV === 'production'` to require secrets.
- Path alias: `@/*` maps to `src/*` (see `tsconfig.json`).

Integration points & external deps to be careful with
- SendGrid (`@sendgrid/mail`) – `SENDGRID_API_KEY` required to send email. Code logs warnings if missing.
- Auth: JWT secrets (env vars `JWT_SECRET`, `JWT_REFRESH_SECRET`) used in API routes and middleware.
- Vercel Postgres / DATABASE_URL – when present, Prisma client is enabled. Make schema migrations part of deploy or CI.
- Next.js Image Optimization – requires proper `next.config.mjs` setup for remote images.

How to add or change an API route (example)
1. Create file at `src/app/api/<endpoint>/route.ts`
2. Export async functions: `export async function GET(request: NextRequest) { ... }`
3. Use Joi validation -> try/catch -> consistent JSON shape `{ success, message, data }`
4. For protected routes, call `verifyAuth()` or `requireAdmin()` from middleware
5. If route needs persistence, call `createUserInDB`, `findUserByEmailInDB`, etc. from `src/lib/db.ts`
6. Return `NextResponse.json()` with appropriate status codes

Testing & CI notes
- No automated tests or GitHub Actions yet. Suggested: run `npm run lint`, `npm run build`, `npx prisma generate` in CI.
- Use Vitest or Jest + React Testing Library for components and Vitest for API routes.

Editing guidelines for AI agents
- Mark interactive components with `'use client'` (anything using useState, useEffect, onClick, etc.)
- Server components can't use client-side hooks – move interactivity to separate client components
- Use Next.js `<Image>` and `<Link>` components instead of `<img>` and `<a>`
- API routes return `NextResponse.json()`, not Express `res.json()`
- Keep changes small. Auth flow touches: API routes, `AuthContext`, `authService.ts`, middleware
- Commit message style: `feat:`, `fix:`, `chore:`, `docs:`
- Never hardcode secrets. Use env vars and update Vercel environment variables

Repo housekeeping notes
- Large TailAdmin template files under `public/Downloads` and `media/static/` inflate repository. Consider archiving.
- Old Vite files (`vite.config.ts`, `index.html`, `src/main.tsx`) can be removed after migration verified.
- Static assets in `public/` are served at root (e.g. `public/logo.png` = `/logo.png`)

SEO & Performance
- Metadata defined in `src/app/layout.tsx` and per-page
- Sitemap generated at `src/app/sitemap.ts` (automatic route)
- Robots.txt at `src/app/robots.ts`
- Ads.txt at `src/app/ads.txt/route.ts`
- All pages server-rendered by default for better SEO and performance
- Automatic code splitting per route
- Image optimization via Next.js Image component

If anything is unclear or you want me to expand a section (CI workflow, Prisma migration automation, or example code edits), tell me which area and I'll iterate.
