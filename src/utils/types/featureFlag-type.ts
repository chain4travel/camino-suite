// src/utils/types/featureFlag-type.ts
export interface FeatureFlag {
    enabled: boolean;
    nodeVersion: string;
    requiredUpgradePhase?: string; // Optional property for the upgrade phase
}
