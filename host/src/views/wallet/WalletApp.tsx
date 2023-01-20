import { mount } from "wallet/mountApp";
import React, { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateAuthStatus, updateValues } from "../../redux/slices/app-config";
import { Navigate } from "react-router-dom";

const LoadWallet = () => {
  const [updateStore, setUpdateStore] = useState(null);
  const [logOut, setLogOut] = useState(false);
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  useEffect(() => {
    dispatch(updateValues(updateStore));
    if (updateStore) dispatch(updateAuthStatus(true));
  }, [updateStore]);
  useEffect(() => {
    dispatch(updateValues(updateStore));
  }, [logOut]);
  useEffect(() => {
    mount(ref.current, { setUpdateStore, setLogOut });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={ref} />
    </div>
  );
};

const Wallet = () => {
  const auth = useAppSelector((state) => state.appConfig.isAuth);
  if (!auth) return <Navigate to="/login"></Navigate>;
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadWallet />
    </React.Suspense>
  );
};

export default Wallet;
