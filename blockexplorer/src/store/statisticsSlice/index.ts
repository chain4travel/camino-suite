import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";
import { Status } from "types";
import { initialCO2Statistics } from "../../types/store";
import {
  loadDailyEmissions,
  loadNetworkEmissions,
  loadTransactionsEmissions
} from "./utils";
import MeterCO2Data from '../../types/meterCO2data';

let initialStateData : MeterCO2Data = {
  Name: "",
  Value: []
};

let initialState: initialCO2Statistics = {
  dailyEmissions: initialStateData,
  dailyEmissionsStatus: Status.IDLE,
  networkEmissions: initialStateData,
  networkEmissionsStatus: Status.IDLE,
  transactionsEmissions: initialStateData,
  transactionsEmissionsStatus: Status.IDLE,
  carbonIntensityFactor: {},
  carbonIntensityFactorStatus: Status.IDLE
}; 

const locationsNodeSlice = createSlice({
  name: "co2statistics",
  initialState,
  reducers: {
    co2StadisticsReducer: () => initialState,
  },
  extraReducers(builder) {
    
    //Daily Emissions
    builder.addCase(loadDailyEmissions.pending, (state) => {
      state.dailyEmissionsStatus = Status.LOADING;
    });
    builder.addCase(loadDailyEmissions.fulfilled, (state, { payload }) => {
      let data : any = payload;
      state.dailyEmissions = data;
      state.dailyEmissionsStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadDailyEmissions.rejected, (state) => {
      state.dailyEmissionsStatus = Status.FAILED;
    });

    //Network Emissions
    builder.addCase(loadNetworkEmissions.pending, (state) => {
      state.networkEmissionsStatus = Status.LOADING;
    });
    builder.addCase(loadNetworkEmissions.fulfilled, (state, { payload }) => {
      let data : any = payload;
      state.networkEmissions = data;
      state.networkEmissionsStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadNetworkEmissions.rejected, (state) => {
      state.networkEmissionsStatus = Status.FAILED;
    });

    //Transactions Emissions
    builder.addCase(loadTransactionsEmissions.pending, (state) => {
      state.transactionsEmissionsStatus = Status.LOADING;
    });
    builder.addCase(loadTransactionsEmissions.fulfilled, (state, { payload }) => {
      let data : any = payload;
      state.transactionsEmissions = data;
      state.transactionsEmissionsStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadTransactionsEmissions.rejected, (state) => {
      state.transactionsEmissionsStatus = Status.FAILED;
    });

  },
});

export const getDailyEmissions = (state: RootState) => state.co2statistics.dailyEmissions;
export const getDailyEmissionsStatus = (state: RootState) => state.co2statistics.dailyEmissionsStatus;

export const getNetworkEmissions = (state: RootState) => state.co2statistics.networkEmissions;
export const getNetworkEmissionsStatus = (state: RootState) => state.co2statistics.networkEmissionsStatus;

export const getTransactionsEmissions = (state: RootState) => state.co2statistics.transactionsEmissions;
export const getTransactionsEmissionsStatus = (state: RootState) => state.co2statistics.transactionsEmissionsStatus;


export const {
  co2StadisticsReducer
} = locationsNodeSlice.actions;

export default locationsNodeSlice.reducer;
