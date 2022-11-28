import React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { Status } from 'types';

interface LoadingWrapperProps {
  loading: Status;
  children: React.ReactNode;
  failedLoadingMsg?: string;
  loadingBoxStyle?: React.CSSProperties;
}

export default function LoadingWrapper({
  loading,
  failedLoadingMsg,
  children,
  loadingBoxStyle,
}: LoadingWrapperProps) {
  if (loading === Status.SUCCEEDED) {
    return <>{children}</>;
  } else if (loading === Status.FAILED) {
    return (
      <Typography
        variant="h4"
        component="h4"
        fontWeight="fontWeightBold"
        sx={{ color: 'card.subValue' }}
      >
        {failedLoadingMsg}
      </Typography>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...loadingBoxStyle,
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }
}
