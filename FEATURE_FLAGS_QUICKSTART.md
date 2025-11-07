# Feature Flags Integration - Quick Start

## ✅ What's Been Added

### 1. Core Implementation
- **`src/lib/flags.ts`** - Main feature flags configuration with Statsig adapter
- **`src/lib/flags-auth-integration.example.ts`** - Example showing auth integration
- **`src/app/feature-flags-demo/page.tsx`** - Live demo page at `/feature-flags-demo`
- **`FEATURE_FLAGS_GUIDE.md`** - Comprehensive documentation

### 2. Dependencies Installed
- `flags` (v4.0.2) - Feature flag framework
- `@flags-sdk/statsig` (v0.2.5) - Statsig adapter

### 3. Environment Configuration
- Added `STATSIG_SDK_KEY` to `.env.example`

## 🚀 How to Use

### Step 1: Get Statsig API Key
1. Sign up at https://console.statsig.com
2. Create a new project
3. Copy your **Server Secret Key**

### Step 2: Configure Environment
Add to `.env.local`:
```bash
STATSIG_SDK_KEY="secret-xxxxxxxxxxxxx"
```

### Step 3: Create Feature Gates in Statsig
1. Go to Statsig console → Feature Gates
2. Click "Create New"
3. Name your gate (e.g., `new_admin_dashboard`)
4. Set targeting rules (all users, percentage, specific users, etc.)

### Step 4: Use in Your Code

**Server Component Example:**
```tsx
import { featureFlags } from "@/lib/flags";

export default async function MyPage() {
  const showNewFeature = await featureFlags.betaFeatures();
  
  return (
    <div>
      {showNewFeature ? <NewFeature /> : <OldFeature />}
    </div>
  );
}
```

**Custom Flag:**
```tsx
import { createFeatureFlag } from "@/lib/flags";

export default async function MyPage() {
  const enabled = await createFeatureFlag("my_custom_flag")();
  // Use enabled boolean...
}
```

## 📚 Documentation

- **Full Guide**: See `FEATURE_FLAGS_GUIDE.md` for complete documentation
- **Demo Page**: Visit `http://localhost:3000/feature-flags-demo` when dev server is running
- **Auth Integration**: See `src/lib/flags-auth-integration.example.ts` for user-specific flags

## 🎯 Pre-configured Feature Flags

The following flags are ready to use (configure them in Statsig console):

- `featureFlags.newAdminDashboard()` - New admin dashboard design
- `featureFlags.betaFeatures()` - Beta features toggle
- `featureFlags.aiInsights()` - AI-powered insights
- `featureFlags.darkMode()` - Dark mode toggle
- `featureFlags.studentPortalV2()` - Student portal enhancements

## ✨ Key Benefits

- **No Deployments**: Toggle features without code changes
- **Gradual Rollouts**: Release to 5%, 25%, 50%, 100% of users
- **User Targeting**: Target by role, email, or custom properties
- **A/B Testing**: Test different features with different user groups
- **Safe Releases**: Instantly disable problematic features
- **Analytics**: Automatic exposure logging for feature usage

## 🔒 Security Notes

- Feature flags are evaluated **server-side only** for security
- Never expose sensitive logic in client-side code
- Use environment variables for Statsig API keys
- Follow principle of least privilege for user data

## Next Steps

1. **Set up Statsig account** and get your API key
2. **Add STATSIG_SDK_KEY** to your environment variables
3. **Create your first feature gate** in Statsig console
4. **Test with the demo page** at `/feature-flags-demo`
5. **Integrate into your components** following the examples

## Support

- Statsig Docs: https://docs.statsig.com
- Flags SDK: https://github.com/vercel/flags
- Feature Flags Guide: `FEATURE_FLAGS_GUIDE.md`

---

**Commit**: `d149d2a` - "feat: add Statsig feature flags integration with demo page and documentation"
