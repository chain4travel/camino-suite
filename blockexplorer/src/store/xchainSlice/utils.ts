import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadTransactionAggregates, loadTransactionFeesAggregates } from 'api';
import { getBaseUrl, getChainID } from 'api/utils';
import axios from 'axios';
import { DateTime } from 'luxon';
import { getStartDate } from 'utils/display-utils';

interface xpArg {
  timeframe: string;
  chainId: string;
  chainAlias: string;
}

export const loadNumberOfPXTransactions = createAsyncThunk(
  'xchain/loadNumberOfXTransactions',
  async (xpArg: xpArg) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, xpArg.timeframe);
    const result = await loadTransactionAggregates(
      xpArg.chainId,
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && result.aggregates.transactionCount;
  },
);

export const loadTotalPXGasFess = createAsyncThunk(
  'xchain/loadTotalXGasFess',
  async (xpArg: xpArg) => {
    const currentDate = DateTime.now().setZone('utc');
    const startDate = getStartDate(currentDate, xpArg.timeframe);
    const result = await loadTransactionFeesAggregates(
      xpArg.chainId,
      startDate.toISO(),
      currentDate.toISO(),
    );
    return result && result.aggregates && parseInt(result.aggregates.txfee);
  },
);

interface transactionsArg {
  chainID: string;
  chainType: string;
}

export const fetchXPTransactions = createAsyncThunk(
  'xchain/fetchTransactions',
  async (chain: transactionsArg) => {
    const response = await axios.get(
      `${getBaseUrl()}/v2/transactions?chainID=${getChainID(
        chain.chainType,
      )}&offset=0&limit=8&sort=timestamp-desc`,
    );
    return { transactions: response.data.transactions, type: chain.chainType };
  },
);
