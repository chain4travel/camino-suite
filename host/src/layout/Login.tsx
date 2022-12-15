import React, { useEffect, useRef } from "react";
import { mountHome } from "wallet/moutHomePage";

const LoadLogin = () => {
  const ref = useRef(null);
  useEffect(() => {
    mountHome(ref.current);
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default function Login() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadLogin />
    </React.Suspense>
  );
}
