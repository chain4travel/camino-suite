import { useTheme, useMediaQuery } from '@mui/material';

const useWidth = () => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isWideScreenDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isWidescreen = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isWideScreenDown,
    isWidescreen,
  };
};

export default useWidth;
