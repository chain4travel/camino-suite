import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchDailyEmissions,
    fetchNetworkEmissions,
    fetchTransactionsEmissions
} from '../../api/co2statistic';

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

//Magelland Services