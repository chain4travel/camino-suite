import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";
import MainLayout from "./MainLayout";
import { RootState } from "../redux/store";

const RenderApp = () => {
  const activeApp = useSelector(
    (state: RootState) => state.appConfig.activeApp
  );
  if (activeApp === "blockexplorer") return <ExplorerApp />;
  else if (activeApp === "wallet") return <Wallet />;
  return <div>Not Yet Implemented</div>;
};

export default function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<RenderApp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
