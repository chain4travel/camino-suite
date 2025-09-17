import { useTheme } from '@mui/system'
import React from 'react'
<<<<<<< HEAD
import { useAppSelector } from '../../hooks/reduxHooks'
import useNetwork from '../../hooks/useNetwork'
import { getPChainAddress } from '../../redux/slices/app-config'
=======
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useNetwork from '../../hooks/useNetwork'
import { getPChainAddress, updateNotificationStatus } from '../../redux/slices/app-config'
>>>>>>> suite
const Vote = React.lazy(() => import('DAC/dac'))

const VoteApp = () => {
    const { activeNetwork } = useNetwork()
<<<<<<< HEAD
    const pChainAddress = useAppSelector(getPChainAddress)
=======
    const dispatch = useAppDispatch()
    const pChainAddress = useAppSelector(getPChainAddress)
    const dispatchNotification = ({ message, type }) => {
        dispatch(updateNotificationStatus({ message, severity: type }))
    }
>>>>>>> suite
    const theme = useTheme()

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vote
                key={activeNetwork?.id}
                network={activeNetwork}
                pChainAddress={pChainAddress}
                theme={theme}
<<<<<<< HEAD
=======
                dispatchNotification={dispatchNotification}
>>>>>>> suite
            />
        </React.Suspense>
    )
}

export default VoteApp
