# Implementation Guide - Regisbridge School Website

## ✅ Phase 1: Critical Security Fixes (COMPLETED)

### 1. Fixed Environment Variables
- ✅ Changed `process.env.REACT_APP_*` to `import.meta.env.VITE_*`
- ✅ Created `src/vite-env.d.ts` with proper TypeScript definitions
- ✅ Updated `src/services/api.ts` to use Vite env format
- ✅ Updated `src/components/ErrorBoundary.tsx` to use `import.meta.env.DEV`
- ✅ Created `.env.example` template file

**Action Required:** Create a `.env` file from `.env.example` and add your actual API keys.

### 2. Removed Server-Side Libraries
- ✅ Uninstalled `@sendgrid/mail`, `nodemailer`, and `twilio` from frontend
- ✅ Rewrote `src/services/emailService.ts` to call backend API instead
- ✅ All email functionality now makes fetch() calls to backend

**Action Required:** Create a backend API at `/api/email/send` (see Backend Setup below).

### 3. Fixed Triple Toast System
- ✅ Removed duplicate toast imports from `src/App.tsx`
- ✅ Now using only `@/components/ui/toaster`
- ✅ Removed Sonner and react-toastify imports

### 4. Fixed Critical Bugs
- ✅ Fixed toast delay: `1000000ms` → `5000ms` in `use-toast.ts`
- ✅ Fixed CSS typo in Header: `space-4` → `space-x-4`

### 5. Created Utility Functions
- ✅ Created `src/utils/navigation.ts` with reusable functions:
  - `scrollToSection()` - Smooth scroll to sections
  - `scrollToTop()` - Scroll to top
  - `throttle()` - Throttle function calls
  - `debounce()` - Debounce function calls
  - `isElementInViewport()` - Check element visibility

**Action Required:** Replace duplicate `scrollToSection` functions in components with imports from `src/utils/navigation.ts`.

---

## 🚧 Phase 2: Backend API Setup (TODO - HIGH PRIORITY)

### Required Backend Endpoints

Create a Node.js/Express backend or serverless functions with these endpoints:

#### POST /api/email/send
```typescript
interface EmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}
```

**Implementation Steps:**
1. Create backend directory: `mkdir server && cd server`
2. Initialize: `npm init -y`
3. Install dependencies: `npm install express cors @sendgrid/mail dotenv`
4. Create `server/.env` with API keys:
   ```
   SENDGRID_API_KEY=your-actual-api-key
   PORT=3001
   ALLOWED_ORIGINS=http://localhost:8080
   ```
5. Create `server/index.js`:

```javascript
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors({ origin: process.env.ALLOWED_ORIGINS }));
app.use(express.json());

app.post('/api/email/send', async (req, res) => {
  try {
    const { to, subject, html, text, from, replyTo } = req.body;
    
    // Validation
    if (!to || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, subject'
      });
    }

    // Send email
    const msg = {
      to,
      from: from || 'noreply@regisbridge.ac.zw',
      subject,
      html: html || text,
      text: text || html?.replace(/<[^>]*>/g, ''),
      replyTo,
    };

    const result = await sgMail.send(msg);
    
    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result[0].headers['x-message-id'],
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

6. Start backend: `node index.js`
7. Update frontend `.env`: `VITE_API_URL=http://localhost:3001/api`

---

## 🔐 Phase 3: Authentication System (TODO - CRITICAL)

### Current Issues
- ❌ Hardcoded password "password"
- ❌ Client-side validation only
- ❌ Credentials stored in localStorage (insecure)
- ❌ No session expiration
- ❌ No actual backend verification

### Solution Options

#### Option A: Use Auth0 (Recommended for production)
1. Install: `npm install @auth0/auth0-react`
2. Set up Auth0 application at https://auth0.com
3. Replace `src/contexts/AuthContext.tsx` with Auth0Provider
4. Cost: Free for up to 7,000 users

#### Option B: Use Supabase Auth
1. Install: `npm install @supabase/supabase-js`
2. Set up Supabase project
3. Implement in AuthContext using Supabase client
4. Cost: Free tier available

#### Option C: Custom Backend JWT
1. Create `/api/auth/login` and `/api/auth/verify` endpoints
2. Use bcrypt for password hashing
3. Issue JWT tokens with expiration
4. Store tokens in httpOnly cookies
5. Requires more security expertise

**Recommended:** Start with Supabase Auth (easiest) or Auth0 (most features).

---

## 🧪 Phase 4: Testing Infrastructure (TODO - HIGH)

### Setup Vitest + React Testing Library

1. Install dependencies:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

2. Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

3. Create `src/test/setup.ts`:
```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
```

4. Add test script to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

5. Write your first test: `src/components/__tests__/Header.test.tsx`

---

## 📊 Phase 5: TypeScript Strict Mode (TODO - MEDIUM)

### Enable Incrementally

1. Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

2. Fix errors file by file:
   - Start with utility files (`src/utils/`, `src/lib/`)
   - Then services (`src/services/`)
   - Then components (start with simple ones)
   - Finally contexts and pages

3. Common fixes needed:
   - Add type annotations to function parameters
   - Handle null/undefined cases
   - Define proper interfaces for props
   - Remove unused variables

**Estimated time:** 8-12 hours

---

## 🚀 Phase 6: Service Worker Fix (TODO - HIGH)

### Current Issues
- ❌ Caches wrong files (`/static/js/bundle.js` doesn't exist in Vite)
- ❌ Breaks HMR in development

### Solution: Use vite-plugin-pwa

1. Install:
```bash
npm install -D vite-plugin-pwa
```

2. Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Regisbridge Private School',
        short_name: 'Regisbridge',
        description: 'Excellence in Education',
        theme_color: '#1C1A75',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ]
});
```

3. Delete `public/sw.js` (plugin will generate automatically)
4. Remove manual SW registration from `src/main.tsx`

---

## 📝 Phase 7: Content Management System (TODO - MEDIUM)

### Options

#### Option A: Headless CMS (Strapi/Contentful/Sanity)
**Pros:** Best for non-technical content editors, visual editor
**Cons:** Additional service to manage

#### Option B: Markdown + Git (Recommended for school)
**Pros:** Version controlled, free, simple
**Cons:** Requires basic technical knowledge

**Recommended Setup:**
1. Create `content/` directory with markdown files
2. Install: `npm install gray-matter`
3. Create content loader in `src/lib/content.ts`
4. Store news, events, announcements as `.md` files
5. Use GitHub for content management

---

## 🎨 Phase 8: Missing Production Assets (TODO - LOW)

### Required Assets

1. **Open Graph Image** (`public/og.jpg`)
   - Size: 1200x630px
   - Shows in social media previews
   - Should include school logo and tagline

2. **PWA Icons**
   - `public/icon-192.png` (192x192)
   - `public/icon-512.png` (512x512)
   - `public/apple-touch-icon.png` (180x180)
   - Use school logo with proper spacing

3. **Favicon**
   - `public/favicon.ico`
   - Multi-resolution (16x16, 32x32, 48x48)

4. **Logo Files**
   - Standardize on `public/logo.png`
   - Create versions: logo.png, logo-dark.png, logo-mobile.png

**Tools:** Use Figma, Canva, or Photoshop to create these assets.

---

## 🏃‍♂️ Quick Start After These Fixes

### Development
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev

# In another terminal, start backend (if created)
cd server && node index.js
```

### Production Deployment

#### Deploy to Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy backend functions to Netlify Functions

#### Deploy to Vercel
1. Import project from GitHub
2. Framework: Vite
3. Build: `npm run build`
4. Output: `dist`
5. Add environment variables
6. Deploy backend to Vercel Serverless Functions

---

## 📋 Summary of Changes Made

### Files Modified
- ✅ `src/services/api.ts` - Fixed environment variables
- ✅ `src/components/ErrorBoundary.tsx` - Fixed environment variables
- ✅ `src/services/emailService.ts` - Complete rewrite (backend API client)
- ✅ `src/App.tsx` - Removed duplicate toast systems
- ✅ `src/hooks/use-toast.ts` - Fixed delay bug (5 seconds)
- ✅ `src/components/Header.tsx` - Fixed CSS spacing bug

### Files Created
- ✅ `src/vite-env.d.ts` - Vite environment type definitions
- ✅ `.env.example` - Environment variables template
- ✅ `src/utils/navigation.ts` - Shared navigation utilities
- ✅ `IMPLEMENTATION_GUIDE.md` - This file

### Dependencies Removed
- ✅ `@sendgrid/mail` - Server-only library
- ✅ `nodemailer` - Server-only library
- ✅ `twilio` - Server-only library

---

## ⏱️ Estimated Time to Complete Remaining Tasks

| Phase | Task | Priority | Time | Status |
|-------|------|----------|------|--------|
| 1 | Security Fixes | P0 | 2h | ✅ DONE |
| 2 | Backend API Setup | P0 | 4-6h | 🚧 TODO |
| 3 | Authentication | P0 | 6-8h | 🚧 TODO |
| 4 | Testing Setup | P1 | 8-12h | 🚧 TODO |
| 5 | TypeScript Strict | P2 | 8-12h | 🚧 TODO |
| 6 | Service Worker Fix | P1 | 2-3h | 🚧 TODO |
| 7 | CMS Setup | P2 | 6-8h | 🚧 TODO |
| 8 | Production Assets | P3 | 3-4h | 🚧 TODO |

**Total Remaining:** ~37-53 hours

---

## 🎯 Recommended Next Steps

1. **TODAY:** Set up backend API (Phase 2) - 4-6 hours
2. **THIS WEEK:** Implement authentication (Phase 3) - 6-8 hours
3. **NEXT WEEK:** Fix service worker (Phase 6) - 2-3 hours
4. **ONGOING:** Add tests incrementally (Phase 4)

---

## 📞 Need Help?

If you get stuck on any phase:
1. Check the official documentation for each tool
2. Review the code comments in modified files
3. Search for specific error messages
4. Consider hiring a developer for complex tasks (auth, backend)

**Deployment Blockers:** Phases 2 (Backend) and 3 (Auth) must be completed before production deployment.

---

*Last updated: October 19, 2025*
*Phase 1 implementation completed successfully ✅*
