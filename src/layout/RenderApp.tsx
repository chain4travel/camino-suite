import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { RootState } from '../redux/store'
import ExplorerApp from './ExplorerApp'
import Wallet from './WalletApp'

const RenderApp = () => {
    const activeApp = useAppSelector((state: RootState) => state.appConfig.activeApp)
    if (activeApp === 'Explorer') return <ExplorerApp />
    else if (activeApp === 'Wallet') return <Wallet />
    return <div>Not Yet Implemented</div>
}

export default RenderApp
