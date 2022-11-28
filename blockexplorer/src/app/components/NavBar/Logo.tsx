import * as React from 'react';
import Box from '@mui/material/Box';
import { ReactComponent as LogoLight } from './assets/LightModeLogo.svg';
import { ReactComponent as LogoDark } from './assets/DarkModeLogo.svg';
import { ReactComponent as LogoCamino } from './assets/CaminoLogo.svg';
import { useTheme } from '@mui/material';
import useWidth from 'app/hooks/useWidth';

export default function Logo() {
  const theme = useTheme();
  const { isDesktop } = useWidth();
  const themeMode = theme.palette.mode === 'light' ? true : false;

  return (
    <Box>
      {!isDesktop ? (
        <LogoCamino style={{ width: '32px', height: '32px' }} />
      ) : themeMode ? (
        <LogoLight />
      ) : (
        <LogoDark />
      )}
    </Box>
  );
}
