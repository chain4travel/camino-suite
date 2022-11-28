import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, useTheme } from '@mui/material';
import Logo from './Logo';
import SearchInput from './SearchInput';
import ThemeSwitcherButton from './ThemeSwitcherButton';
import NetworkSelect from './NetworkSelect';
import Links from './Links';
import Drawer from './Drawer';
import useWidth from 'app/hooks/useWidth';

export function NavBar() {
  const theme = useTheme();
  const { isDesktop } = useWidth();
  const themeMode = theme.palette.mode === 'light' ? true : false;

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        transition: 'box-shadow 0s',
        boxShadow: `0px 1px 3px ${themeMode ? '#eeeeee' : '#424242'}`,
        backgroundColor: 'primary.dark',
        backgroundImage: 'none',
        borderRadius: '0px',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: '0px !important',
          paddingRight: '0px !important',
          marginBottom: '0px',
          marginTop: '0px',
          gap: '0px',
          '@media (max-width: 899px)': {
            marginTop: '0px',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            height: 'auto',
            backgroundColor: 'primary.dark',
            p: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            minHeight: 'auto',
            [theme.breakpoints.down('md')]: {
              padding: '1rem 0.5rem',
            },
          }}
        >
          <Box sx={{ display: 'flex' }}>
            {!isDesktop && <Drawer />}
            <Link to="/" aria-label="logo image">
              <Logo />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', marginLeft: !isDesktop ? 'auto' : '0' }}>
            <SearchInput />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              [theme.breakpoints.down('md')]: {
                gap: '0.5rem',
              },
            }}
          >
            <NetworkSelect />
            <ThemeSwitcherButton />
          </Box>
        </Toolbar>
        {isDesktop && <Links />}
      </Container>
    </AppBar>
  );
}
