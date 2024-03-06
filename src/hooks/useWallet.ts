import { getNameOfWallet, getPchainAddress } from '../helpers/walletStore'
import { updatePchainAddress } from '../redux/slices/app-config'
import { useAppDispatch } from './reduxHooks'

const useWallet = () => {
    const dispatch = useAppDispatch()

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
    return { updateStore }
}

export default useWallet
