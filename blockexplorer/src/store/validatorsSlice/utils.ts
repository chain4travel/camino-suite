import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../../App.tsx";

export const loadValidators = createAsyncThunk("validators", async () => {
  let networks = store.getState().appConfig;
  let activeNetwork = networks.networks.find(
    (element) => element.id === networks.activeNetwork
  );
  const response = await axios.post(
    `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}/ext/bc/P`,
    {
      jsonrpc: "2.0",
      method: "platform.getCurrentValidators",
      params: {
        subnetID: null,
        nodeIDs: [],
      },
      id: 1,
    }
  );
  return response.data.result.validators;
});
