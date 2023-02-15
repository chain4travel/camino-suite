export interface Chain {
    chainID: string
    chainAlias: string
    vm: string
    avaxAssetID: string
    networkID: number
}

export interface Network {
    id: string
    url: string
    displayName: string
    predefined?: boolean
    magellanAddress: string
    signavaultAddress: string
}
