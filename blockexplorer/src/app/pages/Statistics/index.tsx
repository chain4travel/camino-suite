import React, { FC, useState, Fragment, useEffect } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import {
  Paper
} from '@mui/material';
// import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getCarbonIntensityFactor,
  getCarbonHolding,
  getCarbonHybrid,
  getCarbonNetwork,
  getCarbonTransaction,
  getCarbonNetworkStatus
} from 'store/statisticsSlice';
import {
  loadCarbonIntensityFactorNetwork,
  loadHolding,
  loadHybrid,
  loadNetwork,
  loadTransaction
} from 'store/statisticsSlice/utils';
import { Status } from '../../../types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BarMeter from '../../components/CO2Meters/BarMeter';
import CO2Meters from '../../components/CO2Meters';
import { typeMeter } from './typeMeter';

const Statistics: FC = () => {


  return (
    <PageContainer pageTitle="Validators" metaContent="validators">
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '544px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <SubPageTitle
          title="Camino Charts & Statistics"
          style={{ marginBottom: '20px' }}
          hiddenBackButton={true}
        />

        <Fragment>
          <div style={{ position: 'relative' }}>
            <CO2Meters typeMeter={typeMeter.DAILY_EMISSIONS_PER_NETWORK} darkMode={true} utilSlice={() => loadNetwork()} sliceGeter={getCarbonNetwork} />
            
          </div>
        </Fragment>

      </Paper>
    </PageContainer>
  );
};

export default Statistics;