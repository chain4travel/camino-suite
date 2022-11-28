import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import ShowAllButton from '../../pages/CChainPages/LatestBlocksAndTransactionsList/ShowAllButton';

export default function XPTransactionList({
  ShowAllLink,
  children,
}: {
  ShowAllLink: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: '600px',
        backgroundColor: 'primary.dark',
        p: '1rem 1.5rem 1rem 1.5rem',
      }}
    >
      <ListTitle style={{ paddingBottom: '1.5rem' }}>
        Latest Transactions
      </ListTitle>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
      <ShowAllButton toLink={ShowAllLink} />
    </Paper>
  );
}

const ListTitle = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <Typography
      variant="h5"
      component="h5"
      fontWeight="fontWeightBold"
      sx={{ ...style }}
    >
      {children}
    </Typography>
  );
};
