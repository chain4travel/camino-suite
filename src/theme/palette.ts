import { alpha } from '@mui/material/styles'

interface PaletteColorCustomOptions {
    primary?: string
    secondary?: string
    border?: string
    background?: string
    text?: string
}
declare module '@mui/material/styles/createPalette' {
    interface ColorTypes {
        primary: string
    }
    interface Palette {
        logo: ColorTypes
        card: PaletteColorCustomOptions
        blue: {
            [key in
                | '0'
                | '50'
                | '100'
                | '200'
                | '300'
                | '400'
                | '500'
                | '600'
                | '700'
                | '800'
                | '900']: string
        }
    }
    interface PaletteOptions {
        logo?: PaletteColorCustomOptions
        card?: PaletteColorCustomOptions
    }
    interface TypeBackground {
        secondary: string
        gradient: string
    }
}

declare module '@mui/material' {
    interface Color {
        0: string
        500_8: string
        500_12: string
        500_16: string
        500_24: string
        500_32: string
        500_48: string
        500_56: string
        500_80: string
    }
}

const PRIMARY = {
    main: '#F5F6FA',
    dark: '#F8FAFC',
    light: '#E2E8F0',
}
const SECONDARY = {
    main: '#0085ff',
    light: '#B440FC',
    dark: '#7E2DB0',
}
const INFO = {
    light: '#4BA6EE',
    main: '#3B86CB',
    dark: '#235696',
}
const SUCCESS = {
    light: '#457B3B',
    main: '#35E9AD',
    dark: '#2F5D28',
}
const WARNING = {
    light: '#F19D38',
    dark: '#D55C26',
    main: '#DD742D',
}
const ERROR = {
    light: '#C23F38',
    dark: '#B63831',
    main: '#DD5E56',
}
const GREY = {
    0: '#FFFFFF',
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
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
}

const BLUE = {
    0: '#FFFFFF',
    50: '#B5E3FD',
    100: '#A0D9FC',
    200: '#7BCFFB',
    300: '#56C4FA',
    400: '#0085FF',
    500: '#0061D5',
    600: '#0041A8',
    700: '#00297C',
    800: '#00144F',
    900: '#000022',
}

const COMMON = {
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY, contrastText: '#fff' },
    secondary: { ...SECONDARY, contrastText: '#fff' },
    info: { ...INFO, contrastText: '#fff' },
    success: { ...SUCCESS, contrastText: GREY[800] },
    warning: { ...WARNING, contrastText: GREY[800] },
    error: { ...ERROR, contrastText: '#fff' },
    grey: GREY,
    blue: BLUE,
    divider: GREY[500_24],
    action: {
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
}

const palette = {
    light: {
        ...COMMON,
        text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
        background: {
            paper: '#fff',
            default: GREY[200],
            neutral: GREY[200],
            secondary: GREY[0],
            gradient: 'linear-gradient(to right, #0085FF, #B440FC)',
        },
        action: { active: GREY[600], ...COMMON.action },
        button: { primary: GREY[200], secondary: GREY[100] },
        logo: { primary: BLUE[400] },
        border: {
            infoCard: '#B5E3FD',
        },
        card: {
            border: '#E2E7F0',
            borderSecondary: '#334155',
            background: '#FFFFFF',
            text: '#334155',
        },
    },
    dark: {
        ...COMMON,
        text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
        background: {
            paper: GREY[900],
            default: GREY[900],
            neutral: GREY[500_16],
            secondary: GREY[800],
            gradient: 'linear-gradient(to right, #0085FF, #B440FC)',
        },
        border: {
            infoCard: '#B5E3FD',
        },
        action: { active: GREY[500], ...COMMON.action },
        button: { primary: GREY[700], secondary: GREY[800] },
        logo: { primary: BLUE[50] },
        card: {
            border: '#334155',
            borderSecondary: '#E2E7F0',
            text: '#CBD4E2',
        },
    },
}

export default palette
