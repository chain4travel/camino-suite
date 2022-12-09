import { Theme } from '@mui/material/styles'

export default function TextField(theme: Theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        border: `1px solid ${theme.palette.divider}`,
                        fontWeight: theme.typography.fontWeightBold,
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightRegular,
                    // border: `1px solid ${theme.palette.divider}`,
                },
            },
        },
    }
}
