import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import Protected from './Protected'
import Settings from '../views/settings/index'

export default function Layout() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <MainLayout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/explorer/*" element={<ExplorerApp />} />
                    <Route element={<Protected />}>
                        <Route path="/wallet/*" element={<Wallet />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/access" element={<AccessLayout />}>
                        <Route path="keystore" element={<MountAccessComponent type="Keystore" />} />
                        <Route path="mnemonic" element={<MountAccessComponent type="Mnemonic" />} />
                        <Route
                            path="privateKey"
                            element={<MountAccessComponent type="PrivateKey" />}
                        />
                        <Route path="account/*" element={<MountAccessComponent type="Account" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}
