import React, { FC } from 'react';
import { Grid, TableCell, TableRow, Typography, Chip } from '@mui/material';
import { Field } from 'app/components/DetailsField';
import { CADDRESS, CBLOCKS } from 'utils/route-paths';
import { TransactionTableData } from 'types/transaction';
import AddressLink from 'app/components/AddressLink';
import useWidth from 'app/hooks/useWidth';
import FilledCard from 'app/components/FilledCard';
import moment from 'utils/helpers/moment';
import { NoMaxWidthTooltip } from 'app/components/RelativeTime';

interface TransactionProps {
  transaction: TransactionTableData;
}

const Transaction = React.forwardRef<HTMLTableRowElement, TransactionProps>(
  (props, ref) => {
    const transactionBody = <CustomRow transaction={props.transaction} />;

    const { isDesktop, isWidescreen } = useWidth();
    let content;
    if (isDesktop || isWidescreen)
      content = ref ? (
        <TableRow ref={ref}>{transactionBody}</TableRow>
      ) : (
        <TableRow>{transactionBody}</TableRow>
      );
    else
      content = ref ? (
        <FilledCard ref={ref}>
          <GridItem transaction={props.transaction} />
        </FilledCard>
      ) : (
        <FilledCard>
          <GridItem transaction={props.transaction} />
        </FilledCard>
      );
    return content;
  },
);

export default Transaction;

const GridItem: FC<TransactionProps> = ({ transaction }) => {
  return (
    <>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Block
        </Typography>
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body1"
          truncate={false}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          From
        </Typography>
        <AddressLink
          to={`${CADDRESS}/${transaction.from}`}
          value={transaction.from}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          To
        </Typography>
        <AddressLink
          to={`${CADDRESS}/${transaction.to}`}
          value={transaction.to}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Hash
        </Typography>
        <AddressLink
          to={`${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Timestamp
        </Typography>
        <NoMaxWidthTooltip
          title={moment(transaction.timestamp).format(
            'MMM D, YYYY, h:mm:ss A ([GMT] ZZ)',
          )}
        >
          <Typography variant="body2" component="span" noWrap={true}>
            {moment(transaction.timestamp).format(
              'h:mm:ss A\xa0-\xa0DD.MM.YYYY',
            )}
          </Typography>
        </NoMaxWidthTooltip>
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Status
        </Typography>
        <Chip
          label={transaction.status}
          size="small"
          style={{ minWidth: '61px', height: 'min-content' }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Transaction Cost
        </Typography>
        <Field type="gwei" value={transaction.transactionCost} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Value
        </Typography>
        <Field type="gwei" value={transaction.value} />
      </Grid>
    </>
  );
};

const CustomRow: FC<TransactionProps> = ({ transaction }) => {
  const { isDesktop } = useWidth();
  return (
    <>
      <TableCell width="7%" align="left">
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
      >
        <AddressLink
          to={`${CADDRESS}/${transaction.from}`}
          value={transaction.from}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
      >
        <AddressLink
          to={`${CADDRESS}/${transaction.to}`}
          value={transaction.to}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
      >
        <AddressLink
          to={`${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell align="center" sx={{ maxWidth: { lg: '140px' } }}>
        <NoMaxWidthTooltip
          title={moment(transaction.timestamp).format(
            'MMM D, YYYY, h:mm:ss A ([GMT] ZZ)',
          )}
        >
          <Typography variant="body2" component="span">
            {isDesktop
              ? moment(transaction.timestamp).format(
                  'h:mm:ss A\xa0- DD.MM.YYYY',
                )
              : moment(transaction.timestamp).format(
                  'h:mm:ss A\xa0-\xa0DD.MM.YYYY',
                )}
          </Typography>
        </NoMaxWidthTooltip>
      </TableCell>
      <TableCell align="left" sx={{ maxWidth: { lg: '25px' } }}>
        <Chip
          label={transaction.status}
          size="small"
          style={{ minWidth: '61px', height: 'min-content' }}
        />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.transactionCost} />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.value} />
      </TableCell>
    </>
  );
};
