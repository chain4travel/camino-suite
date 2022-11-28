import React from 'react';
import { Grid } from '@mui/material';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import GlobalReloadButton from './GlobalReloadButton';
import { useAppSelector } from 'store/configureStore';
import { getTimeFrame } from 'store/cchainSlice';
import { getTimeFramePchain, getTimeFrameXchain } from 'store/xchainSlice';
import { useLocation } from 'react-router-dom';
import { ChainType } from 'utils/types/chain-type';

export default function DataControllers() {
  const timeFrame = useAppSelector(getTimeFrame);
  const timeFrameXchain = useAppSelector(getTimeFrameXchain);
  const timeFramePchain = useAppSelector(getTimeFramePchain);
  const location = useLocation();
  function t() {
    if (location.pathname.split('/')[1] === ChainType.C_CHAIN) return timeFrame;
    else if (location.pathname.split('/')[1] === ChainType.X_CHAIN)
      return timeFrameXchain;
    return timeFramePchain;
  }
  return (
    <Grid container spacing={{ xs: 1, md: 1 }}>
      <Grid item xs>
        <RowRadioButtonsGroup timeFrame={t()} />
      </Grid>
      <Grid container item xs="auto" sm={3} alignContent="center">
        <GlobalReloadButton style={{ display: 'flex', marginLeft: 'auto' }} />
      </Grid>
    </Grid>
  );
}
