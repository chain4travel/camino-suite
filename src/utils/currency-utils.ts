import { Amount } from './types/currency-type'
import BigNumber from 'bignumber.js'

const conversionACamPerCam = 1000000000000000000

const conversionACamPerNCam = 1000000000

export const ACAM_CAM_CONVERSION_THRESHHOLD = 1000000000000000

export const ACAM_NCAM_CONVERSION_THRESHHOLD = 1000000

export function aCamToCam(aCam: number) {
    let value = new BigNumber(aCam)
    let converter = new BigNumber(conversionACamPerCam)
    return value.dividedBy(converter).toNumber()
}

export function aCamToNCam(aCam: number) {
    let value = new BigNumber(aCam)
    let converter = new BigNumber(conversionACamPerNCam)
    return value.dividedBy(converter).toNumber()
}

export function nCamToACam(nCam: number) {
    let value = new BigNumber(nCam)
    let converter = new BigNumber(conversionACamPerNCam)
    return value.dividedBy(converter).toNumber()
}

export function getDisplayValueForGewi(nCamVal: number): string {
    let value = new BigNumber(nCamVal)
    let converter = new BigNumber(conversionACamPerNCam)
    return getDisplayValue(value.multipliedBy(converter).toNumber())
}

export function getDisplayValue(aCam: number): string {
    const amount = getDisplayAmount(aCam)
    return formatAmount(amount.value, amount.currency)
}

export function getACamAmount(value: number, currency: string): number {
    if (currency.toLowerCase() === 'cam') {
        return new BigNumber(value).multipliedBy(new BigNumber(conversionACamPerCam)).toNumber()
    } else if (currency.toLowerCase() === 'ncam') {
        return new BigNumber(value).multipliedBy(new BigNumber(conversionACamPerNCam)).toNumber()
    } else {
        return value
    }
}

export function getDisplayAmount(aCam: number): Amount {
    if (aCam === 0 || aCam >= ACAM_CAM_CONVERSION_THRESHHOLD) {
        return {
            value: aCamToCam(aCam),
            currency: 'CAM',
            currencyIcon: 'img:/images/camino-coin-logo.png',
        }
    }
    if (aCam >= ACAM_NCAM_CONVERSION_THRESHHOLD) {
        return {
            value: aCamToNCam(aCam),
            currency: 'nCAM',
            currencyIcon: 'img:/images/camino-ncam-coin-logo.png',
        }
    }
    return {
        value: aCam,
        currency: 'aCAM',
        currencyIcon: 'img:/images/camino-acam-coin-logo.png',
    }
}

export function formatAmount(value: number, currency: string): string {
    return `${customToLocaleString(value)} ${currency}`
}

// ToDo: Update this function
export function abbreviateNumber(value: number): string {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)}B`
    } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`
    } else {
        return value.toString()
    }
}

export function customToLocaleString(value, toFixed = 4, abbreviate = false) {
    if (!abbreviate) {
        let unrounded = new BigNumber(value).toFixed(20)
        let split = unrounded.split('.')
        let wholeStr = parseInt(split[0])
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '\u2005')

        if (split.length === 1) {
            return wholeStr
        } else {
            let remainderStr = split[1]
            let lastChar = remainderStr.charAt(remainderStr.length - 1)
            while (lastChar === '0') {
                remainderStr = remainderStr.substring(0, remainderStr.length - 1)
                lastChar = remainderStr.charAt(remainderStr.length - 1)
            }
            let trimmed = remainderStr.substring(0, toFixed)
            if (!trimmed) return wholeStr
            return `${wholeStr}.${trimmed}`
        }
    } else {
        if (value <= 0.0000999999 && value !== 0) return '< 0.0001'

        let prefixes = ['', 'M', 'B', 'T']
        let prefix = 0
        while (value >= 1000000) {
            value /= 1000000
            prefix++
        }
        return customToLocaleString(value, toFixed, false) + prefixes[prefix]
    }
}

export function roundedToLocaleString(value, toFixed = 4, abbreviate = false) {
    let result = customToLocaleString(value, toFixed, abbreviate)
    if (result.includes('.')) {
        let [wholeStr, trimmed] = result.split('.')

        if (trimmed.split('').every(char => char === '0')) {
            return '~' + wholeStr
        }
    }
    return result
}

export const currencyFields = [
    'baseFeePerGas',
    'gasLimit',
    'gasUsed',
    'cumulativeGasUsed',
    'gasUsed',
    'effectiveGasPrice',
    'value',
    'gasPrice',
    'gas',
]
