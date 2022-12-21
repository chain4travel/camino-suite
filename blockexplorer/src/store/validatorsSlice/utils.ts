import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadValidatorsInMagelland } from '../../api/index';

export const loadValidators = createAsyncThunk("validators", async () => {
  let validators = await loadValidatorsInMagelland();
  return validators;
});