import ExplorerApp from './ExplorerApp'
import React from 'react'
import { RootState } from '../redux/store'
import Wallet from './WalletApp'
import { useAppSelector } from '../hooks/reduxHooks'

const RenderApp = () => {
    const activeApp = useAppSelector((state: RootState) => state.appConfig.activeApp)
    if (activeApp === 'Explorer') return <ExplorerApp />
    else if (activeApp === 'Wallet') return <Wallet />
    return <div>Not Yet Implemented</div>
}

export default RenderApp
