import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import AccessLayout from '../views/access'
import Create from '../views/create/Create'
import CreateDepositsLayout from './CreateDepositLayout'
import ExplorerApp from '../views/explorer/ExplorerApp'
import LandingPage from '../views/landing/LandingPage'
import Legal from '../views/legal/Legal'
import LoginPage from '../views/login/LoginPage'
import MountAccessComponent from '../views/access/MountAccessComponent'
import MultisigWallet from '../views/settings/MultisigWallet'
import Partners from '../views/partners'
import Protected from './Protected'
import Settings from '../views/settings/index'
import SettingsLayout from './SettingsLayout'
import Wallet from '../views/wallet/WalletApp'
import { changeActiveApp } from '../redux/slices/app-config'
import { getActiveNetwork } from '../redux/slices/network'
import { useAppSelector } from '../hooks/reduxHooks'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function RoutesSuite() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeNetwork = useAppSelector(getActiveNetwork)
    const location = useLocation()

    const [lastUrlWithNewNetwork, setLastUrlWithNewNetwork] = useState('')
    const [networkAliasToUrl, setNetworkAliasToUrl] = useState<string>('camino')

    useEffect(() => {
        if (activeNetwork) {
            if (activeNetwork.name !== networkAliasToUrl) {
                let lastNetwork = window.location.pathname.split('/')[2]

                let newUrl = window.location.pathname
                    .toString()
                    .replace(lastNetwork, activeNetwork.name.toLowerCase())

                setLastUrlWithNewNetwork(newUrl)
                setNetworkAliasToUrl(activeNetwork.name.toLowerCase())
            }
        }
    }, [activeNetwork]) // eslint-disable-line react-hooks/exhaustive-deps

    //Temporally Solution when the network is changed
    useEffect(() => {
        let isExplorer = lastUrlWithNewNetwork.split('/')[1] === 'explorer' ? true : false
        if (isExplorer && networkAliasToUrl !== '') {
            navigate('/changing-network')
        }
    }, [networkAliasToUrl]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (location.pathname.split('/')[1] === 'explorer') dispatch(changeActiveApp('Explorer'))
        else if (
            location.pathname.split('/')[1] === 'wallet' ||
            location.pathname.split('/')[1] === 'login'
        )
            dispatch(changeActiveApp('Wallet'))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {activeNetwork ? (
                    <>
                        <Route path={`/explorer/*`} element={<ExplorerApp />} />

                        <Route
                            path={`/explorer/${networkAliasToUrl}/*`}
                            element={<ExplorerApp />}
                        />

                        <Route
                            path={`/changing-network`}
                            element={<Navigate to={`${lastUrlWithNewNetwork}`} />}
                        />

                        <Route
                            path="/explorer"
                            element={<Navigate to={`/explorer/${networkAliasToUrl}`} />}
                        />
                    </>
                ) : null}
                <Route element={<Protected />}>
                    <Route path="/wallet/*" element={<Wallet />} />
                    <Route path="/settings" element={<SettingsLayout />}>
                        <Route index element={<Settings />} />
                        <Route path="save-account" element={<Settings />} />
                        <Route path="manage-multisig" element={<MultisigWallet />} />
                    </Route>
                    <Route path="/foundation" element={<CreateDepositsLayout />}>
                        <Route index element={<Partners />} />
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create" element={<Create />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/access" element={<AccessLayout />}>
                    <Route path="keystore" element={<MountAccessComponent type="Keystore" />} />
                    <Route path="mnemonic" element={<MountAccessComponent type="Mnemonic" />} />
                    <Route path="privateKey" element={<MountAccessComponent type="PrivateKey" />} />
                    <Route path="account/*" element={<MountAccessComponent type="Account" />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}
