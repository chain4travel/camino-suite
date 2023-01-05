import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchDailyEmissions,
    fetchNetworkEmissions,
    fetchTransactionsEmissions
} from '../../api';

//Temporally JSON Test
import transactionsData from '../../app/components/Statistics/json/transactionsData.json';
import uniqueAddresesData from '../../app/components/Statistics/json/uniqueAddresesData.json';
import dailyTokenTransferData from '../../app/components/Statistics/json/dailyTokenTransaction.json';
import gasUsedData from '../../app/components/Statistics/json/gasUsed.json';
import activeAddressesData from '../../app/components/Statistics/json/activeAddresses.json';
import gasAveragePriceData from '../../app/components/Statistics/json/gasAveragePrice.json';
import gasAverageLimitData from '../../app/components/Statistics/json/gasAverageLimit.json';
import averageBlockSizeData from '../../app/components/Statistics/json/averageBlockSize.json';

export const loadDailyEmissions = createAsyncThunk("co2statistics/dailyEmissions", async () => {
    let response = await fetchDailyEmissions();
    return response;
});


export const loadNetworkEmissions = createAsyncThunk("co2statistics/networkEmissions", async () => {
    let response = await fetchNetworkEmissions();
    return response;
});

export const loadTransactionsEmissions = createAsyncThunk("co2statistics/transactionsEmissions", async () => {
    let response = await fetchTransactionsEmissions();
    return response;
});

//Pending of Fetch
export const loadDailyTransactionsStatistics = createAsyncThunk("transactionsStatistics/transactionsPerDay", async () => {
    let data = transactionsData;  
    return data;
});

export const loadUniqueAddresses = createAsyncThunk("transactionsStatistics/uniqueAddressesInfo", async () => {
    let data = uniqueAddresesData;  
    return data;
});

export const loadDailyTokenTransfer = createAsyncThunk("transactionsStatistics/dailyTokenTransfers", async () => {
    let data = dailyTokenTransferData;
    return data;
});

export const loadGasUsed = createAsyncThunk("transactionsStatistics/gasUsed", async () => {
    let data = gasUsedData;
    return data;
});

export const loadActiveAddresses = createAsyncThunk("transactionsStatistics/activeAdresses", async () => {
    let data = activeAddressesData;
    return data;
});
export const loadGasAveragePrice = createAsyncThunk("transactionsStatistics/gasAveragePrice", async () => {
    let data = gasAveragePriceData;
    return data;
});
export const loadGasAverageLimit = createAsyncThunk("transactionsStatistics/gasAverageLimit", async () => {
    let data = gasAverageLimitData;
    return data;
});
export const loadAverageBlockSize = createAsyncThunk("transactionsStatistics/averageBlockSizeData", async () => {
    let data = averageBlockSizeData;
    return data;
});