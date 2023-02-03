import React from 'react';
import { Grid } from '@mui/material';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import GlobalReloadButton from './GlobalReloadButton';
import { useAppSelector } from 'store/configureStore';
import { getTimeFrame } from 'store/cchainSlice';
import { getTimeFramePchain, getTimeFrameXchain } from 'store/xchainSlice';
import { ChainType } from 'utils/types/chain-type';
import { getChainTypeFromUrl } from 'utils/route-utils';

export default function DataControllers() {
  const timeFrame = useAppSelector(getTimeFrame);
  const timeFrameXchain = useAppSelector(getTimeFrameXchain);
  const timeFramePchain = useAppSelector(getTimeFramePchain);
  function timeFrameForSelectedChain() {
    if (getChainTypeFromUrl() === ChainType.C_CHAIN) return timeFrame;
    else if (getChainTypeFromUrl() === ChainType.X_CHAIN)
      return timeFrameXchain;
    return timeFramePchain;
  }
  return (
    <Grid container spacing={{ xs: 1, md: 1 }}>
      <Grid item xs>
        <RowRadioButtonsGroup timeFrame={timeFrameForSelectedChain()} />
      </Grid>
      <Grid container item xs="auto" sm={3} alignContent="center">
        <GlobalReloadButton
          timeFrame={timeFrameForSelectedChain()}
          style={{ display: 'flex', marginLeft: 'auto' }}
        />
      </Grid>
    </Grid>
  );
}
