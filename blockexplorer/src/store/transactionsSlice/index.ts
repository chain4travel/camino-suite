import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
import { Status } from "../../types/index";
import { initicalTransactionsStatistics } from "../../types/store";
import { loadDailyTransactionsStatistics } from "./utils";

let initialState: initicalTransactionsStatistics = {
    dailyTransactionsStatistics: null,
    dailyTransactionsStatisticsLoading: Status.IDLE,
};

const transactionsStatisticsSlice = createSlice({
    name: "transactionsStatistics",
    initialState,
    reducers: {
        dailyTransactionsReducer: () => initialState,
    },
    extraReducers(builder) {
        builder.addCase(loadDailyTransactionsStatistics.pending, (state) => {
            state.dailyTransactionsStatisticsLoading = Status.LOADING;
        });
        builder.addCase(loadDailyTransactionsStatistics.fulfilled, (state, { payload }) => {
            let data: any = payload;
            state.dailyTransactionsStatistics = data;
            state.dailyTransactionsStatisticsLoading = Status.SUCCEEDED;
        });
        builder.addCase(loadDailyTransactionsStatistics.rejected, (state) => {
            state.dailyTransactionsStatisticsLoading = Status.FAILED;
        });
    },
});



// Select all Locations Node
export const getDailyTransactionsStatistics = (state: RootState) => state.transactionsStatistics.dailyTransactionsStatistics;

export const getDailyTransactionsStatisticsLoading = (state: RootState) => state.transactionsStatistics.dailyTransactionsStatisticsLoading;

export const { dailyTransactionsReducer } = transactionsStatisticsSlice.actions;

export default transactionsStatisticsSlice.reducer;
