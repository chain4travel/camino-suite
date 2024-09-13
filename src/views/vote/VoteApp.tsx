import { useTheme } from '@mui/system'
import React from 'react'
import useNetwork from '../../hooks/useNetwork'
const Vote = React.lazy(() => import('DAC/dac'))

const VoteApp = () => {
    const { activeNetwork } = useNetwork()
    const theme = useTheme()
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vote network={activeNetwork} theme={theme} />
        </React.Suspense>
    )
}

export default VoteApp
