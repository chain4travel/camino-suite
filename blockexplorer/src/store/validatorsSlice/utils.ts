import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../../App.tsx';

export const loadValidators = createAsyncThunk('validators', async () => {
  let activeNetwork = store.getState().appConfig.activeNetwork;
  const response = await axios.post(
    `${activeNetwork?.protocol}://${activeNetwork?.ip}:${activeNetwork?.port}/ext/bc/P`,
    {
      jsonrpc: '2.0',
      method: 'platform.getCurrentValidators',
      params: {
        subnetID: null,
        nodeIDs: [],
      },
      id: 1,
    },
  );
  return response.data.result.validators;
});
