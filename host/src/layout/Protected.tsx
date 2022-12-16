import React from "react";
import { Navigate } from "react-router-dom";
import store from "wallet/store";

function Protected({ children }) {
  if (!store.state.isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Protected;
