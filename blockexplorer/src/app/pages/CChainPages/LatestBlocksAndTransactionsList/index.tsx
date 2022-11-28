import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { BlockTableData } from 'types/block';
import { CTransaction } from 'types/transaction';
import { CBLOCKS, CTRANSACTIONS } from 'utils/route-paths';
import BlockList from './BlockList';
import TransactionsList from './TransactionsList';

interface LatestBlocksAndTransactionsListProps {
  blocks: BlockTableData[];
  transactions: CTransaction[];
}

const LatestBlocksAndTransactionsList: FC<
  LatestBlocksAndTransactionsListProps
> = ({ blocks, transactions }) => {
  return (
    <Grid
      container
      rowSpacing={{ xs: 4, lg: '0!important' }}
      columnSpacing={{ xs: 0, lg: 4 }}
    >
      <Grid item xs={12} lg={6}>
        <BlockList title="Latest Blocks" items={blocks} to={`${CBLOCKS}`} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TransactionsList
          title="Latest Transactions"
          items={transactions}
          to={`${CTRANSACTIONS}`}
          link
        />
      </Grid>
    </Grid>
  );
};

export default LatestBlocksAndTransactionsList;
