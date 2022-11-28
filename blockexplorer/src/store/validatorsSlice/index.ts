import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";
import { Status } from "types";
import { NodeValidator } from "types/node-types";
import { initialValidatorsStateType, ValidatorType } from "types/store";
import { loadValidators } from "./utils";

let initialState: initialValidatorsStateType = {
  percentageOfActiveValidators: 0,
  numberOfActiveValidators: 0,
  numberOfValidators: 0,
  validatorsLoading: Status.IDLE,
  validators: [],
};

function mapToTableData(item): ValidatorType {
  let uptime = Math.round(item.uptime * 100) + "%";
  return {
    status: item.connected ? "Connected" : "Disconnected",
    nodeID: item.nodeID,
    startTime: new Date(item.startTime * 1000),
    endTime: new Date(item.endTime * 1000),
    txID: item.txID,
    uptime: uptime,
  };
}

const validatorsSlice = createSlice({
  name: "validators",
  initialState,
  reducers: {
    resetValidatorsReducer: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(loadValidators.pending, (state) => {
      state.validatorsLoading = Status.LOADING;
    });
    builder.addCase(loadValidators.fulfilled, (state, { payload }) => {
      state.numberOfValidators = payload.length;
      state.numberOfActiveValidators = payload.filter(
        (v: NodeValidator) => v.connected
      ).length;
      state.percentageOfActiveValidators = parseInt(
        (
          (state.numberOfActiveValidators / state.numberOfValidators) *
          100
        ).toFixed(0)
      );
      state.validators = payload.map(mapToTableData);
      state.validatorsLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadValidators.rejected, (state) => {
      state.validatorsLoading = Status.FAILED;
    });
  },
});

// Select all Validators
export const selectAllValidators = (state: RootState) =>
  state.validators.validators;

// Select all Validators
export const getValidatorsStatus = (state: RootState) =>
  state.validators.validatorsLoading;

// Select Validators Chainoverreview
export const getValidatorsOverreview = (state: RootState) => {
  return {
    percentageOfActiveValidators: state.validators.percentageOfActiveValidators,
    numberOfActiveValidators: state.validators.numberOfActiveValidators,
    numberOfValidators: state.validators.numberOfValidators,
  };
};

export const { resetValidatorsReducer } = validatorsSlice.actions;

export default validatorsSlice.reducer;
