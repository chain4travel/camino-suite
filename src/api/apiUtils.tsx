import { store } from '../App'

export const getBaseUrl = (): string | undefined => {
    let activeNetwork = store.getState().network.activeNetwork.explorerUrl
    return activeNetwork
}
