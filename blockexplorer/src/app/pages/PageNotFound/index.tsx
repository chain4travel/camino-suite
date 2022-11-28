import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@mui/material';
import { ReactComponent as NotFound404 } from './assets/404.svg';
import MainButton from 'app/components/MainButton';
import AlignedContainer from 'app/components/AlignedContainer';

const NotFoundPage: FC = () => {
  const handleClick = () => {
    window.location.href = '/';
  };
  return (
    <AlignedContainer maxWidth="xl">
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="404" />
      </Helmet>
      <Grid
        sx={{ minHeight: '500px', gap: '20px' }}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <NotFound404 />
        <Typography
          variant="h3"
          sx={{ textAlign: 'center' }}
          fontWeight="fontWeightBold"
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="span"
          fontWeight="fontWeightBold"
          sx={{ textAlign: 'center' }}
        >
          The page your are looking for does not exist.
        </Typography>
        <MainButton variant="contained" onClick={handleClick}>
          Go to Homepage
        </MainButton>
      </Grid>
    </AlignedContainer>
  );
};

export default NotFoundPage;
