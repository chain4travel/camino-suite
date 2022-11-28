import React, { FC } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchCBlockDetail } from 'store/cchainSlice/utils';
import { getCBlockDetail, getCBlockDetailStatus } from 'store/cchainSlice';
import { CCHAIN, CTRANSACTIONS } from 'utils/route-paths';
import { Status } from 'types';
import LoadingWrapper from 'app/components/LoadingWrapper';
import TransactionsList from 'app/pages/CChainPages/LatestBlocksAndTransactionsList/TransactionsList';
import PageContainer from 'app/components/PageContainer';
import BlockDetailView from './BlockDetailView';
import SubPageTitle from 'app/components/SubPageTitle';

const BlockDetails: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const blockDetails = useAppSelector(getCBlockDetail);
  const loading = useAppSelector(getCBlockDetailStatus);

  React.useEffect(() => {
    dispatch(fetchCBlockDetail(parseInt(location.pathname.split('/')[3])));
  }, [location, dispatch]);

  return (
    <PageContainer
      pageTitle="C BlockDetails"
      metaContent="chain-overview c-chain"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Paper
          variant="outlined"
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '600px',
            width: 1,
            backgroundColor: 'primary.dark',
            borderRadius: '12px',
            borderWidth: '1px',
            borderColor: 'primary.light',
            borderStyle: 'solid',
            p: '1rem 1.5rem 1rem 1.5rem',
          }}
        >
          <Grid
            container
            direction="column"
            sx={{
              width: 1,
              minHeight: '600px',
              gap: '20px',
            }}
          >
            <SubPageTitle
              title={`Block ${location.pathname.split('/')[3]}`}
              backToLink={CCHAIN}
            />
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
              }}
            >
              <BlockDetailView loading={loading} blockDetails={blockDetails} />
            </Box>
          </Grid>
        </Paper>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={12}
          sx={{ borderRadius: '12px' }}
        >
          <TransactionsView loading={loading} blockDetails={blockDetails} />
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default BlockDetails;

interface TransactionsViewProps {
  loading: Status;
  blockDetails: any;
}

const TransactionsView: FC<TransactionsViewProps> = ({
  loading,
  blockDetails,
}) => {
  return (
    <LoadingWrapper loading={loading} failedLoadingMsg="">
      {blockDetails?.transactions?.length > 0 && (
        <Grid item xs={12} lg={12}>
          <TransactionsList
            title="Block Transactions"
            items={blockDetails?.transactions}
            to={CTRANSACTIONS}
            link={false}
          />
        </Grid>
      )}
    </LoadingWrapper>
  );
};
