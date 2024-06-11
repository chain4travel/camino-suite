import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { RootState } from '../redux/store'
import VoteApp from '../views/vote/VoteApp'
import ExplorerApp from './ExplorerApp'
import Wallet from './WalletApp'

const RenderApp = () => {
    const activeApp = useAppSelector((state: RootState) => state.appConfig.activeApp)
    if (activeApp === 'Explorer') return <ExplorerApp />
    else if (activeApp === 'Wallet') return <Wallet />
    else if (activeApp === 'DAC') return <VoteApp />
    return <div>Not Yet Implemented</div>
}

export default RenderApp
