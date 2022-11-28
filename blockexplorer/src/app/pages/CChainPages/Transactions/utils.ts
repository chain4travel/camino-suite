import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBaseUrl } from 'api/utils';
import axios from 'axios';
import { changeCurrentIndex } from 'store/cchainSlice';
import { fetchTransactionDetails } from 'store/cchainSlice/utils';
import { AppDispatch, RootState } from 'store/configureStore';
import { Status } from 'types';
import { TransactionInformations } from 'types/transaction';

export interface TrimmedTransactionDetails {
  address?: string;
  blockNumber?: number;
  transactionID: number;
}

export function getNextPrevTransaction(
  direction: boolean,
  transaction?: TransactionInformations,
) {
  return async function getTx(
    dispatch: AppDispatch,
    getState: () => RootState,
  ) {
    let txs = getState().cchain.transactionsNavigation;
    let currentIndex = getState().cchain.currentIndex;
    let loading = getState().cchain.loadTransactionDetails;
    let load = getState().cchain.loadNextPrevStatus;
    if (load !== Status.LOADING && loading !== Status.LOADING) {
      if (direction) {
        if (currentIndex + 1 < txs.length) {
          dispatch(fetchTransactionDetails(txs[currentIndex + 1].hash));
          dispatch(changeCurrentIndex(currentIndex + 1));
        } else {
          let args: TrimmedTransactionDetails = {
            address: txs[currentIndex]?.from,
            blockNumber: parseInt(txs[currentIndex].block) + 1,
            transactionID: 0,
          };
          dispatch(fetchNextTransactionDetails(args));
        }
      } else {
        if (currentIndex - 1 >= 0) {
          dispatch(fetchTransactionDetails(txs[currentIndex - 1].hash));
          dispatch(changeCurrentIndex(currentIndex - 1));
        } else {
          let args: TrimmedTransactionDetails = {
            address: txs[currentIndex]?.from,
            blockNumber: parseInt(txs[currentIndex].block),
            transactionID: 0,
          };
          dispatch(fetchPrevTransactionDetails(args));
        }
      }
    }
  };
}
export const fetchPrevTransactionDetails = createAsyncThunk(
  'cchain/prevtransactionsDetails',
  async (infos: TrimmedTransactionDetails) => {
    let url = `${getBaseUrl()}/v2/cblocks?limit=${0}&limit=${50}&blockStart=${
      infos.blockNumber
    }&blockEnd=${NaN}&transactionId=${infos.transactionID}&address=${
      infos.address
    }`;
    const res = await axios.get(url);
    return res?.data?.transactions;
  },
);

export const fetchNextTransactionDetails = createAsyncThunk(
  'cchain/nexttransactionsDetails',
  async (infos: TrimmedTransactionDetails) => {
    let url = `${getBaseUrl()}/v2/cblocks?limit=${0}&limit=${50}&blockStart=${NaN}&blockEnd=${
      infos.blockNumber
    }&transactionId=${infos.transactionID}&address=${infos.address}`;
    const res = await axios.get(url);
    return res.data.transactions;
  },
);
