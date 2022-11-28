import React, { FC } from 'react';
import { Paper } from '@mui/material';

interface BlockCardProps {
  ref?: React.Ref<HTMLTableRowElement>;
  children: React.ReactNode;
}

const FilledCard: FC<BlockCardProps> = ({ ref, children }) => {
  return (
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
      ref={ref}
    >
      {children}
    </Paper>
  );
};

export default FilledCard;
