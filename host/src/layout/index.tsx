import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";
// import MainLayout from "./MainLayout";
import { RootState } from "../redux/store";
import Navbar from "../components/Navbar";
// import Protected from "./Protected";

// const RenderApp = () => {
//   const activeApp = useSelector(
//     (state: RootState) => state.appConfig.activeApp
//   );
//   if (activeApp === "blockexplorer")
//     return (
//       <Protected>
//         <ExplorerApp />
//       </Protected>
//     );
//   else if (activeApp === "wallet") return <Wallet />;
//   return <div>Not Yet Implemented</div>;
// };
const RenderApp = () => {
  const activeApp = useSelector(
    (state: RootState) => state.appConfig.activeApp
  );
  if (activeApp === "blockexplorer") return <ExplorerApp />;
  else if (activeApp === "wallet") return <Wallet />;
  return <div>Not Yet Implemented</div>;
};

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <RenderApp />
    </div>
  );
};

export default function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MainLayout />}>
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            {/* <Route path="*" element={<RenderApp />}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
