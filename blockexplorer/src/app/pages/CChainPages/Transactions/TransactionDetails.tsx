import React, { FC, useState, useEffect } from 'react';
import {
  changeCurrentIndex,
  clearTr,
  getCTransactionCurrency,
  getCTransactionDetailsStatus,
  getCTransactionInformations,
  getCurrentIndex,
  getNextPrevStatus,
  getNextPrevTx,
  resetLoadingStatusForNPTransactions,
} from 'store/cchainSlice';
import {
  fetchNextTransactionDetails,
  fetchPrevTransactionDetails,
  getNextPrevTransaction,
  TrimmedTransactionDetails,
} from './utils';
import { fetchTransactionDetails } from 'store/cchainSlice/utils';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Grid, Paper, useTheme, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Status } from 'types';
import { mdiTransfer } from '@mdi/js';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { CCHAIN, CTRANSACTIONS } from 'utils/route-paths';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';
import Icon from '@mdi/react';
import TransactionDetailView from './TransactionDetailView';
import SubPageTitle from 'app/components/SubPageTitle';

const TransactionDetails: FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const detailTr = useAppSelector(getCTransactionInformations);
  const detailCr = useAppSelector(getCTransactionCurrency);
  const loading = useAppSelector(getCTransactionDetailsStatus);
  const getNPStatus = useAppSelector(getNextPrevStatus);
  const nextPrevTX = useAppSelector(getNextPrevTx);
  const currentIndex = useAppSelector(getCurrentIndex);
  const [btnStopper, setBtnStopper] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelay = () => {
    setBtnStopper(true);
    setTimeout(() => {
      setBtnStopper(false);
    }, 500);
  };

  useEffect(() => {
    dispatch(fetchTransactionDetails(location.pathname.split('/')[3]));
    return () => {
      changeCurrentIndex(0);
      dispatch(clearTr());
      dispatch(resetLoadingStatusForNPTransactions());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (detailTr && getNPStatus === Status.IDLE) {
      let args: TrimmedTransactionDetails = {
        address: detailTr?.fromAddr,
        blockNumber: detailTr?.block,
        transactionID: 0,
      };
      dispatch(fetchPrevTransactionDetails(args));
      dispatch(fetchNextTransactionDetails(args));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailTr]);

  useEffect(() => {
    if (
      nextPrevTX.length > 0 &&
      location.pathname.split('/')[3] !== nextPrevTX[currentIndex]?.hash
    )
      navigate(`${CTRANSACTIONS}/${nextPrevTX[currentIndex]?.hash}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <PageContainer
      pageTitle="C TransactionDetails"
      metaContent="chain-overview c-chain"
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
          <SubPageTitle title="C-Chain Transaction" backToLink={CCHAIN}>
            <Box
              sx={{
                display: 'flex',
                whiteSpace: 'nowrap',
                justifyContent: 'flex-end',
              }}
            >
              <RoundButton
                disabled={
                  getNPStatus === Status.LOADING ||
                  loading === Status.LOADING ||
                  btnStopper
                }
                onClick={() => {
                  if (
                    getNPStatus !== Status.LOADING &&
                    loading !== Status.LOADING
                  ) {
                    dispatch(getNextPrevTransaction(true, detailTr));
                  }
                  handleDelay();
                }}
                sx={{ width: '42px', height: '42px', mr: '15px' }}
              >
                <Icon
                  path={mdiChevronLeft}
                  size={1}
                  color={theme.palette.primary.contrastText}
                />
              </RoundButton>
              <RoundButton
                disabled={
                  getNPStatus === Status.LOADING ||
                  loading === Status.LOADING ||
                  btnStopper
                }
                onClick={() => {
                  if (
                    getNPStatus !== Status.LOADING &&
                    loading !== Status.LOADING
                  ) {
                    dispatch(getNextPrevTransaction(false, detailTr));
                  }
                  handleDelay();
                }}
                sx={{ width: '42px', height: '42px' }}
              >
                <Icon
                  path={mdiChevronRight}
                  size={1}
                  color={theme.palette.primary.contrastText}
                />
              </RoundButton>
            </Box>
          </SubPageTitle>
          {loading === Status.SUCCEEDED && (
            <OutlinedContainer transparent={false}>
              <DetailsField
                field="Transaction"
                value={detailTr?.hash}
                type="string"
                icon={
                  <Icon
                    path={mdiTransfer}
                    color="latestList.iconColor"
                    style={{ width: '20px', height: '20px' }}
                  />
                }
                allowCopy={true}
                style={{ padding: '1rem' }}
              />
            </OutlinedContainer>
          )}
          <TransactionDetailView detailTr={detailTr} detailCr={detailCr} />
        </Grid>
        {(detailTr || detailCr) && (
          <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
            <BackButton backToLink={CCHAIN} />
          </Box>
        )}
      </Paper>
    </PageContainer>
  );
};

export default TransactionDetails;

const RoundButton = ({ sx, children, ...props }) => {
  return (
    <Button
      disableRipple
      sx={{
        color: 'white',
        borderColor: 'secondary.main',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '100%',
        minWidth: 'min-content',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
