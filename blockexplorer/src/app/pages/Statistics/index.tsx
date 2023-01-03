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
  getTransactionsEmissionsStatus,
  getTransactionsPerDay,
  getTransactionsPerDayStatus
} from 'store/statisticsSlice';
import {
  loadDailyEmissions,
  loadNetworkEmissions,
  loadTransactionsEmissions,
  loadDailyTransactionsStatistics
} from 'store/statisticsSlice/utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CO2Charts from '../../components/Statistics/CO2Charts/index';
import { typesMeter } from './ChartSelector';
import Charts from '../../components/Statistics/Charts/index';
import { typesStatistic } from './ChartSelector';

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
          title="CO2 Consumption"
          style={{ marginBottom: '20px' }}
          hiddenBackButton={false}
        />
        <Box sx={{ flexGrow: 1 }}>

          {/*CO2 Charts */}
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <CO2Charts
                typeMeter={typesMeter.BAR}
                darkMode={dark}
                utilSlice={() => loadDailyEmissions()}
                sliceGetter={getDailyEmissions}
                sliceGetterLoader={getDailyEmissionsStatus}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2Charts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={() => loadNetworkEmissions()}
                sliceGetter={getNetworkEmissions}
                sliceGetterLoader={getNetworkEmissionsStatus}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2Charts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={() => loadTransactionsEmissions()}
                sliceGetter={getTransactionsEmissions}
                sliceGetterLoader={getTransactionsEmissionsStatus}
              />
            </Grid>
          </Grid>
        </Box>

      </Paper>

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
          title="Blockchain Data"
          style={{ marginBottom: '20px' }}
          hiddenBackButton={true}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Charts
                darkMode={dark}
                titleText={"Daily Transactions"}
                utilSlice={() => loadDailyTransactionsStatistics()}
                sliceGetter={getTransactionsPerDay}
                sliceGetterLoader={getTransactionsPerDayStatus}
                typeStatistic={typesStatistic.DAILY_TRANSACTIONS}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              {/*<Charts
                  darkMode={dark}
                  titleText={"Unique Adresses"}
                  utilSlice={() => loadDailyTransactionsStatistics()}
                  sliceGetter={getTransactionsPerDay}
                  sliceGetterLoader={getTransactionsPerDayStatus}
                  typeStatistic={typesStatistic.UNIQUE_ADRESSES}
                />*/}
            </Grid>
          </Grid>
        </Box>
      </Paper>



    </PageContainer>
  );
};

export default Statistics;