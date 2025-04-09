// config/featureFlags.ts
import { FeatureFlag } from '../utils/types/featureFlag-type'

export const simpleFeatureFlags = {
    PartnerMessengerFeature: {
        camino: false,
        columbus: true,
    },
}

const featureFlags: { [key: string]: FeatureFlag } = {
    DACFeature: {
        enabled: true,
        nodeVersion: '>=1.1.0',
        requiredUpgradePhase: 'BerlinPhase', // Add the required phase name here
    },
    // Add more feature flags as needed
}

export default featureFlags
