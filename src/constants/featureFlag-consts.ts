// config/featureFlags.ts
import { FeatureFlag } from '../utils/types/featureFlag-type';

const featureFlags: { [key: string]: FeatureFlag } = {
    DACFeature: {
        enabled: true,
        nodeVersion: '>=1.1.0',
        requiredUpgradePhase: 'BerlinPhase', // Add the required phase name here
    },
    // Add more feature flags as needed
};

export default featureFlags;
