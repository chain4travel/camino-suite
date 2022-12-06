import React from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import ExplorerApp from "./ExplorerApp";
import Wallet from "./WalletApp";

const RenderApp = () => {
  const activeApp = useAppSelector(
    (state: RootState) => state.appConfig.activeApp
  );
  if (activeApp === "blockexplorer") return <ExplorerApp />;
  else if (activeApp === "wallet") return <Wallet />;
  return <div>Not Yet Implemented</div>;
};

export default RenderApp;
