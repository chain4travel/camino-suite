import React, { FC } from 'react';
import BackButton from 'app/components/BackButton';
import { Grid, Typography } from '@mui/material';
import { To } from 'react-router-dom';

interface SubPageTitleProps {
  title: string;
  backToLink: To;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const SubPageTitle: FC<SubPageTitleProps> = ({
  title,
  backToLink,
  style,
  children,
}) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style,
      }}
      spacing={2}
    >
      <Grid item xs sm={4} lg={2} order={1}>
        <BackButton backToLink={backToLink} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        lg={8}
        justifyContent="center"
        order={{ xs: 3, sm: 2 }}
      >
        <Typography
          variant="h5"
          component="h5"
          fontWeight="fontWeightBold"
          sx={{ textAlign: 'center', display: 'grid' }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs sm={4} lg={2} order={{ xs: 2, sm: 3 }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default SubPageTitle;
