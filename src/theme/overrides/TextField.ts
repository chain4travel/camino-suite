import { Theme } from '@mui/material/styles'

export default function TextField(theme: Theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
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
                    '&.Mui-focused': {
                        color: theme.palette.text.primary,
                    },
                },
            },
        },
    }
}
