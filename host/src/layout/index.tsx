import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";

export default function Layout() {
  const activeApp = useSelector(
    (state: RootState) => state.appConfig.activeApp
  );

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to={`/${activeApp}`} />} />
          <Route path="/explorer/*" element={<ExplorerApp />} />
          <Route path="/wallet/*" element={<Wallet />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
          {/* <Route path="*" element={<RenderApp />}></Route> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
