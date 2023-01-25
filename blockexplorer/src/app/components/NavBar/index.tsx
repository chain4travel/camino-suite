import * as React from 'react';
import { Box, Container, Toolbar, AppBar, useTheme } from '@mui/material';
import SearchInput from './SearchInput';
import Links from './Links';
import useWidth from 'app/hooks/useWidth';

export function NavBar() {
  const theme = useTheme();
  const { isDesktop } = useWidth();

  return (
    <>
      <AppBar
        sx={{
          borderBottom: '1px solid',
          borderColor: 'card.border',
          backgroundColor: 'card.navBar',
          borderRadius: '0px',
          backgroundImage: 'none',
          boxShadow: 'none',
          top: '65px',
          [theme.breakpoints.up('md')]: { top: '69px' },
        }}
        position="fixed"
      >
        <Container
          maxWidth="xl"
          sx={{
            width: '100%',
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
              backgroundColor: 'card.navBar',
              p: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              minHeight: 'auto',
              [theme.breakpoints.down('md')]: { p: '.5rem 1rem' },
              [theme.breakpoints.down('sm')]: { p: '.5rem .3rem' },
            }}
          >
            <Links />
            <Box
              sx={{
                display: 'flex',
                pr: '10px',
                ml: !isDesktop ? 'auto' : '0',
              }}
            >
              <SearchInput />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="relative"
        sx={{
          [theme.breakpoints.up('md')]: { minHeight: '81px' },
          minHeight: '65px',
          boxShadow: 'none',
        }}
      />
    </>
  );
}
