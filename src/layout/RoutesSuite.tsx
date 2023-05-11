import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useHistory } from 'react-router-dom'
import MainLayout from './MainLayout'
import ExplorerApp from '../views/explorer/ExplorerApp'
import Wallet from '../views/wallet/WalletApp'
import LoginPage from '../views/login/LoginPage'
import Create from '../views/create/Create'
import Legal from '../views/legal/Legal'
import AccessLayout from '../views/access'
import MountAccessComponent from '../views/access/MountAccessComponent'
import ScrollToTop from '../components/ScrollToTop'
import LandingPage from '../views/landing/LandingPage'
import { getActiveNetwork } from '../redux/slices/network'
import { useAppSelector } from '../hooks/reduxHooks'

export default function RoutesSuite() {
    const location = useLocation()
    const history = useHistory()
    const activeNetwork = useAppSelector(getActiveNetwork)

    const [networkAliasToUrl, setNetworkAliasToUrl] = useState<string>("''")

    useEffect(() => {
        if (activeNetwork) {
            //setNetworkAliasToUrl(activeNetwork.name.toLowerCase())
        }
    }, [activeNetwork])

    console.log('location', location.pathname)

    return (
        <>
            {activeNetwork ? (
                <Routes>
                    <Route path={`${networkAliasToUrl}`} element={<LandingPage />} />
                    <Route path={`${networkAliasToUrl}/explorer/*`} element={<ExplorerApp />} />
                    <Route path={`${networkAliasToUrl}/wallet/*`} element={<Wallet />} />
                    <Route path={`${networkAliasToUrl}/login`} element={<LoginPage />} />
                    <Route path={`${networkAliasToUrl}/create`} element={<Create />} />
                    <Route path={`${networkAliasToUrl}/legal`} element={<Legal />} />
                    <Route path={`${networkAliasToUrl}/access`} element={<AccessLayout />}>
                        <Route
                            path={`${networkAliasToUrl}/keystore`}
                            element={<MountAccessComponent type="Keystore" />}
                        />
                        <Route
                            path={`${networkAliasToUrl}/mnemonic`}
                            element={<MountAccessComponent type="Mnemonic" />}
                        />
                        <Route
                            path={`${networkAliasToUrl}/privateKey`}
                            element={<MountAccessComponent type="PrivateKey" />}
                        />
                        <Route
                            path={`${networkAliasToUrl}/account/*`}
                            element={<MountAccessComponent type="Account" />}
                        />
                    </Route>
                    <Route
                        path={`${networkAliasToUrl}/*`}
                        element={<Navigate to={`${networkAliasToUrl}`} />}
                    />
                </Routes>
            ) : null}
        </>
    )
}
