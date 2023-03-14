import { Theme } from '@mui/material/styles'

export default function DialogActions(theme: Theme) {
    return {
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(3),
                },
            },
        },
    }
}
