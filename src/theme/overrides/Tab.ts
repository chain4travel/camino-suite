import { Theme } from '@mui/material/styles'

//TODO need to be fixed the theme is not used there
export default function Tab(theme: Theme) {
    return {
        MuiTab: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    padding: '10px 12px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    height: '61px',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: '20px',
                    color: theme => theme.palette.text.primary,
                    '&::after': {
                        content: '""',
                        width: '100%',
                        height: '4px',
                        position: 'absolute',
                        bottom: '0px',
                        borderRadius: '4px 4px 0px 0px',
                        background: '#0085FF',
                    },
                    '&.Mui-selected': {
                        color: '#fff',
                    },
                },
            },
        },
    }
}
