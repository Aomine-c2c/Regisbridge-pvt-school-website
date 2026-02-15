"use client";

import React, { createContext, useContext } from "react";

interface TenantFeatures {
  enableFinance: boolean;
  enableHostel: boolean;
  enableTransport: boolean;
  enableLibrary: boolean;
  enableHR: boolean;
  enableEvents: boolean;
  enableBlog: boolean;
}

const defaultFeatures: TenantFeatures = {
  enableFinance: false,
  enableHostel: false,
  enableTransport: false,
  enableLibrary: false,
  enableHR: false,
  enableEvents: false,
  enableBlog: false,
};

const FeatureFlagContext = createContext<TenantFeatures>(defaultFeatures);

export const useFeatureFlag = (feature: keyof TenantFeatures) => {
  const features = useContext(FeatureFlagContext);
  return features[feature];
};

export const useAllFeatureFlags = () => {
    return useContext(FeatureFlagContext);
}

export const FeatureFlagProvider = ({
  children,
  features,
}: {
  children: React.ReactNode;
  features: TenantFeatures | null;
}) => {
  // If features are passed from server (e.g. layout), use them.
  // Otherwise default to safe fallback.
  const activeFeatures = features || defaultFeatures;

  return (
    <FeatureFlagContext.Provider value={activeFeatures}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
