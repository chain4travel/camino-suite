// config/featureFlags.ts

import { FeatureFlag } from '../utils/types/featureFlag-type'

const featureFlags: { [key: string]: FeatureFlag } = {
    DACFeature: {
        enabled: true,
        nodeVersion: '>=1.1.18',
        startTime: '2024-08-01T00:00:00Z',
        endTime: '2024-12-31T23:59:59Z',
    },
    // Add more feature flags as needed
}

export default featureFlags
