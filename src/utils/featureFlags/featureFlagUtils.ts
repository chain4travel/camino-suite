// src/utils/featureFlagUtils.ts
import axios from 'axios'
import semver from 'semver'
import featureFlags, { simpleFeatureFlags } from '../../constants/featureFlag-consts'

// Helper function to compare semantic versions
function compareVersions(version1: string, version2: string): number {
    const v1Parts = version1.split('.').map(Number)
    const v2Parts = version2.split('.').map(Number)

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] || 0
        const v2Part = v2Parts[i] || 0

        if (v1Part > v2Part) return 1
        if (v1Part < v2Part) return -1
    }

    return 0
}

// Check if version is 1.2.0 or higher
function isVersionSupported(version: string): boolean {
    const minVersion = '1.2.0'
    return compareVersions(version, minVersion) >= 0
}

// Your modified function
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

// Function to check if feature should be enabled
export async function isEnabled(url: string, credential = false): Promise<boolean> {
    const version = await getNodeVersion(url, credential)

    if (!version || version === 'timeout') {
        return false
    }

    return isVersionSupported(version)
}

export async function isFeatureEnabled(
    featureName: string,
    url: string,
    phases?: Record<string, number>,
): Promise<boolean> {
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

    if (!isNodeVersionValid) {
        return false
    }

    if (feature.requiredUpgradePhase && phases) {
        if (phases?.length < 1) {
            return false
        }

        const requiredPhaseValue = phases[feature.requiredUpgradePhase]

        if (isNaN(requiredPhaseValue) || requiredPhaseValue === 0) {
            return false
        }
    }

    return feature.enabled
}

export function isFeaturePartnerEnabled(networkName: string) {
    const feature = simpleFeatureFlags['PartnerMessengerFeature']

    if (!feature) {
        console.warn(`Feature flag "PartnerMessengerFeature" does not exist.`)
        return false
    }

    switch (networkName.toLowerCase()) {
        case 'camino':
            return feature.camino
        case 'columbus':
            return feature.columbus
        default:
            return true
    }
}
