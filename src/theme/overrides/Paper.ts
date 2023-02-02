import { Theme } from '@mui/material/styles'

export default function Paper(theme: Theme) {
    return {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },

            styleOverrides: {
                root: {
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                    borderRadius: theme.shape.borderRadiusSm,
                    overflow: 'hidden',
                    backgroundImage: 'none',
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                },
            },
        },
    }
}
