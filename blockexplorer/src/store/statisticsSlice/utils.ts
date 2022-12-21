import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchCarbonIntensityFactor,
    fetchHolding,
    fetchHybrid,
    fetchNetwork,
    fetchTransaction
} from '../../api/co2statistic';

export const loadCarbonIntensityFactorNetwork = createAsyncThunk("co2statistics/intensityFactor", async () => {
    let response = await fetchCarbonIntensityFactor();
    return response;
});

export const loadHolding = createAsyncThunk("co2statistics/holding", async () => {
    let response = await fetchHolding();
    return response;
});

export const loadHybrid = createAsyncThunk("co2statistics/hybrid", async () => {
    let response = await fetchHybrid(1,1);
    return response;
});

export const loadNetwork = createAsyncThunk("co2statistics/network", async () => {
    let response = await fetchNetwork();
    return response;
});

export const loadTransaction = createAsyncThunk("co2statistics/transaction", async () => {
    let response = await fetchTransaction();
    return response;
});