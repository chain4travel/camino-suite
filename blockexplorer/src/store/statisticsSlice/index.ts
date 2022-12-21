import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";
import { Status } from "types";
import { initialCO2Statistics } from "types/store";
import {
  loadCarbonIntensityFactorNetwork,
  loadHolding,
  loadHybrid,
  loadNetwork,
  loadTransaction
} from "./utils";

let initialState: initialCO2Statistics = {
  intensityFactor: [],
  holding: [],
  hybrid: [],
  network: [],
  transaction: [],
  intensityFactorStatus: Status.IDLE,
  holdingStatus: Status.IDLE,
  hybridStatus: Status.IDLE,
  networkStatus: Status.IDLE,
  transactionStatus: Status.IDLE
};

const locationsNodeSlice = createSlice({
  name: "co2statistics",
  initialState,
  reducers: {
    co2StadisticsReducer: () => initialState,
  },
  extraReducers(builder) {
    //Intensity Factor
    builder.addCase(loadCarbonIntensityFactorNetwork.pending, (state) => {
      state.intensityFactorStatus = Status.LOADING;
    });
    builder.addCase(loadCarbonIntensityFactorNetwork.fulfilled, (state, { payload }) => {
      state.intensityFactor = payload;
      state.intensityFactorStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadCarbonIntensityFactorNetwork.rejected, (state) => {
      state.intensityFactorStatus = Status.FAILED;
    });

    //Holding
    builder.addCase(loadHolding.pending, (state) => {
      state.holdingStatus = Status.LOADING;
    });
    builder.addCase(loadHolding.fulfilled, (state, { payload }) => {
      state.holding = payload;
      state.holdingStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadHolding.rejected, (state) => {
      state.holdingStatus = Status.FAILED;
    });

    //Hybrid
    builder.addCase(loadHybrid.pending, (state) => {
      state.hybridStatus = Status.LOADING;
    });
    builder.addCase(loadHybrid.fulfilled, (state, { payload }) => {
      state.hybrid = payload;
      state.hybridStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadHybrid.rejected, (state) => {
      state.hybridStatus = Status.FAILED;
    });

    //Network
    builder.addCase(loadNetwork.pending, (state) => {
      state.networkStatus = Status.LOADING;
    });
    builder.addCase(loadNetwork.fulfilled, (state, { payload }) => {
      state.network = payload;
      state.networkStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadNetwork.rejected, (state) => {
      state.networkStatus = Status.FAILED;
    });

    //Transactions
    builder.addCase(loadTransaction.pending, (state) => {
      state.transactionStatus = Status.LOADING;
    });
    builder.addCase(loadTransaction.fulfilled, (state, { payload }) => {
      state.transaction = payload;
      state.transactionStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadTransaction.rejected, (state) => {
      state.transactionStatus = Status.FAILED;
    });
  },
});

export const getCarbonIntensityFactor = (state: RootState) => state.co2statistics.intensityFactor;

export const getCarbonHolding = (state: RootState) => state.co2statistics.holding;

export const getCarbonHybrid = (state: RootState) => state.co2statistics.hybrid;

export const getCarbonNetwork = (state: RootState) => state.co2statistics.network;

export const getCarbonTransaction = (state: RootState) => state.co2statistics.transaction;

export const {
  co2StadisticsReducer
} = locationsNodeSlice.actions;

export default locationsNodeSlice.reducer;
