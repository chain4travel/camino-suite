import { createSlice } from '@reduxjs/toolkit';

import { Status, Timeframe } from 'types';
import { BlockDetail } from 'types/block';
import {
  TransactionCurrency,
  TransactionInformations,
} from 'types/transaction';
import { ChainOverviewType, initialCchainStateType } from 'types/store';
import { RootState } from 'store/configureStore';
import {
  fetchCBlockDetail,
  fetchTransactionDetails,
  loadNumberOfTransactions,
  loadTotalGasFess,
} from './utils';
import {
  fetchNextTransactionDetails,
  fetchPrevTransactionDetails,
} from 'app/pages/CChainPages/Transactions/utils';

const initialState: initialCchainStateType = {
  transactionCount: NaN,
  blockCount: NaN,
  blocks: [],
  currentIndex: 0,
  transactions: [],
  transactionsNavigation: [],
  status: Status.IDLE,
  loadNextPrevStatus: Status.IDLE,
  error: undefined,
  blockDetail: undefined,
  transcationDetails: undefined,
  loadTransactionDetails: Status.IDLE,
  loadBlockDetial: Status.IDLE,
  timeFrame: Timeframe.HOURS_24,
  sha3Uncles: undefined,
  nonce: undefined,
  stateRoot: undefined,
  difficulty: undefined,
  gasLimit: undefined,
  // logsBloom: undefined,
  // receiptsRoot: undefined,
  // mixHash: undefined,
  // extDataHash: undefined,
  // extDataGasUsed: undefined,
  // blockGasCost: undefined,
  // transactionsRoot: undefined,
  miner: undefined,

  ChainOverview: {
    numberOfTransactions: 0,
    totalGasFees: 0,
    gasFeesLoading: Status.IDLE,
    transactionsLoading: Status.IDLE,
  } as ChainOverviewType,
};

const cchainSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    changetimeFrame(state, action) {
      state.timeFrame = action.payload;
    },
    changeCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },
    clearTr(state) {
      state.transcationDetails = undefined;
      state.transactionsNavigation = [];
      state.currentIndex = 0;
    },
    resetLoadingStatusForNPTransactions(state) {
      state.loadNextPrevStatus = Status.IDLE;
    },
    resetCChainReducer: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(loadNumberOfTransactions.pending, state => {
        state.ChainOverview.transactionsLoading = Status.LOADING;
      })
      .addCase(loadNumberOfTransactions.fulfilled, (state, action) => {
        state.ChainOverview.numberOfTransactions = action.payload;
        state.ChainOverview.transactionsLoading = Status.SUCCEEDED;
      })
      .addCase(loadNumberOfTransactions.rejected, state => {
        state.ChainOverview.transactionsLoading = Status.FAILED;
      })
      .addCase(loadTotalGasFess.pending, state => {
        state.ChainOverview.gasFeesLoading = Status.LOADING;
      })
      .addCase(loadTotalGasFess.fulfilled, (state, action) => {
        state.ChainOverview.totalGasFees = action.payload;
        state.ChainOverview.gasFeesLoading = Status.SUCCEEDED;
      })
      .addCase(loadTotalGasFess.rejected, state => {
        state.ChainOverview.gasFeesLoading = Status.FAILED;
      })
      .addCase(fetchCBlockDetail.pending, state => {
        state.loadBlockDetial = Status.LOADING;
      })
      .addCase(fetchCBlockDetail.fulfilled, (state, action) => {
        let block: BlockDetail = {
          hash: action.payload.hash,
          number: parseInt(action.payload.header.number),
          parentHash: action.payload.header.parentHash,
          // parentBlockNumber: parseInt(action.payload.header.number), to review
          baseGaseFee: parseInt(action.payload.header.baseFeePerGas),
          fees: 0,
          gasUsed: parseInt(action.payload.header.gasUsed).toLocaleString(
            'en-US',
          ),
          time: new Date(
            parseInt(action.payload.header.timestamp) * 1000,
          ).toString(),
          transactionsCount: action.payload.transactions
            ? action.payload.transactions.length
            : 0,
          extData: action.payload.header.extraData,
          miner: action.payload.header.miner,
          sha3Uncles: action.payload.header.sha3Uncles,
          nonce: action.payload.header.nonce,
          stateRoot: action.payload.header.stateRoot,
          difficulty: parseInt(action.payload.header.difficulty),
          gasLimit: parseInt(action.payload.header.gasLimit),
          // transactionsRoot: action.payload.header.transactionsRoot,
          // receiptsRoot: action.payload.header.receiptsRoot,
          // logsBloom: action.payload.header.logsBloom,
          // mixHash: action.payload.header.mixHash,
          // extDataHash: action.payload.header.extDataHash,
          // extDataGasUsed: action.payload.header.extDataGasUsed,
          // blockGasCost: action.payload.header.blockGasCost,
          transactions: action.payload.transactions
            ? action.payload.transactions.map(item => ({
                block: item.block,
                index: parseInt(item.receipt.transactionIndex),
                from: item.fromAddr,
                hash: item.hash,
                status: item.receipt.status,
                timestamp: new Date(item.createdAt),
                to: item.toAddr,
                transactionCost: item.receipt.gasUsed
                  ? parseInt(item.receipt.gasUsed) *
                    parseInt(item.receipt.effectiveGasPrice)
                  : parseInt(item.maxFeePerGas) *
                    parseInt(item.receipt.effectiveGasPrice),
                value: parseInt(item.value),
              }))
            : [],
        };
        block.fees += block.transactions
          .map(e => e.transactionCost)
          .reduce((pv, cv) => pv + cv, 0);
        state.blockDetail = block;
        state.loadBlockDetial = Status.SUCCEEDED;
      })
      .addCase(fetchCBlockDetail.rejected, state => {
        state.loadBlockDetial = Status.FAILED;
      })
      .addCase(fetchTransactionDetails.pending, state => {
        state.loadTransactionDetails = Status.LOADING;
      })
      .addCase(fetchTransactionDetails.fulfilled, (state, { payload }) => {
        let transactionInformations: TransactionInformations = {
          hash: payload.hash,
          type: payload.type,
          block: payload.block,
          createdAt: new Date(payload.createdAt),
          fromAddr: payload.fromAddr,
          toAddr: payload.toAddr,
        };
        let transactionCurrency: TransactionCurrency = {
          gasPrice: parseInt(payload.gasPrice),
          maxFeePerGas: parseInt(payload.maxFeePerGas),
          maxPriorityFeePerGas: parseInt(payload.maxPriorityFeePerGas),
          gasUsed: parseInt(payload.receipt.gasUsed).toLocaleString('en-US'),
          effectiveGasPrice: parseInt(payload.receipt.effectiveGasPrice),
          transactionCost:
            parseInt(payload.receipt.gasUsed) *
            parseInt(payload.receipt.effectiveGasPrice),
          value: parseInt(payload.value),
        };
        state.transcationDetails = {
          transactionInformations,
          transactionCurrency,
        };
        state.loadTransactionDetails = Status.SUCCEEDED;
      })
      .addCase(fetchTransactionDetails.rejected, state => {
        state.loadTransactionDetails = Status.FAILED;
      })
      .addCase(fetchPrevTransactionDetails.pending, state => {
        state.loadNextPrevStatus = Status.LOADING;
      })
      .addCase(fetchPrevTransactionDetails.fulfilled, (state, { payload }) => {
        if (payload && payload.length > 0) {
          let res = payload.map(item => {
            return {
              block: parseInt(item.block),
              hash: item.hash,
              from: item.from,
            };
          });
          state.transactionsNavigation = [
            ...res.slice(1).reverse(),
            ...state.transactionsNavigation,
          ];
          state.currentIndex += res.length - 1;
          while (state.transactionsNavigation.length > 100)
            state.transactionsNavigation.pop();
        }
        state.loadNextPrevStatus = Status.SUCCEEDED;
      })
      .addCase(fetchNextTransactionDetails.pending, state => {
        state.loadNextPrevStatus = Status.LOADING;
      })
      .addCase(fetchNextTransactionDetails.fulfilled, (state, { payload }) => {
        if (payload && payload.length > 0) {
          let res = payload.map(item => {
            return {
              block: parseInt(item.block),
              hash: item.hash,
              from: item.from,
            };
          });
          state.transactionsNavigation = [
            ...state.transactionsNavigation,
            ...res,
          ];
          while (state.transactionsNavigation.length > 100)
            state.transactionsNavigation.shift();
        }
        state.loadNextPrevStatus = Status.SUCCEEDED;
      });
  },
});

// Select Chain overreview Data
export const getCchainOverreview = (state: RootState) =>
  state.cchain.ChainOverview;
// Select TimeFrame for chainoverreview
export const getTimeFrame = (state: RootState) => state.cchain.timeFrame;

// Select Block Details
export const getCBlockDetail = (state: RootState) => state.cchain.blockDetail;
export const getCBlockDetailStatus = (state: RootState) =>
  state.cchain.loadBlockDetial;

// Select Transaction Details

export const getCTransactionInformations = (state: RootState) =>
  state.cchain.transcationDetails?.transactionInformations;
export const getCTransactionCurrency = (state: RootState) =>
  state.cchain.transcationDetails?.transactionCurrency;
export const getCTransactionDetailsStatus = (state: RootState) =>
  state.cchain.loadTransactionDetails;

// Select TransactionNavigation
export const getNextPrevTx = (state: RootState) =>
  state.cchain.transactionsNavigation;

export const getNextPrevStatus = (state: RootState) =>
  state.cchain.loadNextPrevStatus;

export const getCurrentIndex = (state: RootState) => state.cchain.currentIndex;
// actions
export const {
  changetimeFrame,
  changeCurrentIndex,
  clearTr,
  resetLoadingStatusForNPTransactions,
  resetCChainReducer,
} = cchainSlice.actions;

export const getInitialeStateCchain = cchainSlice.getInitialState;
// reduceer
export default cchainSlice.reducer;
