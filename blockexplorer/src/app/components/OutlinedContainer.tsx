import * as React from 'react';
import { Box } from '@mui/material';

export default function OutlinedContainer({
  children,
  transparent = true,
}: {
  children: React.ReactNode;
  transparent?: boolean;
}) {
  return (
    <Box
      sx={{
        backgroundColor: !transparent ? 'latestList.iconBackground' : '',
        border: transparent ? 'solid 1px' : '0px',
        borderColor: 'borders.main',
        borderRadius: '7px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}
