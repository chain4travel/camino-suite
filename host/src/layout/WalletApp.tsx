import { mount } from "wallet/mountApp";
import React, { useRef, useEffect } from "react";

const LoadWallet = () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

const Wallet = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadWallet />
    </React.Suspense>
  );
};

export default Wallet;
