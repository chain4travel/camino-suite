// config/featureFlags.ts

import { FeatureFlag } from '../utils/types/featureFlag-type'

const featureFlags: { [key: string]: FeatureFlag } = {
    DACFeature: {
        enabled: true,
        nodeVersion: '>=1.1.19',
        startTime: '2024-07-01T00:00:00Z',
    },
    // Add more feature flags as needed
}

export default featureFlags
