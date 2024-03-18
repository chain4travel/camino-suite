import { ava as caminoClient } from 'wallet/caminoClient'
import { getNameOfWallet, getPchainAddress } from '../helpers/walletStore'
import { updatePchainAddress } from '../redux/slices/app-config'
import { useAppDispatch } from './reduxHooks'

const useWallet = () => {
    const dispatch = useAppDispatch()

    async function getCurrentValidators() {
        return caminoClient.PChain().getCurrentValidators()
    }
    async function getRegisteredNode(address: string): Promise<string> {
        return await caminoClient.PChain().getRegisteredShortIDLink(address)
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
    return { updateStore, getRegisteredNode, getCurrentValidators }
}

export default useWallet
