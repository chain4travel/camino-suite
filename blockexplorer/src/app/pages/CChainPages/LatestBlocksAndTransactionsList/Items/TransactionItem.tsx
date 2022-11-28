import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { mdiTransfer } from '@mdi/js';
import { CamAmount } from '../../../../components/CamAmount';
import { CTransaction } from 'types/transaction';
import { CADDRESS } from 'utils/route-paths';
import Icon from '@mdi/react';
import AddressLink from '../../../../components/AddressLink';
import RelativeTime from '../../../../components/RelativeTime';
import useWidth from 'app/hooks/useWidth';

interface TransactionItemProps {
  transaction: CTransaction;
  to: string;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction, to }) => {
  const { isMobile, isTablet, isDesktop } = useWidth();
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, md: 2 }}
      justifyContent="space-between"
      sx={{
        padding: isDesktop ? '0.5rem 0rem 0.5rem 0rem' : '1rem 0rem 1rem 0rem',
      }}
    >
      {!isMobile && !isTablet && (
        <Grid item xs={1} md={1} lg={1.5} xl={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'latestList.iconBackground',
              borderRadius: '12px',
              minWidth: '50px',
              minHeight: '50px',
              width: '50px',
              height: '50px',
            }}
          >
            <Icon path={mdiTransfer} size={1} color="latestList.iconColor" />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={4} lg={2.5} xl={3} justifyContent="flex-start">
        <AddressLink
          to={`${to}/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body1"
          truncate={true}
        />
        <RelativeTime value={transaction.timestamp} variant="subtitle2" />
      </Grid>
      <Grid item xs={12} md={4} xl={5}>
        <Grid container direction="row">
          <Grid item xs={2} md={4} xl={3}>
            <Typography variant="subtitle2">From</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <AddressLink
              to={`${CADDRESS}/${transaction.from}`}
              value={transaction.from}
              typographyVariant="body1"
              truncate={true}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={2} md={4} xl={3}>
            <Typography variant="subtitle2">To</Typography>
          </Grid>
          <Grid item xs={10} md={8}>
            <AddressLink
              to={`${CADDRESS}/${transaction.to}`}
              value={transaction.to}
              typographyVariant="body1"
              truncate={true}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={2}
        lg={3}
        xl={2}
        alignItems="center"
        justifyContent={!isDesktop ? 'flex-start' : 'flex-end'}
      >
        <CamAmount amount={transaction.value} abbreviate />
      </Grid>
    </Grid>
  );
};

export default TransactionItem;
