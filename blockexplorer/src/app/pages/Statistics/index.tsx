import React, { FC, useState, Fragment } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import {
  Paper
} from '@mui/material';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getCarbonIntensityFactor,
  getCarbonHolding,
  getCarbonHybrid,
  getCarbonNetwork,
  getCarbonTransaction
} from 'store/statisticsSlice';
import {
  loadCarbonIntensityFactorNetwork,
  loadHolding,
  loadHybrid,
  loadNetwork,
  loadTransaction
} from 'store/statisticsSlice/utils';

import CO2Meters from '../../components/CO2Meters';

const Statistics: FC = () => {

  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(loadCarbonIntensityFactorNetwork());
    dispatch(loadHolding());
    dispatch(loadHybrid());
    dispatch(loadNetwork());
    dispatch(loadTransaction());
  });

  const carbonIntensityFactorDetails = useAppSelector(getCarbonIntensityFactor);
  const holdingDetails = useAppSelector(getCarbonHolding);
  const hybridDetails = useAppSelector(getCarbonHybrid);
  const networkDetails = useAppSelector(getCarbonNetwork);
  const transactionDetails = useAppSelector(getCarbonTransaction);

  console.log("carbonIntensityFactorDetails", carbonIntensityFactorDetails);
  console.log("holdingDetails", holdingDetails);
  console.log("hybridDetails", hybridDetails);
  console.log("networkDetails", networkDetails);
  console.log("transactionDetails", transactionDetails);

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
            <CO2Meters
              carbonIntensityFactorDetails={carbonIntensityFactorDetails}
              holdingDetails={holdingDetails}
              hybridDetails={hybridDetails}
              networkDetails={networkDetails}
              transactionDetails={transactionDetails}
            />
          </div>
        </Fragment>

      </Paper>
    </PageContainer>
  );
};

export default Statistics;