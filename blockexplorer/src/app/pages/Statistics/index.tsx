import React, { FC, useState, Fragment, useEffect } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import {
  Paper,
  useTheme
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  getDailyEmissions,
  getDailyEmissionsStatus,
  getNetworkEmissions,
  getNetworkEmissionsStatus,
  getTransactionsEmissions,
  getTransactionsEmissionsStatus
} from 'store/statisticsSlice';
import {
  loadDailyEmissions,
  loadNetworkEmissions,
  loadTransactionsEmissions
} from 'store/statisticsSlice/utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CO2Meters from '../../components/CO2Meters';
import { typeMeter } from './typeMeter';
import CountriesBarMeter from '../../components/CO2Meters/CountriesBarMeter';
import Charts from '../../components/Charts';

const Statistics: FC = () => {

  const theme = useTheme();

  const test = "";
  const dark = theme.palette.mode === 'light' ? false : true

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
              <Grid item md={6} xs={12}>
                  <CO2Meters
                    typeMeter={typeMeter.BAR}
                    darkMode={dark}
                    utilSlice={() => loadDailyEmissions()}
                    sliceGetter={getDailyEmissions}
                    sliceGetterLoader={getDailyEmissionsStatus}
                    levelColor={1}
                  />
              </Grid>
              
              <Grid item md={6} xs={12}>
                  <CO2Meters
                    typeMeter={typeMeter.TIME_SERIES}
                    darkMode={dark}
                    utilSlice={() => loadNetworkEmissions()}
                    sliceGetter={getNetworkEmissions}
                    sliceGetterLoader={getNetworkEmissionsStatus}
                    levelColor={2}
                  />
              </Grid>

              <Grid item md={6} xs={12}>
                  <CO2Meters
                    typeMeter={typeMeter.TIME_SERIES}
                    darkMode={dark}
                    utilSlice={() => loadTransactionsEmissions()}
                    sliceGetter={getTransactionsEmissions}
                    sliceGetterLoader={getTransactionsEmissionsStatus}
                    levelColor={3}
                  />
              </Grid>

              <Grid item md={6} xs={12}>
                <CountriesBarMeter darkMode={dark} titleText={"Carbon Intensity Factor"} levelColor={4} />
              </Grid>
              <Grid item md={6} xs={12}>
                <Charts darkMode={dark } titleText={"Transactions"} />
              </Grid>

            </Grid>
          </Box>
        </Fragment>

      </Paper>
    </PageContainer>
  );
};

export default Statistics;