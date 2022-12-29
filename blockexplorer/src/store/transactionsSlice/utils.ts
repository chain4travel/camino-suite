import { createAsyncThunk } from "@reduxjs/toolkit";
import testData from './testData.json';

export const loadDailyTransactionsStatistics = createAsyncThunk("transactionsStatistics/dailyTransactionsStatistics", async () => {
    let data = testData;  
    return data;
});
