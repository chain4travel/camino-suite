import React from 'react'
import useNetwork from '../../hooks/useNetwork'
const Vote = React.lazy(() => import('DAC/dac'))

const VoteApp = () => {
    const { activeNetwork } = useNetwork()
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vote network={activeNetwork} />
        </React.Suspense>
    )
}

export default VoteApp
