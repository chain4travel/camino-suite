import * as React from 'react';
import { getCchainOverreview } from 'store/cchainSlice';
import { Typography } from '@mui/material';
import { useAppSelector } from 'store/configureStore';
import LatestBlocksAndTransactionsList from 'app/pages/CChainPages/LatestBlocksAndTransactionsList';
import OverviewCards from 'app/components/OverviewCards';
import DataControllers from 'app/components/DataControllers';
import PageContainer from 'app/components/PageContainer';
import {
  getValidatorsOverreview,
  getValidatorsStatus,
} from 'store/validatorsSlice';
import { useQuery } from 'react-query';
import { fetchBlocksTransactionsCChain, loadBlocksTransactionstype } from 'api';
import { Status } from 'types';
import LoadingWrapper from 'app/components/LoadingWrapper';

export default function CChainPage() {
  const validatorsLoading = useAppSelector(getValidatorsStatus);
  const {
    percentageOfActiveValidators,
    numberOfValidators,
    numberOfActiveValidators,
  } = useAppSelector(getValidatorsOverreview);
  const {
    numberOfTransactions,
    totalGasFees,
    gasFeesLoading,
    transactionsLoading,
  } = useAppSelector(getCchainOverreview);

  const { data, isError, error, isLoading } = useQuery<
    Promise<loadBlocksTransactionstype>,
    string,
    loadBlocksTransactionstype
  >('blocks-transactions-cchain', fetchBlocksTransactionsCChain, {
    refetchInterval: 10000,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
  });
  return (
    <PageContainer pageTitle="C chain" metaContent="chain-overview c-chain">
      {isError && error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: 'center', marginTop: '1rem' }}
        >
          {error as string}
        </Typography>
      ) : (
        <>
          <DataControllers />
          <OverviewCards
            numberOfTransactions={numberOfTransactions}
            totalGasFees={totalGasFees}
            numberOfActiveValidators={numberOfActiveValidators}
            numberOfValidators={numberOfValidators}
            percentageOfActiveValidators={percentageOfActiveValidators}
            gasFeesLoading={gasFeesLoading}
            transactionsLoading={transactionsLoading}
            validatorsLoading={validatorsLoading}
          />
          <LoadingWrapper
            loading={isLoading === true ? Status.LOADING : Status.SUCCEEDED}
            failedLoadingMsg="Failed to load blocks and transactions"
            loadingBoxStyle={{ minHeight: '500px' }}
          >
            {data && (
              <LatestBlocksAndTransactionsList
                blocks={data.blocks}
                transactions={data.transactions}
              />
            )}
          </LoadingWrapper>
        </>
      )}
    </PageContainer>
  );
}
