"use client";

import { useFeatureFlag } from "@/contexts/FeatureFlagContext";
import React from "react";

interface FeatureGuardProps {
  feature: "enableFinance" | "enableHostel" | "enableTransport" | "enableLibrary" | "enableHR";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGuard = ({ feature, children, fallback = null }: FeatureGuardProps) => {
  const isEnabled = useFeatureFlag(feature);

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
