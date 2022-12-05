import React from "react";
import { Navigate } from "react-router-dom";
import store from "wallet/store";
import { useAppDispatch } from "../hooks/reduxHooks";
import { changeActiveApp } from "../redux/slices/app-config";

function Protected({ children }) {
  const dispatch = useAppDispatch();

  if (!store.state.isAuth) {
    dispatch(changeActiveApp());
    // return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
