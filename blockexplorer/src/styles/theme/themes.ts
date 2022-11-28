import { Palette } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import '../fonts.css';

const grey = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  A100: '#F5F5F5',
  A200: '#EEEEEE',
  A400: '#DBDBDB',
  A700: '#616161',
};

interface PaletteWithCustomColors extends Palette {
  card: {
    background: string;
    border: string;
    title: string;
    subValue: string;
    contrastText: string;
  };
  latestList: {
    iconBackground: string;
    iconColor: string;
    blockNumber: string;
    timestamp: string;
    contrastText: string;
  };
  link: {
    color: string;
    hover: string;
    active: string;
  };
  radioButton: {
    main: string;
  };
  borders: {
    main: string;
  };
  titleCard: {
    background: string;
    border: string;
  };
  searchResultItem: {
    bg_CB: string;
    bg_AD: string;
    bg_CT: string;
    bg_PT: string;
    bg_XT: string;
    bg_PAD: string;
    bg_XAD: string;
  };
}

export const LightThemePalette: Partial<PaletteWithCustomColors> = {
  mode: 'light',
  primary: {
    main: '#F5F6FA',
    dark: '#F8FAFC',
    light: '#E2E8F0',
    contrastText: '#0F172A',
  },
  secondary: {
    main: '#149EED',
    light: '#B440FC',
    dark: '#7E2DB0',
    contrastText: '#0F172A',
  },
  error: {
    light: '#C23F38',
    dark: '#B63831',
    main: '#DD5E56',
    contrastText: '#0F172A',
  },
  warning: {
    light: '#F19D38',
    dark: '#D55C26',
    main: '#DD742D',
    contrastText: '#0F172A',
  },
  info: {
    light: '#4BA6EE',
    main: '#3B86CB',
    dark: '#235696',
    contrastText: '#0F172A',
  },
  success: {
    light: '#457B3B',
    main: '#35E9AD',
    dark: '#2F5D28',
    contrastText: '#0F172A',
  },
  grey: grey,
  card: {
    background: '#F8FAFC',
    border: '#CBD5E1',
    title: '#0F172A',
    subValue: '#334155',
    contrastText: '#0F172A',
  },
  latestList: {
    iconBackground: '#E2E8F0',
    iconColor: '#2E3134',
    blockNumber: '#149EED',
    timestamp: '#334155',
    contrastText: '#0F172A',
  },
  radioButton: {
    main: '#149EED',
  },
  borders: {
    main: '#CBD5E1',
  },
  titleCard: {
    background: '#F8FAFC',
    border: '#CBD5E1',
  },
  searchResultItem: {
    bg_CB: '#149EED',
    bg_AD: '#21BA45',
    bg_CT: '#31CCEC',
    bg_PT: '#35E9AD',
    bg_XT: '#B440FC',
    bg_PAD: '#F19D38',
    bg_XAD: '#31CCEC',
  },
};

export const DarkThemePalette: Partial<PaletteWithCustomColors> = {
  mode: 'dark',
  primary: {
    main: '#0F172A',
    dark: '#0F172A',
    light: '#1E293B',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#149EED',
    light: '#B440FC',
    dark: '#7E2DB0',
    contrastText: '#0F172A',
  },
  error: {
    light: '#DD5E56',
    dark: '#B63831',
    main: '#C23F38',
    contrastText: '#FFFFFF',
  },
  warning: {
    light: '#F19D38',
    dark: '#D55C26',
    main: '#DD742D',
    contrastText: '#FFFFFF',
  },
  info: {
    light: '#4BA6EE',
    main: '#3B86CB',
    dark: '#235696',
    contrastText: '#FFFFFF',
  },
  success: {
    light: '#35E9AD',
    main: '#35E9AD',
    dark: '#2F5D28',
    contrastText: '#FFFFFF',
  },
  grey: grey,
  card: {
    background: '#0F172A',
    border: '#64748B',
    title: '#64748B',
    subValue: '#64748B',
    contrastText: '#FFFFFF',
  },
  latestList: {
    iconBackground: '#1E293B',
    iconColor: '#FFFFFF',
    blockNumber: '#149EED',
    timestamp: '#64748B',
    contrastText: '#0F172A',
  },
  radioButton: {
    main: '#FFFFFF',
  },
  borders: {
    main: '#1E293B',
  },
  titleCard: {
    background: '#1E293B',
    border: '#64748B',
  },
  searchResultItem: {
    bg_CB: '#149EED',
    bg_AD: '#21BA45',
    bg_CT: '#31CCEC',
    bg_PT: '#35E9AD',
    bg_XT: '#B440FC',
    bg_PAD: '#F19D38',
    bg_XAD: '#31CCEC',
  },
};

const defaultTheme = {
  typography: {
    fontSize: 16,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '96px',
      lineHeight: '96px',
      letterSpacing: '-2px',
      fontWeight: '400',
    },
    h2: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '60px',
      lineHeight: '60px',
      letterSpacing: '-0.5px',
      fontWeight: '400',
    },
    h3: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '48px',
      lineHeight: '50px',
      fontWeight: '400',
    },
    h4: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '34px',
      lineHeight: '40px',
      fontWeight: '400',
    },
    h5: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '24px',
      lineHeight: '32px',
    },
    h6: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '150%',
    },
    subtitle1: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '28px',
    },
    subtitle2: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '-0.25px',
    },
    body1: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
    },
    body2: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.528px',
    },
    caption: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
};

const defaultComponents = {
  MuiSelect: {
    styleOverrides: {
      select: {
        padding: '0.5rem 0rem',
        fontSize: '1rem',
        lineheight: '1.5rem',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '7px',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        padding: '0rem',
        textTransform: 'capitalize' as const,
      },
      indicator: {
        backgroundColor: 'transparent',
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        position: 'relative' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        margin: 'auto',
        flex: 1,
        marginTop: '140px',
        gap: '20px',
        marginBottom: '30px',
        '@media (max-width: 899px)': {
          marginTop: '100px',
        },
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        '@media (max-width: 400px)': {
          width: '0.75em',
          height: '0.75em',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderWidth: '1.5px',
        '&:hover': {
          borderWidth: '1.5px',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: LightThemePalette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#E2E8F0',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
        },
        notchedOutline: {
          borderColor: '#CBD5E1 !important',
          borderWidth: '1px !important',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(#E2E8F0, #E2E8F0)',
          borderRadius: '0px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#E2E8F0',
          fontSize: '0.6875rem',
        },
      },
    },
    ...defaultComponents,
  },
  ...defaultTheme,
});

export const darkTheme = createTheme({
  palette: DarkThemePalette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0F172A',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
        },
        notchedOutline: {
          borderColor: '#1E293B !important',
          borderWidth: '1px !important',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(#0F172A, #0F172A)',
          borderRadius: '0px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1E293B',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          fontSize: '0.6875rem',
        },
      },
    },
    ...defaultComponents,
  },
  ...defaultTheme,
});
