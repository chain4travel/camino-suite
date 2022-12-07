import { Status } from "../@types";
import { Network } from "../@types/store";

export const nameOfActiveNetwork = (
  networks: Network[],
  id: string | undefined
) => {
  let active = networks.find((item) => item.id === id);
  return active?.displayName;
};

export function matchNetworkStatus(status: string) {
  switch (status) {
    case "disconnected":
      return Status.FAILED;
    case "connecting":
      return Status.LOADING;
    case "connected":
      return Status.SUCCEEDED;
  }
}
