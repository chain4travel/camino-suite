import { Status } from 'types';
import { BlockDetail, BlockTableData } from './block';
import { MagellanTransaction } from './magellan-types';
import { CTransaction, TranscationDetails, XPTransaction } from './transaction';

export interface Chain {
  chainID: string;
  chainAlias: string;
  vm: string;
  avaxAssetID: string;
  networkID: number;
}
export interface ChainOverviewType {
  numberOfTransactions: number;
  totalGasFees: number;
  numberOfValidators: number;
  gasFeesLoading: Status;
  transactionsLoading: Status;
}

export interface Network {
  id: string;
  displayName: string;
  protocol: string;
  host: string;
  port: number;
  predefined?: boolean;
  magellanAddress: string;
}

export interface initialCchainStateType {
  transactionCount: number;
  currentIndex: number;
  blockCount: number;
  blocks: BlockTableData[];
  transactions: CTransaction[];
  transactionsNavigation: MagellanTransaction[];
  loadNextPrevStatus: Status;
  status: Status;
  error: undefined | string;
  timeFrame: string;
  blockDetail?: BlockDetail;
  loadBlockDetial: Status;
  loadTransactionDetails: Status;
  transcationDetails?: TranscationDetails;
  ChainOverview: ChainOverviewType;
  miner: undefined | string;
  sha3Uncles: undefined | string;
  nonce: undefined | string;
  stateRoot: undefined | string;
  difficulty: undefined | number;
  gasLimit: undefined | string;
  // receiptsRoot: undefined | string;
  // logsBloom: undefined | string;
  // mixHash: undefined | string;
  // extDataHash: undefined | string;
  // extDataGasUsed: undefined | string;
  // blockGasCost: undefined | string;
  // transactionsRoot: undefined | string;
}

export interface initialValidatorsStateType {
  percentageOfActiveValidators: number;
  numberOfActiveValidators: number;
  numberOfValidators: number;
  validatorsLoading: Status;
  validators: ValidatorType[];
}

export interface ValidatorType {
  status: string;
  nodeID: string;
  startTime: Date;
  endTime: Date;
  txID: string;
  uptime: string;
}

interface assets {
  name: string;
  symbol: string;
}
export interface initialXPchainStateType {
  xTransactions?: XPTransaction[];
  pTransactions?: XPTransaction[];
  xTransactionDetails?: XPTransaction;
  pTransactionDetails?: XPTransaction;
  loadXPTransactions: Status;
  loadXTransactionDetials: Status;
  loadPTransactionDetials: Status;
  error: undefined | string;
  xTimeFrame: string;
  pTimeFrame: string;
  assets?: assets[];
  XChainOverview: ChainOverviewType;
  PChainOverview: ChainOverviewType;
}
