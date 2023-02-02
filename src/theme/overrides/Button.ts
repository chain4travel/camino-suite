import { alpha, Theme } from '@mui/material/styles'

export default function Button(theme: Theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    borderWidth: '1.5px',
                    borderRadius: theme.shape.borderRadiusSm,
                    '&:hover': {
                        borderWidth: '1.5px',
                    },
                },
                contained: {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: alpha(theme.palette.secondary.main, 0.7),
                    },
                },
                outlined: {
                    border: `1.5px solid ${theme.palette.secondary.main}`,
                    color: theme.palette.text.primary,
                    '&:hover': {
                        borderColor: theme.palette.secondary.main,
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    },
                },
                '&.Mui-disabled': {
                    cursor: 'not-allowed',
                },
            },
        },
    }
}
