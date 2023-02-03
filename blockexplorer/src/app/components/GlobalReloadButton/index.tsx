import * as React from 'react';
import Replay from '@mui/icons-material/Replay';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { getCchainOverreview, getTimeFrame } from 'store/cchainSlice';
import {
  fetchBlocksTransactions,
  loadNumberOfTransactions,
  loadTotalGasFess,
} from 'store/cchainSlice/utils';
import {
  getPchainOverreview,
  getTimeFrameXchain,
  getXchainOverreview,
} from 'store/xchainSlice';
import {
  fetchXPTransactions,
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import { ChainType } from 'utils/types/chain-type';
import { getChainID } from 'api/utils';
import { Status } from 'types';
import { getChainTypeFromUrl } from 'utils/route-utils';

export default function GlobalReloadButton({
  timeFrame,
  style,
}: {
  timeFrame: string;
  style?: React.CSSProperties;
}) {
  const dispatch = useAppDispatch();
  let chainAlias = getChainTypeFromUrl()[0];
  let chainName = getChainTypeFromUrl();
  const { gasFeesLoading, transactionsLoading } = useAppSelector(
    chainName === ChainType.C_CHAIN ? getCchainOverreview : getXchainOverreview,
  );
  const {
    gasFeesLoading: pGasFeesLoading,
    transactionsLoading: pTransactionsLoading,
  } = useAppSelector(getPchainOverreview);
  const {
    gasFeesLoading: xGasFeesLoading,
    transactionsLoading: xTransactionsLoading,
  } = useAppSelector(getXchainOverreview);
  const handleClick = async () => {
    if (
      chainName === ChainType.C_CHAIN &&
      gasFeesLoading !== Status.LOADING &&
      transactionsLoading !== Status.LOADING
    ) {
      dispatch(fetchBlocksTransactions());
      dispatch(loadValidators());
      dispatch(loadNumberOfTransactions(timeFrame));
      dispatch(loadTotalGasFess(timeFrame));
    } else if (
      (chainName === ChainType.X_CHAIN &&
        xGasFeesLoading !== Status.LOADING &&
        xTransactionsLoading !== Status.LOADING) ||
      (chainName === ChainType.P_CHAIN &&
        pGasFeesLoading !== Status.LOADING &&
        pTransactionsLoading !== Status.LOADING)
    ) {
      let chainId =
        chainName === ChainType.X_CHAIN
          ? getChainID(chainAlias)
          : getChainID(chainAlias);
      dispatch(
        loadNumberOfPXTransactions({
          timeframe: timeFrame,
          chainId,
          chainAlias: chainAlias,
        }),
      );
      dispatch(
        loadTotalPXGasFess({
          timeframe: timeFrame,
          chainId,
          chainAlias: chainAlias,
        }),
      );
      dispatch(
        fetchXPTransactions({
          chainID: getChainID(chainAlias),
          chainType: chainAlias,
        }),
      );
      dispatch(loadValidators());
    }
  };
  useEffectOnce(() => {
    dispatch(loadValidators());
  });
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      color="secondary"
      sx={{
        borderWidth: '1.5px',
        borderRadius: '25px',
        maxHeight: '35px',
        ...style,
      }}
      aria-label="reload button"
    >
      <Replay sx={{ color: 'primary.contrastText', fontSize: '25px' }} />
    </Button>
  );
}
