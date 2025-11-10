# CRON Job Setup Guide

## Overview
The `/api/cron/daily-report` endpoint is a protected cron job route that executes daily automated tasks like reports, cleanup, and scheduled emails.

## Security Configuration

### 1. Generate CRON_SECRET
Generate a secure 64-character secret using one of these methods:

**Option A: Node.js (recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B: OpenSSL**
```bash
openssl rand -hex 32
```

**Option C: PowerShell (Windows)**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### 2. Add to Vercel Environment Variables

#### Via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project (regisbridge.page)
3. Navigate to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `CRON_SECRET`
   - **Value**: `<your-generated-secret>`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application for the change to take effect

#### Via Vercel CLI:
```bash
# Add to all environments
vercel env add CRON_SECRET

# Or add to specific environment
vercel env add CRON_SECRET production
vercel env add CRON_SECRET preview
vercel env add CRON_SECRET development
```

### 3. Configure Vercel Cron Job

#### Create `vercel.json` cron configuration:
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-report",
      "schedule": "0 0 * * *"
    }
  ]
}
```

**Schedule format**: Standard cron syntax
- `"0 0 * * *"` = Daily at midnight UTC
- `"0 9 * * *"` = Daily at 9 AM UTC
- `"0 */6 * * *"` = Every 6 hours
- `"0 0 * * 1"` = Every Monday at midnight

#### Via Vercel Dashboard:
1. Go to **Settings** → **Cron Jobs**
2. Click **Add Cron Job**
3. Configure:
   - **Path**: `/api/cron/daily-report`
   - **Schedule**: `0 0 * * *` (or your preferred schedule)
   - **Custom Headers**: Add authorization header:
     - **Header Name**: `Authorization`
     - **Header Value**: `Bearer ${CRON_SECRET}`
4. Click **Create**

**Important**: Vercel will automatically inject your `CRON_SECRET` environment variable when you use `${CRON_SECRET}` in the header value.

## Testing the Cron Job

### Local Testing
```bash
# Set CRON_SECRET in your local .env.local file
echo "CRON_SECRET=your-test-secret-here" >> .env.local

# Test with curl (PowerShell)
$headers = @{ "Authorization" = "Bearer your-test-secret-here" }
Invoke-WebRequest -Uri "http://localhost:3000/api/cron/daily-report" -Method GET -Headers $headers

# Test with curl (bash/Linux/Mac)
curl -X GET http://localhost:3000/api/cron/daily-report \
  -H "Authorization: Bearer your-test-secret-here"
```

### Production Testing
```bash
# Get your CRON_SECRET from Vercel dashboard
# Replace <your-secret> with actual secret
curl -X GET https://regisbridge.page/api/cron/daily-report \
  -H "Authorization: Bearer <your-secret>"
```

**Expected responses**:
- **200 OK**: Cron executed successfully
  ```json
  {
    "success": true,
    "message": "Daily cron executed",
    "timestamp": "2024-01-15T00:00:00.000Z",
    "env": "production"
  }
  ```
- **401 Unauthorized**: Invalid or missing token
  ```json
  {
    "success": false,
    "message": "Unauthorized"
  }
  ```
- **500 Internal Server Error**: CRON_SECRET not configured
  ```json
  {
    "success": false,
    "message": "CRON_SECRET is not configured"
  }
  ```

## Current Implementation

The cron endpoint at `src/app/api/cron/daily-report/route.ts` currently:
- ✅ Validates Bearer token against `CRON_SECRET`
- ✅ Returns 401 for unauthorized requests
- ✅ Returns 500 if CRON_SECRET is not configured
- ⚠️ Contains placeholder logic (see TODO comment)

### Next Steps for Implementation:
1. Add actual daily tasks in the `GET` handler:
   - Generate and email daily reports
   - Cleanup expired sessions or temporary data
   - Send scheduled notifications
   - Update cache or indexes
   - Run database maintenance tasks

2. Add logging/monitoring:
   ```typescript
   console.log('[CRON] Daily report started', { timestamp: now })
   // ... run tasks ...
   console.log('[CRON] Daily report completed', { timestamp: new Date(), duration: Date.now() - now.getTime() })
   ```

3. Add error handling for individual tasks:
   ```typescript
   const results = {
     reports: await runReports().catch(e => ({ error: e.message })),
     cleanup: await runCleanup().catch(e => ({ error: e.message })),
     emails: await sendScheduledEmails().catch(e => ({ error: e.message }))
   }
   ```

## Security Best Practices

1. **Never commit CRON_SECRET to git** - Always use environment variables
2. **Use different secrets per environment** - Don't reuse production secrets in development
3. **Rotate secrets periodically** - Update CRON_SECRET every 90 days
4. **Monitor cron execution** - Add logging/alerting for failed cron jobs
5. **Rate limit the endpoint** - Consider adding rate limiting even with authentication
6. **Use HTTPS only** - Never expose cron endpoints over HTTP

## Troubleshooting

### Cron job not executing
- Check Vercel dashboard → **Deployments** → **Functions** for logs
- Verify cron configuration in Vercel settings
- Ensure authorization header includes `Bearer ` prefix
- Check that CRON_SECRET environment variable is set

### 401 Unauthorized error
- Verify CRON_SECRET matches in both Vercel env vars and cron job header
- Check for extra spaces or newlines in the secret
- Ensure header uses `Bearer ${CRON_SECRET}` syntax (with dollar sign and braces)

### 500 Internal Server Error
- Check Vercel function logs for detailed error
- Verify CRON_SECRET is set in the correct environment (Production/Preview/Development)
- Ensure latest deployment has the environment variable

## Additional Resources

- [Vercel Cron Jobs Documentation](https://vercel.com/docs/cron-jobs)
- [Cron Expression Format](https://crontab.guru/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
