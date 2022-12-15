import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { mountHome } from "wallet/moutHomePage";

const LoadLogin = ({ props }) => {
  const ref = useRef(null);
  useEffect(() => {
    mountHome(ref.current, props);
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadLogin props={{ navigate: () => navigate("/access") }} />
    </React.Suspense>
  );
}
