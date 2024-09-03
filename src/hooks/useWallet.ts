import { ava as caminoClient } from 'wallet/caminoClient'
import { getNameOfWallet, getPchainAddress } from '../helpers/walletStore'
import { updatePchainAddress } from '../redux/slices/app-config'
import { useAppDispatch } from './reduxHooks'

const useWallet = () => {
    const dispatch = useAppDispatch()

    async function getRegisteredNode(address: string): Promise<string> {
        return await caminoClient.PChain().getRegisteredShortIDLink(address)
    }
    const getAddress = address => {
        if (address) {
            let res = caminoClient
                .PChain()
                .addressFromBuffer(caminoClient.PChain().parseAddress(address))
            return res
        }
        return ''
    }
    const updateStore = (type, params) => {
        switch (type) {
            case 'updateName':
                dispatch(
                    updatePchainAddress({
                        address: getPchainAddress(),
                        walletName: getNameOfWallet(),
                    }),
                )
        }
    }

    async function getUpgradePhases(): Promise<any> {
        return await caminoClient.PChain().getUpgradePhases()
    }

    return { updateStore, getRegisteredNode, getAddress , getUpgradePhases}
}

export default useWallet
