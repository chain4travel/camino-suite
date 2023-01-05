import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";
import { Status } from "types";
import { initialStatisticsType } from "../../types/store";
import {
  loadDailyEmissions,
  loadNetworkEmissions,
  loadTransactionsEmissions,
  loadDailyTransactionsStatistics,
  loadUniqueAddresses,
  loadDailyTokenTransfer,
  loadGasUsed,
  loadActiveAddresses,
  loadGasAveragePrice,
  loadGasAverageLimit
} from "./utils";
import MeterCO2Data from '../../types/meterCO2data';

let initialStateCO2Data: MeterCO2Data = {
  Name: "",
  Value: []
};

let initialState: initialStatisticsType = {
  dailyEmissions: initialStateCO2Data,
  dailyEmissionsStatus: Status.IDLE,
  networkEmissions: initialStateCO2Data,
  networkEmissionsStatus: Status.IDLE,
  transactionsEmissions: initialStateCO2Data,
  transactionsEmissionsStatus: Status.IDLE,
  carbonIntensityFactor: {},
  carbonIntensityFactorStatus: Status.IDLE,
  transactionsPerDay: null,
  transactionsPerDayLoading: Status.IDLE,
  uniqueAddressesInfo: null,
  uniqueAddressesInfoLoading: Status.IDLE,
  dailyTokenTransfers: null,
  dailyTokenTransfersLoading: Status.IDLE,
  gasUsed: null,
  gasUsedLoading: Status.IDLE,
  activeAdresses: null,
  activeAdressesLoading: Status.IDLE,
  gasAveragePrice: null,
  gasAveragePriceLoading: Status.IDLE,
  gasAverageLimit: null,
  gasAverageLimitLoading: Status.IDLE
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    statisticsReducer: () => initialState,
  },
  extraReducers(builder) {

    //(CO2) Daily Emissions
    builder.addCase(loadDailyEmissions.pending, (state) => {
      state.dailyEmissionsStatus = Status.LOADING;
    });
    builder.addCase(loadDailyEmissions.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.dailyEmissions = data;
      state.dailyEmissionsStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadDailyEmissions.rejected, (state) => {
      state.dailyEmissionsStatus = Status.FAILED;
    });

    //(CO2) Network Emissions
    builder.addCase(loadNetworkEmissions.pending, (state) => {
      state.networkEmissionsStatus = Status.LOADING;
    });
    builder.addCase(loadNetworkEmissions.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.networkEmissions = data;
      state.networkEmissionsStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadNetworkEmissions.rejected, (state) => {
      state.networkEmissionsStatus = Status.FAILED;
    });

    //(CO2) Transactions Emissions
    builder.addCase(loadTransactionsEmissions.pending, (state) => {
      state.transactionsEmissionsStatus = Status.LOADING;
    });
    builder.addCase(loadTransactionsEmissions.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.transactionsEmissions = data;
      state.transactionsEmissionsStatus = Status.SUCCEEDED;
    });
    builder.addCase(loadTransactionsEmissions.rejected, (state) => {
      state.transactionsEmissionsStatus = Status.FAILED;
    });

    //(Blockchain Data) Daily Transactions
    builder.addCase(loadDailyTransactionsStatistics.pending, (state) => {
      state.transactionsPerDayLoading = Status.LOADING;
    });
    builder.addCase(loadDailyTransactionsStatistics.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.transactionsPerDay = data;
      state.transactionsPerDayLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadDailyTransactionsStatistics.rejected, (state) => {
      state.transactionsPerDayLoading = Status.FAILED;
    });

    //(Blockchain Data) Unique Addreses Info
    builder.addCase(loadUniqueAddresses.pending, (state) => {
      state.uniqueAddressesInfoLoading = Status.LOADING;
    });
    builder.addCase(loadUniqueAddresses.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.uniqueAddressesInfo = data;
      state.uniqueAddressesInfoLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadUniqueAddresses.rejected, (state) => {
      state.uniqueAddressesInfoLoading = Status.FAILED;
    });

    //(Blockchain Data) Daily Token Transfer
    builder.addCase(loadDailyTokenTransfer.pending, (state) => {
      state.dailyTokenTransfersLoading = Status.LOADING;
    });
    builder.addCase(loadDailyTokenTransfer.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.dailyTokenTransfers = data;
      state.dailyTokenTransfersLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadDailyTokenTransfer.rejected, (state) => {
      state.dailyTokenTransfersLoading = Status.FAILED;
    });

    //(Blockchain Data) Gas Used
    builder.addCase(loadGasUsed.pending, (state) => {
      state.gasUsedLoading = Status.LOADING;
    });
    builder.addCase(loadGasUsed.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.gasUsed = data;
      state.gasUsedLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadGasUsed.rejected, (state) => {
      state.gasUsedLoading = Status.FAILED;
    });

    //(Blockchain Data) Active Addresses
    builder.addCase(loadActiveAddresses.pending, (state) => {
      state.activeAdressesLoading = Status.LOADING;
    });
    builder.addCase(loadActiveAddresses.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.activeAdresses = data;
      state.activeAdressesLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadActiveAddresses.rejected, (state) => {
      state.activeAdressesLoading = Status.FAILED;
    });
    //(Blockchain Data) gasAveragePrice
    builder.addCase(loadGasAveragePrice.pending, (state) => {
      state.gasAveragePriceLoading = Status.LOADING;
    });
    builder.addCase(loadGasAveragePrice.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.gasAveragePrice = data;
      state.gasAveragePriceLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadGasAveragePrice.rejected, (state) => {
      state.gasAveragePriceLoading = Status.FAILED;
    });
    //(Blockchain Data) gasAverageLimit
    builder.addCase(loadGasAverageLimit.pending, (state) => {
      state.gasAverageLimitLoading = Status.LOADING;
    });
    builder.addCase(loadGasAverageLimit.fulfilled, (state, { payload }) => {
      let data: any = payload;
      state.gasAverageLimit = data;
      state.gasAverageLimitLoading = Status.SUCCEEDED;
    });
    builder.addCase(loadGasAverageLimit.rejected, (state) => {
      state.gasAverageLimitLoading = Status.FAILED;
    });


  },
});

export const getDailyEmissions = (state: RootState) => state.statistics.dailyEmissions;
export const getDailyEmissionsStatus = (state: RootState) => state.statistics.dailyEmissionsStatus;

export const getNetworkEmissions = (state: RootState) => state.statistics.networkEmissions;
export const getNetworkEmissionsStatus = (state: RootState) => state.statistics.networkEmissionsStatus;

export const getTransactionsEmissions = (state: RootState) => state.statistics.transactionsEmissions;
export const getTransactionsEmissionsStatus = (state: RootState) => state.statistics.transactionsEmissionsStatus;

export const getTransactionsPerDay = (state: RootState) => state.statistics.transactionsPerDay;
export const getTransactionsPerDayStatus = (state: RootState) => state.statistics.transactionsPerDayLoading;

export const getUniqueAddresses = (state: RootState) => state.statistics.uniqueAddressesInfo;
export const getUniqueAddressesLoading = (state: RootState) => state.statistics.uniqueAddressesInfoLoading;

export const getDailyTokenTransfers = (state: RootState) => state.statistics.dailyTokenTransfers;
export const getDailyTokenTransfersLoading = (state: RootState) => state.statistics.dailyTokenTransfersLoading;

export const getGasUsed = (state: RootState) => state.statistics.gasUsed;
export const getGasUsedLoading = (state: RootState) => state.statistics.gasUsedLoading;

export const getActiveAddresses = (state: RootState) => state.statistics.activeAdresses;
export const getActiveAddressesInfo = (state: RootState) => state.statistics.activeAdressesLoading;

export const getGasAveragePrice = (state: RootState) => state.statistics.gasAveragePrice;
export const getGasAveragePriceInfo = (state: RootState) => state.statistics.gasAveragePriceLoading;

export const getGasAverageLimit = (state: RootState) => state.statistics.gasAverageLimit;
export const getGasAverageLimitInfo = (state: RootState) => state.statistics.gasAverageLimitLoading;

export const {
  statisticsReducer
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
