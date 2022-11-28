import { Network } from "../@types/store";

export const nameOfActiveNetwork = (
  networks: Network[],
  id: string | undefined
) => {
  let active = networks.find((item) => item.id === id);
  return active?.displayName;
};
