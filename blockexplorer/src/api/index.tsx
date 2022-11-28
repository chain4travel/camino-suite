import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BlockTableData, BlockType } from 'types/block';
import {
  MagellanAggregatesResponse,
  MagellanBlock,
  MagellanCBlocksResponse,
  MagellanTransaction,
  MagellanTxFeeAggregatesResponse,
  MagellanXPTransactionResponse,
} from 'types/magellan-types';
import { CTransaction } from 'types/transaction';
import { createTransaction } from 'utils/magellan';
import { baseEndpoint } from 'utils/magellan-api-utils';
import { getBaseUrl, getChainID, mapToTableData } from './utils';

export const getBlocksPage = async (startingBlock: number) => {
  const response = await axios.get(
    `${getBaseUrl()}${baseEndpoint}/cblocks?limit=${50}&limit=0&blockStart=${startingBlock}&blockEnd=NaN&transactionId=0`,
  );
  return response.data.blocks.map((block: MagellanBlock): BlockType => {
    return {
      hash: block.hash,
      number: parseInt(block.number),
      timestamp: new Date(block.timestamp * 1000),
      gasLimit: parseInt(block.gasLimit),
      gasUsed: parseInt(block.gasUsed),
      numberOfTransactions: block.evmTx ? block.evmTx : 0,
      blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
    };
  });
};

export async function getTransactionsPage(
  startingBlock = NaN,
  endingBlock = NaN,
  transactionId = 0,
) {
  const response = await axios.get(
    `${getBaseUrl()}${baseEndpoint}/cblocks?limit=${0}&limit=${50}&blockStart=${startingBlock}&blockEnd=${endingBlock}&transactionId=${transactionId}`,
  );
  return response.data.transactions.map(transaction => {
    return {
      blockNumber: parseInt(transaction.block),
      transactionIndex: parseInt(transaction.index),
      from: transaction.from,
      hash: transaction.hash,
      status:
        parseInt(transaction.status) === 1
          ? 'Success'
          : `Failed-${parseInt(transaction.status)}`,
      timestamp: parseInt(transaction.timestamp) * 1000,
      to: transaction.to,
      value: parseInt(transaction.value),
      transactionCost:
        parseInt(transaction.gasUsed) * parseInt(transaction.effectiveGasPrice),
    };
  });
}

export async function loadTransactionAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanAggregatesResponse> {
  let url = `${getBaseUrl()}${baseEndpoint}/aggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await axios.get(url)).data;
}

export async function loadTransactionFeesAggregates(
  chainAlias: string,
  startTime: string,
  endTime: string,
): Promise<MagellanTxFeeAggregatesResponse> {
  const url = `${getBaseUrl()}${baseEndpoint}/txfeeAggregates?chainID=${chainAlias}&startTime=${startTime}&endTime=${endTime}`;
  return (await axios.get(url)).data;
}

export async function loadBlocksAndTransactions({ address, offset }) {
  return await axios.get(
    `${getBaseUrl()}${baseEndpoint}/cblocks?address=${address}&limit=0&limit=${offset}`,
  );
}

export async function loadCAddressTransactions({ address, offset }) {
  let res = (await loadBlocksAndTransactions({ address, offset })).data;
  return res.transactions.map(transaction => {
    return {
      blockNumber: parseInt(transaction.block),
      transactionIndex: parseInt(transaction.index),
      from: transaction.from,
      hash: transaction.hash,
      status:
        parseInt(transaction.status) === 1
          ? 'Success'
          : `Failed-${parseInt(transaction.status)}`,
      timestamp: parseInt(transaction.timestamp) * 1000,
      to: transaction.to,
      value: parseInt(transaction.value),
      transactionCost:
        parseInt(transaction.gasUsed) * parseInt(transaction.effectiveGasPrice),
      direction: transaction.from === address ? 'out' : 'in',
    };
  });
}

export async function loadXPTransactions(offset: number, chainID: string) {
  return await axios.get(
    `${getBaseUrl()}${baseEndpoint}/transactions?chainID=${chainID}&offset=${offset}&limit=50&sort=timestamp-desc`,
  );
}

export async function getXPTransactions(offset: number, alias: string) {
  let res: MagellanXPTransactionResponse = (
    await loadXPTransactions(offset, getChainID(alias))
  ).data;
  if (res && res.transactions && res.transactions.length > 0) {
    let newItems = res.transactions.map(item => createTransaction(item));
    return newItems.map(mapToTableData);
  }
  return [];
}

export const getChains = createAsyncThunk('appConfig/chains', async () => {
  const res = await axios.get(`${getBaseUrl()}${baseEndpoint}`);
  return res.data;
});

export interface loadBlocksTransactionstype {
  blocks: BlockTableData[];
  transactions: CTransaction[];
}

export const fetchBlocksTransactionsCChain =
  async (): Promise<loadBlocksTransactionstype> => {
    const result: MagellanCBlocksResponse = (
      await axios.get(`${getBaseUrl()}/v2/cblocks?limit=8&limit=8`)
    ).data;
    let r: loadBlocksTransactionstype = { blocks: [], transactions: [] };
    if (result) {
      if (result.blocks) {
        r.blocks = result.blocks.map((block: MagellanBlock): BlockTableData => {
          let result: BlockTableData = {
            hash: block.hash,
            number: parseInt(block.number),
            timestamp: block.timestamp * 1000,
            gasLimit: parseInt(block.gasLimit),
            gasUsed: parseInt(block.gasUsed),
            numberOfTransactions: block.evmTx ? block.evmTx : 0,
            blockCost: parseInt(block.gasUsed) * parseInt(block.baseFeePerGas),
          };
          return result;
        });
      }
      if (result.transactions) {
        r.transactions = result.transactions.map(
          (element: MagellanTransaction): CTransaction => {
            let result: CTransaction = {
              block: parseInt(element.block),
              index: parseInt(element.index),
              from: element.from,
              hash: element.hash,
              status:
                parseInt(element.status) === 1
                  ? 'Success'
                  : `Failed-${parseInt(element.status)}`,
              timestamp: parseInt(element.timestamp) * 1000,
              to: element.to,
              value: parseInt(element.value),
              transactionCost:
                parseInt(element.gasUsed) * parseInt(element.effectiveGasPrice),
            };
            return result;
          },
        );
      }
    }
    return r;
  };
