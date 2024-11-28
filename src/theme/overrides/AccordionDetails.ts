import { Theme } from '@mui/material/styles'

export default function AccordionDetails(theme: Theme) {
    return {
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    border: '0px',
                },
            },
        },
    }
}
