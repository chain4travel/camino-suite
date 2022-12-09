import { Theme } from '@mui/material/styles'

export default function Modal(theme: Theme) {
    return {
        MuiModal: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& > .MuiBox-root': {
                        backgroundColor: theme.palette.background.paper,
                        width: '90%',
                        maxWidth: '480px',
                        outline: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        [theme.breakpoints.up('md')]: {
                            width: '100%',
                            maxWidth: '480px',
                        },
                    },
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    // backgroundColor: alpha(theme.palette.background.default, 0.5),
                },
            },
        },
    }
}
