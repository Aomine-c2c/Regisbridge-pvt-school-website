# Quick Reference Card 🚀

## What Was Fixed (Phase 1)

### ✅ Security
- Removed server libraries exposing API keys
- Fixed environment variables to Vite format
- Email service now calls backend API

### ✅ Bugs  
- Toast delay: 16 minutes → 5 seconds
- CSS spacing: `space-4` → `space-x-4`

### ✅ Code Quality
- Removed 2/3 toast systems
- Created shared navigation utilities
- Added TypeScript environment types

## Files to Know

### Configuration
- `.env.example` - Template for environment variables (copy to `.env`)
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript settings

### Core Services
- `src/services/emailService.ts` - Email API client (calls backend)
- `src/services/api.ts` - General API service
- `src/utils/navigation.ts` - Navigation utilities

### Documentation
- `IMPLEMENTATION_GUIDE.md` - Full 7-phase implementation plan
- `PHASE_1_SUMMARY.md` - Phase 1 completion summary
- `README.md` - Project overview

## Quick Commands

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server (port 8080)
npm run build            # Build for production
npm run preview          # Preview production build

# Linting
npm run lint             # Check code quality
```

## Environment Variables (Vite Format)

```typescript
// ✅ CORRECT - Vite format
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// ❌ WRONG - Create React App format (don't use!)
const apiUrl = process.env.REACT_APP_API_URL;  // Won't work!
const isDev = process.env.NODE_ENV === 'development';  // Won't work!
```

## Import Patterns

```typescript
// ✅ Navigation utilities
import { scrollToSection, throttle, debounce } from '@/utils/navigation';

// ✅ Email service
import { sendEmail, emailService } from '@/services/emailService';

// ✅ API service  
import { api } from '@/services/api';

// ❌ Don't import server libraries in frontend!
import sgMail from '@sendgrid/mail';  // NO!
import nodemailer from 'nodemailer';  // NO!
```

## Next Steps (Priority Order)

1. **Create Backend API** (4-6 hours) - REQUIRED for production
   - Email sending endpoint
   - Contact form handler
   - Newsletter signup
   - See: IMPLEMENTATION_GUIDE.md Phase 2

2. **Implement Authentication** (6-8 hours) - REQUIRED for portals
   - Choose: Supabase / Auth0 / Custom JWT
   - See: IMPLEMENTATION_GUIDE.md Phase 3

3. **Fix Service Worker** (2-3 hours) - Optional (PWA only)
   - Install vite-plugin-pwa
   - See: IMPLEMENTATION_GUIDE.md Phase 6

4. **Add Testing** (8-12 hours) - Recommended
   - Install Vitest + Testing Library
   - See: IMPLEMENTATION_GUIDE.md Phase 4

## Deployment Checklist

### Before Deploying
- [ ] Create `.env` file with real values
- [ ] Deploy backend API first
- [ ] Update `VITE_API_URL` to production URL
- [ ] Test all forms locally
- [ ] Build succeeds: `npm run build`

### Deploy Frontend
- **Netlify:** Connect repo, set build command `npm run build`, publish dir `dist`
- **Vercel:** Import project, framework Vite, build `npm run build`, output `dist`

### Deploy Backend
- **Netlify Functions:** Create `netlify/functions/` directory
- **Vercel Serverless:** Create `api/` directory
- See IMPLEMENTATION_GUIDE.md Phase 2 for code examples

## Common Issues & Solutions

### "Property 'env' does not exist on type 'ImportMeta'"
**Fix:** Import `vite-env.d.ts` is missing or not in tsconfig includes

### Email sending fails
**Fix:** Backend API not running or VITE_API_URL not set

### Toast notifications not appearing
**Fix:** Check TOAST_REMOVE_DELAY in `use-toast.ts` (should be 5000)

### Service Worker errors in console
**Fix:** Normal in dev mode, will be fixed in Phase 6 with vite-plugin-pwa

## Contact & Support

- **Documentation:** See IMPLEMENTATION_GUIDE.md for detailed instructions
- **Phase 1 Summary:** See PHASE_1_SUMMARY.md for what's completed
- **School Contact:** regisbridgepvtsch@gmail.com, +263 779 097 410

---

**Last Updated:** October 19, 2025
**Status:** Phase 1 Complete ✅ | Phase 2 Ready 🚧
