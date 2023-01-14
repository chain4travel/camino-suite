import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";
import { getActiveApp } from "../redux/slices/app-config";
import ExplorerApp from "../views/explorer/ExplorerApp";
import Wallet from "../views/wallet/WalletApp";
import LoginPage from "../views/login/LoginPage";
import Create from "../views/create/Create";
import Legal from "../views/legal/Legal";
import Menu from "../views/menu/Menu";
import AccessLayout from "../views/access";
import MountAccessComponent from "../views/access/MountAccessComponent";
import Protected from "./Protected";

export default function Layout() {
  const activeApp = useSelector(getActiveApp);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to={`/${activeApp}`} />} />
          <Route path="/explorer/*" element={<ExplorerApp />} />
          <Route
            path="/wallet/*"
            element={
              <Protected>
                <Wallet />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/access" element={<AccessLayout />}>
            <Route index element={<Menu />} />
            <Route
              path="keystore"
              element={<MountAccessComponent type="Keystore" />}
            />
            <Route
              path="mnemonic"
              element={<MountAccessComponent type="Mnemonic" />}
            />
            <Route
              path="privateKey"
              element={<MountAccessComponent type="PrivateKey" />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
