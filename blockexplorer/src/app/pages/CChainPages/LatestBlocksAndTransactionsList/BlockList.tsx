import React, { FC } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { BlockTableData } from 'types/block';
import Divider from '@mui/material/Divider';
import ShowAllButton from './ShowAllButton';
import BlockItem from './Items/BlockItem';

interface BlockListProps {
  title: string;
  items: BlockTableData[];
  to: string;
}

const BlockList: FC<BlockListProps> = ({ title, items, to }) => {
  return (
    <Paper
      variant="outlined"
      square
      sx={{
        backgroundColor: 'primary.dark',
        borderWidth: '1px',
        borderColor: 'primary.light',
        borderStyle: 'solid',
        p: '1rem 1.5rem 1rem 1.5rem',
      }}
    >
      {title && (
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          sx={{ paddingBottom: '1rem' }}
        >
          {title}
        </Typography>
      )}
      {items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BlockItem block={item} to={to} />
              {index !== items.length - 1 && <Divider variant="fullWidth" />}
            </React.Fragment>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: '560px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <ShowAllButton toLink="blocks" />
    </Paper>
  );
};

export default BlockList;
