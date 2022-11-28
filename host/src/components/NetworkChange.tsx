import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  changeNetwork,
  getActiveNetwork,
  getNetworks,
} from "../redux/slices/app-config";
import { Network } from "../@types/store";

const nameOfActiveNetwork = (networks: Network[], id: string | undefined) => {
  let active = networks.find((item) => item.id === id);
  return active?.displayName;
};

export function ChangeNetwork() {
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const [network, setNetwork] = useState(
    nameOfActiveNetwork(networks, activeNetwork)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNetwork(nameOfActiveNetwork(networks, activeNetwork));
  }, [activeNetwork]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        <select
          aria-label="Select network"
          value={network}
          onChange={(e) => dispatch(changeNetwork(e.target.value))}
        >
          {networks?.map((network) => (
            <option key={network.id} value={network.displayName}>
              {network.displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
