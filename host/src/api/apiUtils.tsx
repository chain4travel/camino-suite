import { store } from "../App";

export const getBaseUrl = (): string | undefined => {
  let networks = store.getState().appConfig;
  let activeNetwork = networks.networks.find(
    (element) => element.id === networks.activeNetwork
  );
  return activeNetwork?.magellanAddress;
};
