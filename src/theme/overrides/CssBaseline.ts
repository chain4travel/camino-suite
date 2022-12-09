import { Theme } from '@mui/material/styles'

export default function CssBaseline(theme: Theme) {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: theme.palette.background.default,
                },
            },
        },
    }
}
