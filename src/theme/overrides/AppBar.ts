import { Theme } from '@mui/material/styles'

export default function AppBar(theme: Theme) {
    return {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: theme.shape.borderRadiusNone,
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    border: 'none !important',
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider} !important`,
                    zIndex: 10,
                },
            },
        },
    }
}
