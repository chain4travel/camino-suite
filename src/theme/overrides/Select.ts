import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Theme } from '@mui/material/styles'

export default function Select(theme: Theme) {
    return {
        MuiSelect: {
            defaultProps: {
                IconComponent: ExpandMoreIcon,
            },
            styleOverrides: {
                root: {
                    '& .MuiSvgIcon-root': {
                        fill: theme.palette.primary.light,
                    },
                },
                select: {
                    padding: '1rem',
                    paddingLeft: '.5rem',
                    '& + .MuiSvgIcon-root': { color: theme.palette.primary.light },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                list: {
                    maxWidth: 'none !important',
                    width: '100% !important',
                    paddingRight: '0 !important',
                },
            },
        },
    }
}
