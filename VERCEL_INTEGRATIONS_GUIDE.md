# Vercel Integrations Setup Guide

Complete guide for setting up Vercel integrations for Regisbridge Private School website.

## ✅ Already Installed

### 1. **Vercel Analytics** ✅
**Purpose**: Track page views, user behavior, and web vitals

**Status**: ✅ Installed and integrated in `src/app/layout.tsx`

**Features**:
- Real-time page view tracking
- User journey analysis
- Audience insights
- Geographic data
- No impact on performance

**Access**: Visit https://vercel.com/your-project/analytics

---

### 2. **Vercel Speed Insights** ✅
**Purpose**: Monitor Core Web Vitals and performance metrics

**Status**: ✅ Installed and integrated in `src/app/layout.tsx`

**Features**:
- Core Web Vitals (LCP, FID, CLS)
- Performance scores
- Real User Monitoring (RUM)
- Device and browser breakdowns
- Automatic optimization recommendations

**Access**: Visit https://vercel.com/your-project/speed-insights

---

## 🔧 Recommended Integrations (Setup via Vercel Dashboard)

### 3. **Vercel Postgres** (CRITICAL - Database)
**Purpose**: Fully managed PostgreSQL database compatible with your Prisma schema

**Setup Steps**:
1. Go to https://vercel.com/dashboard
2. Select your project: `regisbridge-pvt-school-website`
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a region (closest to Zimbabwe: `Frankfurt (eu-central-1)`)
7. Click **Create**
8. Vercel will automatically set `DATABASE_URL` environment variable

**Post-Setup**:
```bash
# Pull environment variables locally
vercel env pull .env.local

# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Open Prisma Studio to manage data
npx prisma studio
```

**Benefits**:
- ✅ Automatic connection pooling
- ✅ Built-in backups
- ✅ Zero configuration
- ✅ Scales automatically
- ✅ Free tier: 256 MB storage, 60 hours compute

---

### 4. **Vercel Blob** (File Storage)
**Purpose**: Store and serve user-uploaded files (student documents, photos, etc.)

**Setup Steps**:
1. Dashboard → **Storage** → **Create Database**
2. Select **Blob**
3. Name: `regisbridge-files`
4. Create

**Usage**:
```bash
npm install @vercel/blob
```

```typescript
// Example: Upload student documents
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const file = request.body;
  const blob = await put('student-docs/file.pdf', file, {
    access: 'public',
  });
  return Response.json(blob);
}
```

**Benefits**:
- ✅ CDN-optimized delivery
- ✅ Automatic file optimization
- ✅ Free tier: 1 GB storage

---

### 5. **Vercel KV** (Redis Cache)
**Purpose**: Cache frequently accessed data, session storage, rate limiting

**Setup Steps**:
1. Dashboard → **Storage** → **Create Database**
2. Select **KV** (Redis)
3. Name: `regisbridge-cache`
4. Create

**Usage**:
```bash
npm install @vercel/kv
```

```typescript
// Example: Cache user sessions
import { kv } from '@vercel/kv';

// Store session
await kv.set(`session:${userId}`, sessionData, { ex: 3600 });

// Get session
const session = await kv.get(`session:${userId}`);

// Rate limiting
const requests = await kv.incr(`ratelimit:${ip}`);
await kv.expire(`ratelimit:${ip}`, 60);
```

**Use Cases**:
- Session storage
- Rate limiting for API endpoints
- Cache API responses
- Store temporary verification codes

**Benefits**:
- ✅ Ultra-fast (<1ms latency)
- ✅ Free tier: 256 MB storage

---

### 6. **Vercel Cron Jobs** (Scheduled Tasks)
**Purpose**: Run scheduled tasks (send newsletters, generate reports, clean up data)

**Setup Steps**:
Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-report",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/send-newsletter",
      "schedule": "0 8 * * MON"
    },
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    }
  ]
}
```

**Example Cron Routes**:
```typescript
// src/app/api/cron/daily-report/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify cron secret
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Generate daily attendance report
  // Send to admin email
  
  return NextResponse.json({ success: true });
}
```

**Use Cases**:
- Daily attendance reports
- Weekly newsletter dispatch
- Monthly fee reminders
- Data cleanup and backups

---

### 7. **Sentry** (Error Tracking)
**Purpose**: Monitor and fix errors in production

**Setup Steps**:
1. Visit https://vercel.com/integrations/sentry
2. Click **Add Integration**
3. Authorize Sentry
4. Select your project
5. Follow wizard

**Automatic Features**:
- ✅ Source maps uploaded automatically
- ✅ Error tracking with stack traces
- ✅ Performance monitoring
- ✅ Release tracking
- ✅ GitHub integration

**Alternative Setup**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

### 8. **Vercel Toolbar** (Development Preview)
**Purpose**: Preview deployments with comments and feedback

**Setup Steps**:
1. Dashboard → **Settings** → **Toolbar**
2. Enable for your team
3. Automatic on preview deployments

**Features**:
- Comment directly on preview deployments
- Share feedback with team
- Visual bug reporting
- Deployment info overlay

---

### 9. **GitHub Integration** (Already Active)
**Purpose**: Automatic deployments on push

**Status**: ✅ Already configured

**Features**:
- ✅ Auto-deploy on push to `main`
- ✅ Preview deployments for PRs
- ✅ Deployment comments on PRs
- ✅ Commit status checks

---

### 10. **Datadog** (Advanced Monitoring)
**Purpose**: Comprehensive application performance monitoring

**Setup Steps**:
1. Visit https://vercel.com/integrations/datadog
2. Click **Add Integration**
3. Connect your Datadog account
4. Configure metrics to track

**Features**:
- APM (Application Performance Monitoring)
- Log aggregation
- Real User Monitoring
- Infrastructure monitoring
- Custom dashboards

**Note**: Paid service (free trial available)

---

### 11. **Turso** (Edge Database)
**Purpose**: SQLite at the edge with global replication

**Setup Steps**:
1. Visit https://vercel.com/integrations/turso
2. Click **Add Integration**
3. Create Turso database
4. Connect to your project

**Benefits**:
- ✅ SQLite with edge replication
- ✅ Fast read performance globally
- ✅ Compatible with Prisma
- ✅ Free tier: 500 DBs, 1 GB storage

---

### 12. **Checkly** (Synthetic Monitoring)
**Purpose**: Monitor your website uptime and API endpoints

**Setup Steps**:
1. Visit https://vercel.com/integrations/checkly
2. Add integration
3. Create checks for:
   - Homepage availability
   - Login endpoint
   - API health
   - Form submissions

**Benefits**:
- ✅ 24/7 uptime monitoring
- ✅ Multi-location checks
- ✅ Alert notifications
- ✅ Performance metrics

---

### 13. **LogDNA / LogTail** (Log Management)
**Purpose**: Centralized log aggregation and search

**Setup Steps**:
1. Visit https://vercel.com/integrations/logtail
2. Add integration
3. Auto-forward all logs

**Features**:
- Searchable logs
- Real-time streaming
- Alerts on errors
- Log retention

---

### 14. **Doppler** (Secrets Management)
**Purpose**: Manage environment variables securely

**Setup Steps**:
1. Visit https://vercel.com/integrations/doppler
2. Add integration
3. Sync secrets automatically

**Benefits**:
- ✅ Centralized secret management
- ✅ Auto-sync to Vercel
- ✅ Audit logs
- ✅ Team access control

---

### 15. **Statsig** (Feature Flags) - Already Configured!
**Purpose**: A/B testing and feature rollouts

**Status**: ✅ Environment variables already set:
- `STATSIG_SERVER_API_KEY`
- `NEXT_PUBLIC_STATSIG_CLIENT_KEY`
- `EXPERIMENTATION_CONFIG`
- `EXPERIMENTATION_CONFIG_ITEM_KEY`

**Usage**: Already implemented in `src/lib/flags.ts`

---

## 🎯 Priority Setup Order

### **Immediate (Today)**:
1. ✅ **Vercel Analytics** - Already done
2. ✅ **Vercel Speed Insights** - Already done
3. ⚠️ **Vercel Postgres** - CRITICAL for data persistence

### **This Week**:
4. **Sentry** - Error tracking
5. **Vercel KV** - Rate limiting and caching
6. **Vercel Cron Jobs** - Automated tasks

### **Next Week**:
7. **Vercel Blob** - File uploads
8. **Checkly** - Uptime monitoring
9. **LogTail** - Log management

### **Future Enhancements**:
10. **Datadog** - Advanced APM (if budget allows)
11. **Turso** - If need edge database
12. **Doppler** - If managing many secrets

---

## 📊 Cost Breakdown (Free Tier Limits)

| Integration | Free Tier | Paid Starts At |
|-------------|-----------|----------------|
| Analytics | ✅ Unlimited | N/A |
| Speed Insights | ✅ Unlimited | N/A |
| Postgres | 256 MB, 60h compute | $20/month |
| Blob | 1 GB storage | $0.15/GB |
| KV | 256 MB | $0.25/100k requests |
| Cron Jobs | ✅ Unlimited | N/A |
| Sentry | 5k errors/month | $26/month |
| Checkly | 5k checks/month | $7/month |

---

## 🔐 Security Best Practices

1. **Never commit secrets** - Use Vercel environment variables
2. **Use different secrets per environment** (Production, Preview, Development)
3. **Rotate secrets regularly** - JWT tokens, API keys
4. **Enable Vercel Authentication** for preview deployments
5. **Set up Vercel Firewall** rules for API endpoints
6. **Use Vercel Secure Compute** for sensitive operations

---

## 📈 Monitoring Dashboard Setup

After setting up integrations, create a monitoring dashboard:

1. **Vercel Dashboard**: Overview of deployments and analytics
2. **Sentry Dashboard**: Error rates and performance
3. **Checkly Dashboard**: Uptime and API health
4. **Postgres Dashboard**: Database metrics and query performance

---

## 🚀 Next Steps

1. **Set up Vercel Postgres** immediately (replaces in-memory storage)
2. **Install Sentry** for error tracking
3. **Configure Vercel Cron Jobs** for automated tasks
4. **Enable rate limiting** with Vercel KV
5. **Set up uptime monitoring** with Checkly

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Integrations**: https://vercel.com/integrations
- **Community Discord**: https://vercel.com/discord
- **Support**: https://vercel.com/support

---

## ✅ Integration Checklist

- [x] Vercel Analytics integrated
- [x] Speed Insights integrated
- [ ] Vercel Postgres database created
- [ ] Prisma migrations deployed
- [ ] Sentry error tracking installed
- [ ] Vercel KV for rate limiting
- [ ] Cron jobs configured
- [ ] Uptime monitoring setup
- [ ] Log management enabled
- [ ] File storage (Blob) configured

---

**Last Updated**: November 8, 2025  
**Project**: Regisbridge Private School Website  
**Production URL**: https://regisbridge.page
