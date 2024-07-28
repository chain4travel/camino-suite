// src/utils/featureFlagUtils.ts
import axios from 'axios'
import semver from 'semver'
import featureFlags from '../../constants/featureFlag-consts'

export async function getNodeVersion(url: string, credential = false): Promise<string | null> {
    try {
        const response = await axios.post(
            `${url}/ext/info`,
            { jsonrpc: '2.0', id: 1, method: 'info.getNodeVersion' },
            { withCredentials: credential, timeout: 60000 },
        )

        const versionString = response.data.result.version
        const versionMatch = versionString.match(/\/(\d+\.\d+\.\d+)/)

        return versionMatch ? versionMatch[1] : null
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            return 'timeout'
        }
        return null
    }
}

export async function isFeatureEnabled(featureName: string, url: string): Promise<boolean> {
    const feature = featureFlags[featureName]

    if (!feature) {
        console.warn(`Feature flag "${featureName}" does not exist.`)
        return false
    }

    const nodeVersion = await getNodeVersion(url)
    if (typeof nodeVersion !== 'string') {
        console.error('Failed to get node version:', nodeVersion)
        return false
    }
    const isNodeVersionValid = semver.satisfies(nodeVersion, feature.nodeVersion)
    const now = new Date()
    const isWithinTimeRange = now >= new Date(feature.startTime) && now <= new Date(feature.endTime)

    return feature.enabled && isNodeVersionValid && isWithinTimeRange
}
