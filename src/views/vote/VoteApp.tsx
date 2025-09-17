import { useTheme } from '@mui/system'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useNetwork from '../../hooks/useNetwork'
import { getPChainAddress, updateNotificationStatus } from '../../redux/slices/app-config'
const Vote = React.lazy(() => import('DAC/dac'))

const VoteApp = () => {
    const { activeNetwork } = useNetwork()
    const dispatch = useAppDispatch()
    const pChainAddress = useAppSelector(getPChainAddress)
    const dispatchNotification = ({ message, type }) => {
        dispatch(updateNotificationStatus({ message, severity: type }))
    }
    const theme = useTheme()

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vote
                key={activeNetwork?.id}
                network={activeNetwork}
                pChainAddress={pChainAddress}
                theme={theme}
                dispatchNotification={dispatchNotification}
            />
        </React.Suspense>
    )
}

export default VoteApp
