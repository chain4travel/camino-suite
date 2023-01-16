import { mountAccessComponents } from "wallet/mountAccessComponents";
import React, { useRef, useEffect } from "react";

const LoadComponent = ({ type, props }) => {
  const ref = useRef(null);
  useEffect(() => {
    mountAccessComponents(ref.current, type, props);
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

export default LoadComponent;
