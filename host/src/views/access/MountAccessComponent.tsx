import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getActiveApp,
  selectAuthStatus,
  updateValues,
} from "../../redux/slices/app-config";
import LoadComponent from "./LoadComponent";
const MountAccessComponent = ({ type }) => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(null);
  const app = useAppSelector(getActiveApp);
  const auth = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (auth) {
      if (app === "wallet") {
        navigate("/wallet");
      } else navigate("/explorer");
    }
  }, [auth]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadComponent
        type={type}
        props={{
          navigate: (location) => navigate(location),
          setLogged: setLogged,
          index: location.pathname.split("/")[3],
        }}
      />
    </React.Suspense>
  );
};

export default MountAccessComponent;
