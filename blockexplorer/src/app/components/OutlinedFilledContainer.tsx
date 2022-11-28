import * as React from 'react';
import { Box, useTheme } from '@mui/material';

export default function OutlinedFilledContainer({
  children,
  transparent = true,
}: {
  children: React.ReactNode;
  transparent?: boolean;
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        border: theme.palette.mode === 'dark' ? 'solid 1px' : '0px',
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
