import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DateTime } from 'luxon';
import { getStartDate } from 'utils/display-utils';
import { loadTransactionAggregates, loadTransactionFeesAggregates } from 'api';
import { getBaseUrl, getChainID } from 'api/utils';

export const loadNumberOfTransactions = createAsyncThunk(
  'cchain/loadNumberOfTransactions',
  async (timeframe: string) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, timeframe);
    const result = await loadTransactionAggregates(
      getChainID('c'),
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && result.aggregates.transactionCount;
  },
);

export const loadTotalGasFess = createAsyncThunk(
  'cchain/loadTotalGasFess',
  async (timeframe: string) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, timeframe);
    const result = await loadTransactionFeesAggregates(
      getChainID('c'),
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && parseInt(result.aggregates.txfee);
  },
);

export const fetchBlocksTransactions = createAsyncThunk(
  'cchain/fetchBlocks',
  async () => {
    const response = await axios.get(
      `${getBaseUrl()}/v2/cblocks?limit=8&limit=8`,
    );
    return response.data;
  },
);

export const fetchCBlockDetail = createAsyncThunk(
  'cchain/blockDetail',
  async (number: number) => {
    const res = (await axios.get(`${getBaseUrl()}/v2/ctxdata/${number}`)).data;
    return res;
  },
);

export const fetchTransactionDetails = createAsyncThunk(
  'cchain/transactionDetail',
  async (adress: string) => {
    const res = (
      await axios.get(`${getBaseUrl()}/v2/ctransactions?hash=${adress}`)
    ).data.Transactions[0];
    return res;
  },
);
