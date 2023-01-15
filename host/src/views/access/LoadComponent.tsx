import { mountAccessComponents } from "wallet/mountAccessComponents";
import React, { useRef, useEffect, useState } from "react";
import { updateValues } from "../../redux/slices/app-config";
import { useAppDispatch } from "../../hooks/reduxHooks";

const LoadComponent = ({ type, props }) => {
  const ref = useRef(null);
  const [updateStore, setUpdateStore] = useState(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("updateStore", updateStore);
    dispatch(updateValues(updateStore));
  }, [updateStore]);
  useEffect(() => {
    mountAccessComponents(ref.current, type, {
      ...props,
      setUpdateStore,
    });
  }, []);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default LoadComponent;
