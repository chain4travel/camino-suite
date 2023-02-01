import React, { FC, useState, Fragment, useEffect } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import { Paper, useTheme } from '@mui/material';
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
  getGasAveragePriceInfo,
  getGasAverageLimit,
  getGasAverageLimitInfo,
  getAverageBlockSize,
  getAverageBlockSizeInfo,
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
  loadGasAveragePrice,
  loadGasAverageLimit,
  loadAverageBlockSize,
} from 'store/statisticsSlice/utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CO2ConsumptionCharts from '../../components/Statistics/CO2ConsumptionCharts/index';
import { typesMeter } from './ChartSelector';
import BlockchainCharts from '../../components/Statistics/BlockchainCharts/index';
import { typesStatistic } from './ChartSelector';

const Statistics: FC = () => {
  const theme = useTheme();

  const test = '';
  const dark = theme.palette.mode === 'light' ? false : true;

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
          title="Blockchain Data"
          style={{ marginBottom: '2rem', marginTop: '2rem', fontSize: '2rem' }}
          hiddenBackButton={true}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Daily Transactions'}
                utilSlice={() => loadDailyTransactionsStatistics()}
                sliceGetter={getTransactionsPerDay}
                sliceGetterLoader={getTransactionsPerDayStatus}
                typeStatistic={typesStatistic.DAILY_TRANSACTIONS}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Unique Adresses'}
                utilSlice={() => loadUniqueAddresses()}
                sliceGetter={getUniqueAddresses}
                sliceGetterLoader={getUniqueAddressesLoading}
                typeStatistic={typesStatistic.UNIQUE_ADRESSES}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Daily Token Transfer'}
                utilSlice={() => loadDailyTokenTransfer()}
                sliceGetter={getDailyTokenTransfers}
                sliceGetterLoader={getDailyTokenTransfersLoading}
                typeStatistic={typesStatistic.DAILY_TOKEN_TRANSFER}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Gas Used'}
                utilSlice={() => loadGasUsed()}
                sliceGetter={getGasUsed}
                sliceGetterLoader={getGasUsedLoading}
                typeStatistic={typesStatistic.GAS_USED}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Active Addresses'}
                utilSlice={() => loadActiveAddresses()}
                sliceGetter={getActiveAddresses}
                sliceGetterLoader={getActiveAddressesInfo}
                typeStatistic={typesStatistic.ACTIVE_ADDRESSES}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Gas Average Price'}
                utilSlice={() => loadGasAveragePrice()}
                sliceGetter={getGasAveragePrice}
                sliceGetterLoader={getGasAveragePriceInfo}
                typeStatistic={typesStatistic.GAS_AVERAGE_PRICE}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Gas Average Limit'}
                utilSlice={() => loadGasAverageLimit()}
                sliceGetter={getGasAverageLimit}
                sliceGetterLoader={getGasAverageLimitInfo}
                typeStatistic={typesStatistic.GAS_AVERAGE_LIMIT}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BlockchainCharts
                tooltipTitle="This chart highlights the total number of transactions on the Camino blockchain with daily individual breakdown for estimated hash rate, average block time and size, total block and uncle block count and total new address seen."
                darkMode={dark}
                titleText={'Average Block Limit'}
                utilSlice={() => loadAverageBlockSize()}
                sliceGetter={getAverageBlockSize}
                sliceGetterLoader={getAverageBlockSizeInfo}
                typeStatistic={typesStatistic.AVERAGE_BLOCK_SIZE}
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
          title="CO2 Emissions"
          style={{ marginBottom: '20px' }}
          hiddenBackButton={true}
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
                titleText="Daily Emissions"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={() => loadNetworkEmissions()}
                sliceGetter={getNetworkEmissions}
                sliceGetterLoader={getNetworkEmissionsStatus}
                titleText="Network Emissions"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <CO2ConsumptionCharts
                typeMeter={typesMeter.TIME_SERIES}
                darkMode={dark}
                utilSlice={() => loadTransactionsEmissions()}
                sliceGetter={getTransactionsEmissions}
                sliceGetterLoader={getTransactionsEmissionsStatus}
                titleText="Network Emissions Per Transaction"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default Statistics;
