import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";
import { getActiveApp } from "../redux/slices/app-config";
import Login from "./Login";
import Menu from "./Menu";
import AccessLayout from "../views/access";
import MountAccessComponent from "../views/access/MountAccessComponent";

export default function Layout() {
  const activeApp = useSelector(getActiveApp);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to={`/${activeApp}`} />} />
          <Route path="/explorer/*" element={<ExplorerApp />} />
          <Route path="/wallet/*" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
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
