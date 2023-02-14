export interface Chain {
    chainID: string
    chainAlias: string
    vm: string
    avaxAssetID: string
    networkID: number
}

export interface Network {
    id: string
    displayName: string
    protocol: string
    host: string
    port: number
    predefined?: boolean
    magellanAddress: string
    signavaultAddress: string
}
