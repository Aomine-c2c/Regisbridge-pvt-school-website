import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

/**
 * Identify function to add user properties for feature flags
 * This is deduped to ensure it only runs once per request
 * See docs.statsig.com/concepts/user for more details
 */
export const identify = dedupe((async () => ({
  // Add any additional user properties you'd like
  // For example, you can integrate with your auth system to get the real user ID
  userID: "1234", // Replace with actual user ID from your auth context
  // email: "user@example.com",
  // custom: { plan: "premium" }
})) satisfies Identify<StatsigUser>);

/**
 * Create a feature flag with the given key
 * @param key - The feature flag key from your Statsig console
 * @returns A feature flag function that returns a boolean
 */
export const createFeatureFlag = (key: string) => flag<boolean, StatsigUser>({
  key,
  adapter: statsigAdapter.featureGate(
    (gate) => gate.value,
    { exposureLogging: true }
  ),
  identify,
});
