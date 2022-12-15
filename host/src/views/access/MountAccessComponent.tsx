import React from "react";
import { useNavigate } from "react-router-dom";
import LoadComponent from "./LoadComponent";

const MountAccessComponent = ({ type }) => {
  const navigate = useNavigate();
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadComponent
        type={type}
        props={{ cancel: () => navigate("/access/menu") }}
      />
    </React.Suspense>
  );
};

export default MountAccessComponent;
