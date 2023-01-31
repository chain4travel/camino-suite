import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadValidatorsInfo } from '../../api/index';

export const loadValidators = createAsyncThunk("validators", async () => {
  let validators = await loadValidatorsInfo();
  return validators;
});
