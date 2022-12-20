import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mountCreateWallet } from "wallet/mountCreate";
import { useAppSelector } from "../hooks/reduxHooks";
import { getActiveApp } from "../redux/slices/app-config";

const CreateWallet = ({ props }) => {
  const ref = useRef(null);
  useEffect(() => {
    mountCreateWallet(ref.current, props);
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default function Create() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(null);
  const app = useAppSelector(getActiveApp);
  useEffect(() => {
    if (logged) {
      if (app === "wallet") navigate("/wallet");
      else navigate("/explorer");
    }
  }, [logged]);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CreateWallet
        props={{
          navigate: (location) => navigate(location),
          setLogged: setLogged,
        }}
      />
    </React.Suspense>
  );
}
