import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
const Explorer = React.lazy(() => import("Explorer/Explorer"));
const Wallet = React.lazy(() => import("./WalletApp"));
import { useSelector } from "react-redux";

import { useStore } from "Explorer/useStore";

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
  if (activeApp === "blockexplorer")
    return (
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Explorer />
        </React.Suspense>
      </div>
    );
  else if (activeApp === "wallet")
    return (
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Wallet />
        </React.Suspense>
      </div>
    );
  return <div>Not Yet Implemented</div>;
};

export default function Layout() {
  const { state } = useStore();
  useEffect(() => {
    console.log(state);
  }, []);
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
