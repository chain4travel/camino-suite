import React, { useEffect, useRef } from "react";
import { mountLegal } from "wallet/mountLegal";

const LoadLegal = () => {
  const ref = useRef(null);
  useEffect(() => {
    mountLegal(ref.current);
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default function Legal() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadLegal />
    </React.Suspense>
  );
}
