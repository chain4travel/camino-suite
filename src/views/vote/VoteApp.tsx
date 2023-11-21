import React from 'react'
import store from 'wallet/store'
import useNetwork from '../../hooks/useNetwork'
const Vote = React.lazy(() => import('DAC/dac'))

const VoteApp = () => {
    const { activeNetwork } = useNetwork()
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Vote network={activeNetwork} wallet={store.state.activeWallet} />
        </React.Suspense>
    )
}

export default VoteApp
