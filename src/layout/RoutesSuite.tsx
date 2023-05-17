import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
    const activeNetwork = useAppSelector(getActiveNetwork)

    const [networkAliasToUrl, setNetworkAliasToUrl] = useState<string>('')

    useEffect(() => {
        if (activeNetwork) {
            setNetworkAliasToUrl(activeNetwork.name.toLowerCase())
        }
    }, [activeNetwork])

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
                        <Route
                            path={`/explorer/${networkAliasToUrl}/*`}
                            element={<ExplorerApp />}
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
