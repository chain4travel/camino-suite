import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ExplorerApp from '../views/explorer/ExplorerApp'
import Wallet from '../views/wallet/WalletApp'
import LoginPage from '../views/login/LoginPage'
import Create from '../views/create/Create'
import Legal from '../views/legal/Legal'
import AccessLayout from '../views/access'
import MountAccessComponent from '../views/access/MountAccessComponent'
import LandingPage from '../views/landing/LandingPage'
import { getActiveNetwork } from '../redux/slices/network'
import { useAppSelector } from '../hooks/reduxHooks'

export default function RoutesSuite() {
    const navigate = useNavigate()
    const location = useLocation()
    const activeNetwork = useAppSelector(getActiveNetwork)

    const [lastUrlWithNewNetwork, setLastUrlWithNewNetwork] = useState('')
    const [networkAliasToUrl, setNetworkAliasToUrl] = useState<string>('')

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
    }, [activeNetwork])

    //Temporally Solution when the network is changed
    useEffect(() => {
        let isExplorer = lastUrlWithNewNetwork.split('/')[1] === 'explorer' ? true : false
        if (isExplorer && networkAliasToUrl !== '') {
            navigate('/changing-network')
        }
    }, [networkAliasToUrl])

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/wallet/*" element={<Wallet />} />
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
            </Routes>
        </>
    )
}
