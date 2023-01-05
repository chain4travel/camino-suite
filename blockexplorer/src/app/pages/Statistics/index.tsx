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
  getTransactionsPerDayStatus,
  getUniqueAddresses,
  getUniqueAddressesLoading,
  getDailyTokenTransfers, 
  getDailyTokenTransfersLoading,
  getGasUsed,
  getGasUsedLoading,
  getActiveAddresses,
  getActiveAddressesInfo,
  getGasAveragePrice,
  getGasAveragePriceInfo
} from 'store/statisticsSlice';
import {
  loadDailyEmissions,
  loadNetworkEmissions,
  loadTransactionsEmissions,
  loadDailyTransactionsStatistics,
  loadUniqueAddresses,
  loadDailyTokenTransfer,
  loadGasUsed,
  loadActiveAddresses,
  loadGasAveragePrice
} from 'store/statisticsSlice/utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CO2ConsumptionCharts from '../../components/Statistics/CO2ConsumptionCharts/index';
import { typesMeter } from './ChartSelector';
import BlockchainCharts from '../../components/Statistics/BlockchainCharts/index';
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
              <CO2ConsumptionCharts
                typeMeter={typesMeter.BAR}
                darkMode={dark}
                utilSlice={() => loadDailyEmissions()}
                sliceGetter={getDailyEmissions}
                sliceGetterLoader={getDailyEmissionsStatus}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={() => loadNetworkEmissions()}
                sliceGetter={getNetworkEmissions}
                sliceGetterLoader={getNetworkEmissionsStatus}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
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
              <BlockchainCharts
                darkMode={dark}
                titleText={"Daily Transactions"}
                utilSlice={() => loadDailyTransactionsStatistics()}
                sliceGetter={getTransactionsPerDay}
                sliceGetterLoader={getTransactionsPerDayStatus}
                typeStatistic={typesStatistic.DAILY_TRANSACTIONS}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                darkMode={dark}
                titleText={"Unique Adresses"}
                utilSlice={() => loadUniqueAddresses()}
                sliceGetter={getUniqueAddresses}
                sliceGetterLoader={getUniqueAddressesLoading}
                typeStatistic={typesStatistic.UNIQUE_ADRESSES}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                darkMode={dark}
                titleText={"Daily Token Transfer"}
                utilSlice={() => loadDailyTokenTransfer()}
                sliceGetter={getDailyTokenTransfers}
                sliceGetterLoader={getDailyTokenTransfersLoading}
                typeStatistic={typesStatistic.DAILY_TOKEN_TRANSFER}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                darkMode={dark}
                titleText={"Gas Used"}
                utilSlice={() => loadGasUsed()}
                sliceGetter={getGasUsed}
                sliceGetterLoader={getGasUsedLoading}
                typeStatistic={typesStatistic.GAS_USED}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                darkMode={dark}
                titleText={"Active Addresses"}
                utilSlice={() => loadActiveAddresses()}
                sliceGetter={getActiveAddresses}
                sliceGetterLoader={getActiveAddressesInfo}
                typeStatistic={typesStatistic.ACTIVE_ADDRESSES}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                darkMode={dark}
                titleText={"Gas Average Price"}
                utilSlice={() => loadGasAveragePrice()}
                sliceGetter={getGasAveragePrice}
                sliceGetterLoader={getGasAveragePriceInfo}
                typeStatistic={typesStatistic.GAS_AVERAGE_PRICE}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>



    </PageContainer>
  );
};

export default Statistics;