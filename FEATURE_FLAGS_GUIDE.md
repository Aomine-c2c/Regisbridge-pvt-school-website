/**
 * Feature Flags Integration Guide
 * 
 * This guide shows how to use Statsig feature flags in your Regisbridge application.
 * Feature flags are evaluated on the server side for better performance and security.
 */

## Setup

1. **Install Dependencies** (Already done ✓)
   ```bash
   npm install flags @flags-sdk/statsig
   ```

2. **Get Your Statsig SDK Key**
   - Sign up at https://console.statsig.com
   - Create a new project
   - Copy your Server Secret Key

3. **Add Environment Variable**
   Add to `.env.local` (development) or Vercel environment variables (production):
   ```bash
   STATSIG_SDK_KEY="secret-your-statsig-key-here"
   ```

## Usage Examples

### 1. Server Component (Recommended)

```tsx
// src/app/admin/page.tsx
import { featureFlags } from "@/lib/flags";

export default async function AdminDashboard() {
  const useNewDashboard = await featureFlags.newAdminDashboard();
  
  if (useNewDashboard) {
    return <NewAdminDashboard />;
  }
  
  return <ClassicAdminDashboard />;
}
```

### 2. Conditional Features

```tsx
// src/app/portal/page.tsx
import { featureFlags } from "@/lib/flags";

export default async function StudentPortal() {
  const [showAIInsights, useBetaFeatures] = await Promise.all([
    featureFlags.aiInsights(),
    featureFlags.betaFeatures(),
  ]);

  return (
    <div>
      <h1>Student Portal</h1>
      
      {showAIInsights && (
        <AIInsightsDashboard />
      )}
      
      {useBetaFeatures && (
        <BetaFeaturesPanel />
      )}
      
      <StandardPortalContent />
    </div>
  );
}
```

### 3. API Route Protection

```tsx
// src/app/api/beta/route.ts
import { NextRequest, NextResponse } from "next/server";
import { featureFlags } from "@/lib/flags";

export async function GET(request: NextRequest) {
  const betaEnabled = await featureFlags.betaFeatures();
  
  if (!betaEnabled) {
    return NextResponse.json(
      { error: "This feature is not available yet" },
      { status: 403 }
    );
  }
  
  // Beta feature logic here
  return NextResponse.json({ data: "Beta feature data" });
}
```

### 4. User-Specific Flags

To target specific users, update `src/lib/flags.ts`:

```tsx
import { verifyAuth } from "@/lib/auth-middleware";
import { cookies } from "next/headers";

export const identify = dedupe((async () => {
  // Get user from auth token
  const token = cookies().get("token")?.value;
  const user = token ? await verifyTokenAndGetUser(token) : null;
  
  return {
    userID: user?.id || "anonymous",
    email: user?.email,
    custom: {
      role: user?.role,
      schoolId: user?.schoolId,
      // Add any properties you want to target in Statsig
    }
  };
}) satisfies Identify<StatsigUser>);
```

## Statsig Console Configuration

### Creating a Feature Gate

1. Go to https://console.statsig.com
2. Click "Feature Gates" → "Create New"
3. Set the gate name (e.g., `new_admin_dashboard`)
4. Configure targeting rules:
   - **Everyone**: Enable/disable for all users
   - **User ID**: Target specific users
   - **Custom Fields**: Target by role, email domain, etc.
   - **Percentage Rollout**: Gradually release to X% of users

### Targeting Examples

**Enable for admins only:**
```
custom.role equals "admin"
```

**Enable for 10% of users:**
```
Percentage rollout: 10%
```

**Enable for specific email domains:**
```
email ends with "@regisbridge.com"
```

## Best Practices

1. **Default to OFF**: New flags should be disabled by default for safety
2. **Clean up old flags**: Remove flags after features are fully rolled out
3. **Server-side evaluation**: Keep flag logic on the server for security
4. **Logging**: Statsig automatically logs exposures for analytics
5. **Testing**: Test both flag states before deploying

## Migration Path

To gradually roll out a new feature:

1. **Week 1**: Create flag, enable for internal testing (5% of users)
2. **Week 2**: Increase to 25% if no issues
3. **Week 3**: Increase to 75% 
4. **Week 4**: Enable for 100%
5. **Week 5**: Remove flag, make feature permanent

## Troubleshooting

**Flag always returns false:**
- Check `STATSIG_SDK_KEY` is set correctly
- Verify flag exists in Statsig console
- Check targeting rules aren't excluding you

**Build errors:**
- Make sure you're using async functions (server components)
- Check imports are from `"flags/next"` not `"flags"`

**Client-side usage:**
For client components, you need to pass the flag value as a prop from a server component, or use the client-side SDK separately.

## Demo Page

Visit `/feature-flags-demo` to see feature flags in action!
