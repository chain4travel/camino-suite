export enum ChainType {
  C_CHAIN = 'c-chain',
  P_CHAIN = 'p-chain',
  X_CHAIN = 'x-chain',
}

export function getAlias(value: ChainType) {
  switch (value) {
    case ChainType.C_CHAIN:
      return 'c';
    case ChainType.X_CHAIN:
      return 'x';
    case ChainType.P_CHAIN:
      return 'p';
  }
}
