import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainButton from '../../../components/MainButton';

const ShowAllButton = ({ toLink }: { toLink: string }) => {
  return (
    <Box
      sx={{
        marginTop: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link style={{ textDecoration: 'none' }} to={toLink}>
        <MainButton variant="outlined">
          <Typography
            variant="body2"
            component="span"
            fontWeight="fontWeightBold"
            sx={{ color: 'primary.contrastText' }}
          >
            Show All
          </Typography>
        </MainButton>
      </Link>
    </Box>
  );
};

export default ShowAllButton;
