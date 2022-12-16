import { mountAccessComponents } from "wallet/mountAccessComponents";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadMenu = ({ type, props }) => {
  const ref = useRef(null);
  useEffect(() => {
    mountAccessComponents(ref.current, type, props);
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

const Menu = () => {
  const navigate = useNavigate();
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoadMenu
        type="Menu"
        props={{ navigate: (location) => navigate(location) }}
      />
    </React.Suspense>
  );
};

export default Menu;
