import React, { FC } from 'react';
import {
  Grid,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import { Field } from 'app/components/DetailsField';
import { CADDRESS, CTRANSACTIONS, CBLOCKS } from 'utils/route-paths';
import { CAddressTransactionTableData } from 'types/transaction';
import AddressLink from 'app/components/AddressLink';
import useWidth from 'app/hooks/useWidth';
import moment from 'utils/helpers/moment';

interface Props {
  transaction: CAddressTransactionTableData;
}

const Address = React.forwardRef<HTMLTableRowElement, Props>((props, ref) => {
  const { isDesktop, isWidescreen } = useWidth();
  let content;
  if (isDesktop || isWidescreen)
    content = ref ? (
      <TableRow ref={ref}>
        <CustomRow transaction={props.transaction} />
      </TableRow>
    ) : (
      <TableRow>
        <CustomRow transaction={props.transaction} />
      </TableRow>
    );
  else
    content = ref ? (
      <Paper
        sx={{
          width: 1,
          marginBottom: '1rem',
          padding: '15px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'primary.light',
          backgroundImage: 'none',
        }}
      >
        <GridItem transaction={props.transaction} />
      </Paper>
    ) : (
      <Paper
        sx={{
          width: 1,
          marginBottom: '1rem',
          padding: '15px',
          gap: '10px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'primary.light',
          backgroundImage: 'none',
        }}
      >
        <GridItem transaction={props.transaction} />
      </Paper>
    );
  return content;
});

export default Address;

interface GridItemProps {
  transaction: CAddressTransactionTableData;
}

const CustomRow: FC<GridItemProps> = ({ transaction }) => {
  return (
    <>
      <TableCell>
        <Chip
          label={transaction.direction}
          size="small"
          style={{
            minWidth: '61px',
            height: 'min-content',
            backgroundColor:
              transaction.direction === 'in'
                ? 'rgba(53, 233, 173, .7)'
                : '#rgba(180, 64, 252, .7)',
          }}
        />
      </TableCell>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
      >
        <AddressLink
          to={`${CTRANSACTIONS}/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell>
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body2"
          truncate={true}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" component="span" noWrap={true}>
          {moment(transaction.timestamp as number).fromNow()}
        </Typography>
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
      <TableCell>
        <Field type="gwei" value={transaction.value} />
      </TableCell>
      <TableCell>
        <Field type="gwei" value={transaction.transactionCost} />
      </TableCell>
    </>
  );
};

const GridItem: FC<GridItemProps> = ({ transaction }) => {
  return (
    <>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          In/Out
        </Typography>
        <Chip
          label={transaction.direction}
          size="small"
          style={{
            minWidth: '61px',
            height: 'min-content',
            fontSize: '12px',
            backgroundColor:
              transaction.direction === 'in'
                ? 'rgba(53, 233, 173, .7)'
                : 'rgba(180, 64, 252, .7)',
          }}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Txn Hash
        </Typography>
        <AddressLink
          to={`${CTRANSACTIONS}/${transaction.hash}`}
          value={transaction.hash}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Block
        </Typography>
        <AddressLink
          to={`${CBLOCKS}/${transaction.blockNumber}`}
          value={transaction.blockNumber}
          typographyVariant="body2"
          truncate={true}
        />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Age
        </Typography>
        {moment(transaction.timestamp as number).fromNow()}
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
          Value
        </Typography>
        <Field type="gwei" value={transaction.value} />
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Typography variant="subtitle2" color="latestList.timestamp">
          Transaction Cost
        </Typography>
        <Field type="gwei" value={transaction.transactionCost} />
      </Grid>
    </>
  );
};
