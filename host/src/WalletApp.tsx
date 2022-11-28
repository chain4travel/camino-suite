import { mount } from "wallet/mountApp";
import React, { useRef, useEffect } from "react";

export default () => {
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
