import { ChainType } from './types/chain-type'
import {
    XADDRESS,
    PADDRESS,
    XTRANSACTION,
    PTRANSACTION,
    TRANSACTION,
    BLOCK,
    ADDRESS,
} from './route-paths'

export function getPathElement(type: ChainType): string {
    return type.toLowerCase()
}

export function getTransactionDetailsPath(chaintype: ChainType, transactionId: string): string {
    const basePath = `/${getPathElement(chaintype)}${TRANSACTION}/`
    if (transactionId) {
        return basePath + transactionId
    }
    return basePath
}

export function getAddressDetailsPath(chaintype: ChainType, addressId: string): string {
    return `/${getPathElement(chaintype)}${ADDRESS}/${addressId}`
}

export function getBlockDetailsPath(chaintype: ChainType, blockId: string | number): string {
    const basePath = `/${getPathElement(chaintype)}${BLOCK}/`
    if (blockId !== undefined) {
        return basePath + blockId
    }
    return basePath
}

export function getAddressLink(chaintype: ChainType, value: string): string {
    if (chaintype === ChainType.X_CHAIN) {
        return 'X-' + value
    }
    if (chaintype === ChainType.P_CHAIN) {
        return 'P-' + value
    }
    return value
}

export function getAddressFromUrl(): string {
    return window.location.pathname.split('/').pop()
}

export function getTransactionFromUrl(): string {
    return window.location.pathname.split('/').pop()
}

export function getBlockNumber(): string {
    return window.location.pathname.split('/').pop()
}

export function getChainTypeFromUrl(): ChainType {
    const chainType = window.location.pathname.split('/')[2]

    if (chainType === ChainType.X_CHAIN) {
        return ChainType.X_CHAIN
    }
    if (chainType === ChainType.P_CHAIN) {
        return ChainType.P_CHAIN
    }
    return ChainType.C_CHAIN
}

export function getTransactionType(chainType) {
    switch (chainType) {
        case ChainType.X_CHAIN:
            return XTRANSACTION
        case ChainType.P_CHAIN:
            return PTRANSACTION
        default:
            return XTRANSACTION
    }
}

export function getAddressType(chainType) {
    switch (chainType) {
        case ChainType.X_CHAIN:
            return XADDRESS
        case ChainType.P_CHAIN:
            return PADDRESS
        default:
            return XADDRESS
    }
}
