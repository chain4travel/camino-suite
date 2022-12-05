import React, { Children } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";

const RenderApp = () => {
  const activeApp = useSelector(
    (state: RootState) => state.appConfig.activeApp
  );
  if (activeApp === "explorer") return <ExplorerApp />;
  else if (activeApp === "wallet") return <Wallet />;
  return <div>Not Yet Implemented</div>;
};

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      {/* <Toolbar /> */}
      <Box sx={{ flex: 1 }}>
        {/* <RenderApp /> */}
        {children}
      </Box>
    </Box>
  );
};

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
