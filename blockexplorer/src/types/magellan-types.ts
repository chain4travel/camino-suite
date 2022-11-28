export interface MagellanCTransactionResponse {
  Transactions: MagellanTransactionDetail[];
}

export interface MagellanCBlocksResponse {
  blockCount: number;
  transactionCount: number;
  blocks?: MagellanBlock[];
  transactions?: MagellanTransaction[];
}

export interface MagellanBlock {
  hash: string;
  miner: string;
  difficulty: string;
  number: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: number;
  baseFeePerGas: string;
  extDataGasUsed: string;
  blockGasCost: string;
  evmTx?: number;
}

export interface XPTransactionDetail {
  id: string;
  type: string;
  status: string;
  timestamp?: Date;
  fee: number;
  memo?: string;
}
export interface MagellanTransaction {
  type: string;
  block: string;
  index: string;
  hash: string;
  nonce: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  gas: string;
  value: string;
  from: string;
  to: string;
  timestamp: string;
  status: string;
  gasUsed: string;
  effectiveGasPrice: string;
}

export interface MagellanTransactionDetail {
  type: number;
  block: number;
  hash: string;
  createdAt: string;
  timestamp: number;
  nonce: number;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  gasLimit: number;
  value: string;
  input: string;
  fromAddr: string;
  toAddr: string;
  from: string;
  to: string;
  v: string;
  r: string;
  s: string;
  receipt: MagellanTransactionReceipt;
  effectiveGasPrice: string;
  gasUsed: string;
}

export interface MagellanTransactionReceipt {
  type: string;
  root: string;
  status: string;
  cumulativeGasUsed: string;
  logsBloom: string;
  logs: MagellanTransactionDetailLog[];
  transactionHash: string;
  contractAddress: string;
  gasUsed: string;
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
  effectiveGasPrice: string;
}

export interface MagellanTransactionDetailLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
}

export interface MagellanBlockDetail {
  header: {
    parentHash: string;
    sha3Uncles: string;
    miner: string;
    stateRoot: string;
    transactionsRoot: string;
    receiptsRoot: string;
    logsBloom: string;
    difficulty: string;
    number: string;
    gasLimit: string;
    gasUsed: string;
    timestamp: string;
    extraData: string;
    mixHash: string;
    nonce: string;
    extDataHash: string;
    baseFeePerGas: string;
    extDataGasUsed: string;
    blockGasCost: string;
    hash: string;
  };
  transactions: MagellanTransactionDetail[];
}

export interface MagellanXPTransactionResponse {
  transactions: MagellanXPTransaction[];
  startTime: string;
  endTime: string;
}

export interface MagellanXPTransaction {
  id: string;
  timestamp: string;
  inputs: MagellanXPInput[];
  outputs: MagellanXPOutput[];
  txFee: number;
  type: string;
  chainID: string;
  inputTotals: object;
  outputTotals: object;
  memo: string;
}

export interface MagellanXPOutput {
  id: string;
  amount: number;
  addresses: string[];
}

export interface MagellanXPInput {
  output: MagellanXPOutput;
  credentials: MagellanXPCredentials[];
}

export interface MagellanXPCredentials {
  address: string;
  public_key: string;
  signature: string;
}

export interface MagellanSearchResponse {
  count: number;
  results: MagellanSearchResultElement[];
}

export interface MagellanSearchResultElement {
  type: MagellanSearchResultElementType;
  data:
    | MagellanXPTransactionSearchResult
    | MagellanCTransactionSearchResult
    | MagellanCBlockSearchResult
    | MagellanAddressSearchResult;
}

export interface MagellanAddressSearchResult {
  //currently unknown!
  address: string;
  chainID: string;
}

export interface MagellanCBlockSearchResult {
  Block: string; // block number
  hash: string;
  ChainID: string;
  EvmTx: number; // number of txs
  AtomicTx: number;
  CreatedAt: Date;
  number: number;
}

export interface MagellanCTransactionSearchResult {
  type: number; //0 -> legacy, 2 EIP1559
  block: string; // block number
  hash: string;
  createdAt: Date;
  nonce: number;
  gasLimit: number;
  fromAddr: string;
  toAddr: string;
}

export interface MagellanXPTransactionSearchResult {
  id: string;
  chainID: string;
  type: string;
  inputs?: MagellanXPInput[];
  outputs?: MagellanXPOutput[];
  memo?: string;
  inputTotals?: object;
  outputTotals?: object;
  reusedAddressTotals?: object; //no idea of datatype
  timestamp: Date;
  txFee: number;
  genesis: boolean;
  rewarded: boolean;
  rewardedTime?: object; //no idea of datatype
  epoch: number;
  vertexId: string;
  validatorNodeID: string;
  validatorStart: number;
  validatorEnd: number;
  txBlockId: string;
}

export enum MagellanSearchResultElementType {
  XP_TRANSACTION = 'transaction',
  ADDRESS = 'address',
  C_TRANSACTION = 'cTransaction',
  C_BLOCK = 'cBlock',
  C_ADDRESS = 'cAddress',
}
export interface MagellanAssetsResponse {
  assets: Asset[];
}

export interface Asset {
  id: string;
  chainID: string;
  name: string;
  symbol: string;
  alias: string;
  currentSupply: string;
  timestamp: string;
  denomination: number;
  variableCap: number;
  nft: number;
}
export interface MagellanAddressResponse {
  chainID: string;
  address: string;
  publicKey: string;
  assets: Record<string, AddressResponseAsset>;
}

export interface AddressResponseAsset {
  id: string;
  transactionCount: number;
  utxoCount: number;
  balance: string;
  totalReceived: string;
  totalSent: string;
}

export interface MagellanAggregatesResponse {
  aggregates: Aggregates;
  startTime: string;
  endTime: string;
}

export interface Aggregates {
  startTime: string;
  endTime: string;
  transactionVolume: string;
  transactionCount: number;
  addressCount: number;
  outputCount: number;
  assetCount: number;
}

export interface MagellanTxFeeAggregatesResponse {
  aggregates: TxFeeAggregates;
  startTime: string;
  endTime: string;
}

export interface TxFeeAggregates {
  startTime: string;
  endTime: string;
  txfee: string;
}
