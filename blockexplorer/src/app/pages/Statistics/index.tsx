import React, { FC, useState, Fragment, useEffect } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import {
  Paper,
  useTheme
} from '@mui/material';
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

  const theme = useTheme();

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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>

              {/*Daily Emissions */}
              <Grid item md={6} xs={12}>
                {theme.palette.mode == 'light' ? (
                  <CO2Meters
                    typeMeter={typeMeter.BAR}
                    darkMode={false}
                    utilSlice={() => loadNetwork()}
                    sliceGeter={getCarbonNetwork}
                  />
                ) : (
                  <CO2Meters
                    typeMeter={typeMeter.BAR}
                    darkMode={true}
                    utilSlice={() => loadNetwork()}
                    sliceGeter={getCarbonNetwork} />
                )}
              </Grid>

              {/* Network Emissions */}
              <Grid item md={6} xs={12}>
                {theme.palette.mode == 'light' ? (
                  <CO2Meters
                    typeMeter={typeMeter.TIME_SERIES}
                    darkMode={false}
                    utilSlice={() => loadNetwork()}
                    sliceGeter={getCarbonNetwork}
                  />
                ) : (
                  <CO2Meters
                    typeMeter={typeMeter.TIME_SERIES}
                    darkMode={true}
                    utilSlice={() => loadNetwork()}
                    sliceGeter={getCarbonNetwork} />
                )}
                
              </Grid>
            </Grid>
          </Box>
        </Fragment>

      </Paper>
    </PageContainer>
  );
};

export default Statistics;