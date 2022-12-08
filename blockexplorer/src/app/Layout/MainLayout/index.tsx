import React, { useContext, useEffect, useState } from 'react';
import { NavBar } from 'app/components/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Typography, Box, CircularProgress, Container } from '@mui/material';
import {
  getActiveNetwork,
  selectAllChains,
  selectNetworkStatus,
  changeNetwork,
} from 'store/app-config';
import { Footer } from 'app/components/Footer';
import { Status } from 'types';
import { getChains } from 'api';
import PageContainer from 'app/components/PageContainer';
import MainButton from 'app/components/MainButton';
import { useTheme } from '@mui/material';
import { ColorModeContext } from '../../../styles/theme/ThemeProvider';
import { selectedTheme } from '../../../store/app-config';

const Content: React.FC = () => {
  const chains = useAppSelector(selectAllChains);
  const status = useAppSelector(selectNetworkStatus);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(changeNetwork('Columbus'));
  };
  if (status === Status.LOADING || status === Status.IDLE)
    return (
      <Container fixed maxWidth="xl">
        <CircularProgress
          color="secondary"
          size={75}
          style={{ margin: 'auto', display: 'block' }}
        />
      </Container>
    );
  else if (status === Status.SUCCEEDED && chains?.length > 0) return <Outlet />;
  return (
    <PageContainer pageTitle="Error" metaContent="An error has occurred">
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Typography
          variant="h4"
          component="span"
          fontWeight="fontWeightBold"
          sx={{ color: 'error.light' }}
        >
          Something went wrong, Please Again!
        </Typography>
        <MainButton variant="contained" onClick={handleClick}>
          Switch to Columbus Network
        </MainButton>
      </Box>
    </PageContainer>
  );
};

export default function MainLayout() {
  const activeNetwork = useAppSelector(getActiveNetwork);
  const dispatch = useAppDispatch();
  const themeContext = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (load) setLoad(false);
    else if (activeNetwork === 'mainnet-testnet')
      navigate(`${BASE_PATH}/mainnet`);
    else navigate('/');
    dispatch(getChains());
  }, [activeNetwork]); // eslint-disable-line
  const currentTheme = useAppSelector(selectedTheme);
  useEffect(() => {
    themeContext?.toggleColorMode(currentTheme);
  }, [currentTheme]);
  return (
    <>
      <Box sx={{ marginBottom: '20px' }}>
        <NavBar />
      </Box>
      <Content />
      <Footer />
    </>
  );
}
