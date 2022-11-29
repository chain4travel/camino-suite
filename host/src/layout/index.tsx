import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";

const MainLayout = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

const RenderApp = () => {
  const activeApp = useSelector((state) => state.appConfig.activeApp);
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
