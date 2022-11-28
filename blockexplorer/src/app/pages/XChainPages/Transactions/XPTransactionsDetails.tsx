import * as React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import { mdiTransfer } from '@mdi/js';
import TransactionDetailView from './XPTransactionDetailView';
import { XPTransaction } from 'types/transaction';
import axios from 'axios';
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan';
import CopyTitleCard from 'app/components/CopyTitleCard';
import { XPTransactionDetail } from 'types/magellan-types';
import { transactionApi } from 'utils/magellan-api-utils';
import { useAppSelector } from 'store/configureStore';
import { selectMagellanAddress } from 'store/app-config';

export default function XPTransactionDetails() {
  const [result, setResult] = React.useState<XPTransaction>();
  const [details, setDetails] = React.useState<XPTransactionDetail>();
  const location = useLocation();
  const magellanAddress = useAppSelector(selectMagellanAddress);
  async function fetchTransactionDetail(): Promise<void> {
    const res = (
      await axios.get(
        `${magellanAddress}${transactionApi}/${
          location.pathname.split('/')[3]
        }`,
      )
    ).data;
    let transaction: XPTransaction = {
      id: res.id,
      // status: 'accepted', //TODO: set dynamically when magellan delivers this information
      type: res.type,
      timestamp: new Date(Date.parse(res.timestamp)),
      from: getInputFunds(res),
      to: getOutputFunds(res),
      fee: res.txFee,
      inputTotals: res.inputTotals,
      outputTotals: res.outputTotals,
      memo: convertMemo(res.memo),
    };
    setResult(transaction);
    setDetails({
      id: res.id,
      status: 'accepted', //TODO: set dynamically when magellan delivers this information
      type: res.type,
      timestamp: new Date(Date.parse(res.timestamp)),
      fee: res.txFee,
      memo: convertMemo(res.memo),
    });
  }

  React.useEffect(() => {
    fetchTransactionDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <PageContainer
      pageTitle={`${location.pathname
        .split('/')[1][0]
        .toLocaleUpperCase()} TransactionDetails`}
      metaContent="chain-overview x-chain"
    >
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '680px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <Grid container direction="column" sx={{ width: 1, gap: '20px' }}>
          <Grid
            item
            container
            alignItems="center"
            sx={{
              gap: '20px',
            }}
          >
            <BackButton backToLink={`/${location.pathname.split('/')[1]}`} />
            <Typography variant="h5" component="h5" fontWeight="fontWeightBold">
              {`${location.pathname
                .split('/')[1][0]
                .toLocaleUpperCase()}-Chain Transaction`}
            </Typography>
          </Grid>
          {details && (
            <CopyTitleCard
              label="Transaction"
              value={details.id}
              icon={mdiTransfer}
            />
          )}
          <TransactionDetailView
            inputs={result?.from}
            outputs={result?.to}
            detailTr={details}
          />
        </Grid>
        {details && (
          <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
            <BackButton backToLink={`/${location.pathname.split('/')[1]}`} />
          </Box>
        )}
      </Paper>
    </PageContainer>
  );
}
