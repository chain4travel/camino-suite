import { useStore } from "Explorer/useStore";
import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { getTheme } from "../redux/slices/theme";
const Explorer = React.lazy(() => import("Explorer/Explorer"));

const ExplorerApp = () => {
  const { changeTheme } = useStore();
  const currentTheme = useAppSelector(getTheme);
  useEffect(() => {
    changeTheme(currentTheme);
  }, []);
  return (
    <div style={{ marginTop: "50px" }}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Explorer />
      </React.Suspense>
    </div>
  );
};

export default ExplorerApp;
