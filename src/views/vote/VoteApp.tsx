import { useTheme } from '@mui/system'
import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import useNetwork from '../../hooks/useNetwork'
import { getPChainAddress } from '../../redux/slices/app-config'
const Vote = React.lazy(() => import('DAC/dac'))

const VoteApp = () => {
    const { activeNetwork } = useNetwork()
    const pChainAddress = useAppSelector(getPChainAddress)
    const theme = useTheme()

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vote
                key={activeNetwork?.id}
                network={activeNetwork}
                pChainAddress={pChainAddress}
                theme={theme}
            />
        </React.Suspense>
    )
}

export default VoteApp
