import ExplorerApp from './ExplorerApp'
import React from 'react'
import { RootState } from '../redux/store'
import Wallet from './WalletApp'
import { useAppSelector } from '../hooks/reduxHooks'
import VoteApp from '../views/vote/VoteApp'

const RenderApp = () => {
    const activeApp = useAppSelector((state: RootState) => state.appConfig.activeApp)
    if (activeApp === 'Explorer') return <ExplorerApp />
    else if (activeApp === 'Wallet') return <Wallet />
    else if (activeApp === 'DAC') return <VoteApp />
    return <div>Not Yet Implemented</div>
}

export default RenderApp
