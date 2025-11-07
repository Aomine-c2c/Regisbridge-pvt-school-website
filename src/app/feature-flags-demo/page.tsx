import { createFeatureFlag } from "@/lib/flags";

/**
 * Feature Flags Demo Page
 * This demonstrates how to use feature flags with Statsig
 * Note: This is designed for server components & middleware
 * For client-side usage, check the flags documentation
 */
export default async function FeatureFlagsDemo() {
  // Create feature flags
  const myFirstGate = await createFeatureFlag("my_first_gate")();
  const darkModeFlag = await createFeatureFlag("enable_dark_mode")();
  const betaFeaturesFlag = await createFeatureFlag("beta_features")();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1C1A75] mb-8">
          Feature Flags Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How Feature Flags Work</h2>
          <p className="text-gray-600 mb-4">
            Feature flags are evaluated on the server side and allow you to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Roll out features gradually to specific users or groups</li>
            <li>A/B test new features</li>
            <li>Toggle features on/off without deploying code</li>
            <li>Manage feature releases independently of deployments</li>
          </ul>
          <p className="text-sm text-gray-500">
            Configure these flags in your{" "}
            <a
              href="https://console.statsig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1C1A75] hover:text-[#D4AF37] underline"
            >
              Statsig console
            </a>
          </p>
        </div>

        <div className="space-y-6">
          <FeatureFlagCard
            name="my_first_gate"
            enabled={myFirstGate}
            description="Your first feature gate - disabled by default"
          />
          
          <FeatureFlagCard
            name="enable_dark_mode"
            enabled={darkModeFlag}
            description="Controls whether dark mode is available"
          />
          
          <FeatureFlagCard
            name="beta_features"
            enabled={betaFeaturesFlag}
            description="Enables beta features for testing"
          />
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Next Steps
          </h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-2">
            <li>Set up your Statsig account and get your SDK key</li>
            <li>Add <code className="bg-blue-100 px-2 py-1 rounded">STATSIG_SDK_KEY</code> to your environment variables</li>
            <li>Create feature gates in the Statsig console</li>
            <li>Use <code className="bg-blue-100 px-2 py-1 rounded">createFeatureFlag()</code> in your components</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

interface FeatureFlagCardProps {
  name: string;
  enabled: boolean;
  description: string;
}

function FeatureFlagCard({ name, enabled, description }: FeatureFlagCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
      enabled ? 'border-l-green-500' : 'border-l-red-500'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {name}
        </h3>
        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
          enabled 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {enabled ? 'ON' : 'OFF'}
        </span>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
