## Quick orientation for AI coding agents

Purpose: make an AI immediately productive in this repo by documenting the architecture, developer workflows, conventions and safe edit points.

High-level architecture
- Frontend: Next.js 15 (React + TypeScript). Entry: `src/app/layout.tsx` -> `src/app/page.tsx`. Routes are file-based (Next.js App Router) with automatic code splitting.
- Backend API: Next.js API routes at `src/app/api/*`. Uses JWT auth, Joi validation, SendGrid email. Persistence via Prisma when `DATABASE_URL` is set (see `prisma/schema.prisma` and `src/lib/db.ts`).
- Deployment: Next.js build deployed to Vercel. Automatic optimization for images, fonts, and scripts. SEO handled via metadata API.
- Migration Status: **Recently migrated from Vite + React Router to Next.js 15.5.6**. All old Vite files removed (`src/pages/`, `vite.config.ts`, `index.html`).

Key files (start here)
- `src/app/layout.tsx` – root layout with providers (AuthProvider, QueryProvider, ThemeProvider), metadata, fonts, global components (Toaster, PWAInstallPrompt, ChatWidget)
- `src/app/page.tsx` – home page (client component with AppProvider context)
- `src/app/api/` – API routes (replaced Express server completely)
  - `auth/login/route.ts`, `auth/register/route.ts`, `auth/verify/route.ts` – authentication endpoints
  - `contact/route.ts` – contact form submissions
  - `newsletter/route.ts` – newsletter subscriptions
  - `admin/users/route.ts` – admin user CRUD operations
- `src/lib/db.ts` – Prisma wrapper with TypeScript types, falls back to in-memory Map when DB not configured
- `src/lib/auth-middleware.ts` – JWT verification (`verifyAuth()`) and admin check (`requireAdmin()`) utilities
- `src/lib/flags.ts` – Feature flags configuration with Statsig adapter (server-side only)
- `prisma/schema.prisma` – Database schema (User model). Run `npx prisma generate` after edits.
- `src/components/` – React components. **All interactive components marked with `'use client'`**
- `src/contexts/` – AuthContext (client component), AppContext (client component) for global state
- `public/` – static assets served at root (logo.png, manifest.json, sw.js for PWA)

Developer workflows / commands
- Development: `npm run dev` (Next.js dev server on port 3000)
- Production build: `npm run build` (creates optimized `.next` directory)
- Start production: `npm start` (serves built app)
- Lint: `npm run lint` (Next.js ESLint with TypeScript)
- Prisma commands (from root):
  - `npx prisma generate` – regenerate Prisma client after schema changes
  - `npx prisma migrate dev --name <name>` – create and apply migration
  - `npx prisma db push` – push schema without migration (dev only)
  - `npx prisma studio` – visual database browser

Project-specific conventions & patterns
- **Server vs Client Components**: Components are server by default. **MUST add `'use client'` at top of file** for: useState, useEffect, useContext, event handlers (onClick, onChange), browser APIs (window, localStorage), React Query hooks. All page components in `src/app/**/page.tsx` are currently client components.
- **Routing**: File-based. `src/app/login/page.tsx` = `/login` route. No more React Router (removed).
- **Navigation**: Use `useRouter()` from `'next/navigation'` (not React Router). Call `router.push('/path')` for navigation.
- **Links**: Use `<Link href="/path">` from `next/link` (not `to` prop).
- **API Routes**: Each route exports `GET`, `POST`, `PUT`, `DELETE` async functions. Use `NextRequest` and `NextResponse.json()`.
- **Data Fetching**: Server components can `await` data. Client components use React Query via `useQuery()` hook.
- **Images**: Use `<Image>` from `next/image` with `width`, `height`, and `alt` props. Supports remote images via `next.config.mjs`.
- **Metadata**: Define `export const metadata: Metadata` in `layout.tsx` or page files for SEO.
- **Auth Pattern**: API routes use `verifyAuth(request)` to get user, `requireAdmin(request)` for admin-only routes.
- **Database**: Prisma client accessed via `src/lib/db.ts` helpers (`createUserInDB`, `findUserByEmailInDB`). Falls back to in-memory Map.
- **Environment Variables**: Use fallbacks (e.g., `JWT_SECRET || 'fallback-secret-key'`). **Set in Vercel for production**.
- **Path Alias**: `@/*` maps to `src/*` (configured in `tsconfig.json`).
- **Toast System**: Supports dual APIs – custom (`message`, `type`) and shadcn/ui (`title`, `description`, `variant`). Use `useToast()` hook.
- **Feature Flags**: Use `createFeatureFlag("flag_name")()` or `featureFlags.betaFeatures()` from `src/lib/flags.ts`. **Server-side only** (async functions). Requires `STATSIG_SDK_KEY` env var. See `FEATURE_FLAGS_GUIDE.md` for details.

Critical hydration rules (prevents React errors)
- **Never use `Math.random()`, `Date.now()`, or `new Date()` directly in render** – causes server/client mismatch
- Use deterministic values or move to `useEffect()` for client-only randomness
- Example fix in `Hero.tsx`: particles use calculated positions `(i * 7.3) % 100` instead of `Math.random()`
- Browser APIs (`window`, `localStorage`) **must be in `useEffect()`** or client components only

Integration points & external deps
- **SendGrid** (`@sendgrid/mail`) – requires `SENDGRID_API_KEY` env var for email sending
- **Prisma** – requires `DATABASE_URL` for PostgreSQL. Schema at `prisma/schema.prisma`
- **JWT** – requires `JWT_SECRET` and `JWT_REFRESH_SECRET` env vars for auth
- **Statsig** (`@flags-sdk/statsig`, `flags`) – requires `STATSIG_SDK_KEY` for feature flags. Server-side only. See `FEATURE_FLAGS_GUIDE.md`
- **Vercel** – auto-deploys on push to main. Config in `vercel.json` (framework: nextjs)
- **Next.js Image Optimization** – remote images allowed via `next.config.mjs` (`remotePatterns`)
- **React Query** – wrapped in `QueryProvider` in layout, provides client-side data fetching

How to add or change an API route
1. Create `src/app/api/<endpoint>/route.ts`
2. Export async function: `export async function POST(request: NextRequest) { ... }`
3. Parse body: `const body = await request.json()`
4. Validate with Joi: `const { error } = schema.validate(body)`
5. For protected routes: `const user = await verifyAuth(request)` or `await requireAdmin(request)`
6. Database ops: `await createUserInDB(data)` from `src/lib/db.ts`
7. Return: `NextResponse.json({ success: true, data }, { status: 200 })`
8. Consistent error shape: `{ success: false, message: 'error description' }`

Common pitfalls & fixes
- **Build fails with "useState is not a function"** → Component missing `'use client'` directive
- **Hydration mismatch error** → Using `Math.random()`, `Date.now()`, or `window` in render. Move to `useEffect()`.
- **"Cannot use hooks" error** → Server component trying to use client hooks. Add `'use client'`.
- **ESLint "Cannot find package 'globals'"** → Run `npm install -D globals`
- **Vercel build fails with SES error** → Check `vercel.json` is configured for Next.js, not Vite static build
- **Images not loading** → Use Next.js `<Image>` component, ensure `next.config.mjs` allows remote domains

Editing guidelines for AI agents
- **Always check if component needs `'use client'` before adding hooks**
- Server components can't use: useState, useEffect, useContext, onClick handlers, browser APIs
- Use Next.js `<Image>` and `<Link>`, never `<img>` or `<a href>`
- API routes use `NextResponse.json()`, not Express `res.json()`
- Keep commits focused: `feat:`, `fix:`, `chore:`, `docs:` prefixes
- Test locally with `npm run build` before pushing (catches TypeScript/hydration errors)
- Never hardcode secrets – use env vars and add to Vercel dashboard

Deployment workflow
1. Local: `npm run build` to verify (must succeed)
2. Commit: `git add -A && git commit -m "fix: description"`
3. Push: `git push origin main`
4. Vercel auto-deploys to https://regisbridge.page/
5. Check Vercel dashboard for build logs if deployment fails
6. Set env vars in Vercel: `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `SENDGRID_API_KEY`

Current state & known issues
- ✅ Next.js migration complete, production build succeeds
- ✅ Toast API compatibility fixed (supports both custom and shadcn/ui)
- ✅ Hydration errors resolved (Hero component uses deterministic particles)
- ✅ All pages marked as client components (use contexts)
- ⚠️ `metadataBase` warning – add `metadataBase: new URL('https://regisbridge.page')` to layout.tsx metadata
- ⚠️ Large template files in `public/Downloads/` and `media/static/` – added to `.vercelignore`
- ⚠️ Database not configured – app uses in-memory storage (set `DATABASE_URL` for persistence)

File structure notes
- `src/app/` – Next.js App Router (pages, layouts, API routes)
- `src/components/` – Reusable React components (most are client components)
- `src/components/admin/` – Admin dashboard components (UserManagement, Overview, etc.)
- `src/components/ui/` – shadcn/ui components (Button, Input, Toast, etc.)
- `src/contexts/` – React contexts (AuthContext, AppContext)
- `src/services/` – API client services (authService, adminService, api)
- `src/hooks/` – Custom React hooks (use-toast, use-mobile)
- `src/lib/` – Utilities (db, auth-middleware, utils)
- `prisma/` – Database schema and migrations
- `public/` – Static assets (images, manifest, service worker)

If anything is unclear, ask about: auth flow details, Prisma migration workflow, specific component patterns, or deployment troubleshooting.

