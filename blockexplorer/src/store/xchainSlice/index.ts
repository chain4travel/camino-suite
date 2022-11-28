import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

import { Status, Timeframe } from 'types';
import { ChainOverviewType, initialXPchainStateType } from 'types/store';
import { createTransaction } from 'utils/magellan';
import {
  fetchXPTransactions,
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from './utils';

const initialState: initialXPchainStateType = {
  xTransactions: undefined,
  pTransactions: undefined,
  xTransactionDetails: undefined,
  pTransactionDetails: undefined,
  loadXPTransactions: Status.IDLE,
  loadXTransactionDetials: Status.IDLE,
  loadPTransactionDetials: Status.IDLE,
  error: undefined,
  assets: undefined,
  xTimeFrame: Timeframe.HOURS_24,
  pTimeFrame: Timeframe.HOURS_24,
  XChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    gasFeesLoading: Status.IDLE,
    transactionsLoading: Status.IDLE,
  } as ChainOverviewType,
  PChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    gasFeesLoading: Status.IDLE,
    transactionsLoading: Status.IDLE,
  } as ChainOverviewType,
};

const xchainSlice = createSlice({
  name: 'xchaine',
  initialState,
  reducers: {
    changetimeFrameXchain(state, action) {
      state.xTimeFrame = action.payload;
    },
    changetimeFramePchain(state, action) {
      state.pTimeFrame = action.payload;
    },
    resetXPChainReducer: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchXPTransactions.pending, (state, action) => {
        state.loadXPTransactions = Status.LOADING;
      })
      .addCase(fetchXPTransactions.fulfilled, (state, action) => {
        state.loadXPTransactions = Status.SUCCEEDED;
        if (action.payload.type === 'x')
          state.xTransactions =
            action.payload.transactions.map(createTransaction);
        else if (action.payload.type === 'p')
          state.pTransactions =
            action.payload.transactions.map(createTransaction);
      })
      .addCase(fetchXPTransactions.rejected, (state, action) => {
        state.loadXPTransactions = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(loadNumberOfPXTransactions.pending, (state, action) => {
        if (action.meta.arg.chainAlias === 'x')
          state.XChainOverview.transactionsLoading = Status.LOADING;
        else state.PChainOverview.transactionsLoading = Status.LOADING;
      })
      .addCase(loadNumberOfPXTransactions.fulfilled, (state, action) => {
        if (action.meta.arg.chainAlias === 'x') {
          state.XChainOverview.numberOfTransactions = action.payload;
          state.XChainOverview.transactionsLoading = Status.SUCCEEDED;
        } else {
          state.PChainOverview.numberOfTransactions = action.payload;
          state.PChainOverview.transactionsLoading = Status.SUCCEEDED;
        }
      })
      .addCase(loadNumberOfPXTransactions.rejected, (state, action) => {
        if (action.meta.arg.chainAlias === 'x')
          state.XChainOverview.transactionsLoading = Status.FAILED;
        else state.PChainOverview.transactionsLoading = Status.FAILED;
      })
      .addCase(loadTotalPXGasFess.pending, (state, action) => {
        if (action.meta.arg.chainAlias === 'x')
          state.XChainOverview.gasFeesLoading = Status.LOADING;
        else state.PChainOverview.gasFeesLoading = Status.LOADING;
      })
      .addCase(loadTotalPXGasFess.fulfilled, (state, action) => {
        if (action.meta.arg.chainAlias === 'x') {
          state.XChainOverview.totalGasFees = action.payload;
          state.XChainOverview.gasFeesLoading = Status.SUCCEEDED;
        } else {
          state.PChainOverview.totalGasFees = action.payload;
          state.PChainOverview.gasFeesLoading = Status.SUCCEEDED;
        }
      })
      .addCase(loadTotalPXGasFess.rejected, (state, action) => {
        if (action.meta.arg.chainAlias === 'x')
          state.XChainOverview.transactionsLoading = Status.FAILED;
        else state.PChainOverview.transactionsLoading = Status.FAILED;
      });
  },
});

// Select All X Transactions
export const selectAllXTransactions = (state: RootState) =>
  state.xchain.xTransactions;
// Select All P Transactions
export const selectAllPTransactions = (state: RootState) =>
  state.xchain.pTransactions;
// Select Loading Status
export const getXPchainStatus = (state: RootState) =>
  state.xchain.loadXPTransactions;
export const getXchainError = (state: RootState) => state.xchain.error;
// Select ChainOverreview data for x-chain
export const getXchainOverreview = (state: RootState) =>
  state.xchain.XChainOverview;
// Select TimeFrime for x-chain
export const getTimeFrameXchain = (state: RootState) => state.xchain.xTimeFrame;
// Select ChainOverreview data for p-chain
export const getPchainOverreview = (state: RootState) =>
  state.xchain.PChainOverview;
// Select TimeFrime for p-chain
export const getTimeFramePchain = (state: RootState) => state.xchain.pTimeFrame;
// Actions
export const {
  changetimeFrameXchain,
  changetimeFramePchain,
  resetXPChainReducer,
} = xchainSlice.actions;
// Reducer
export default xchainSlice.reducer;
