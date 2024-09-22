import { Box, SxProps, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import React from 'react'

const getVariantStyles = (variant: string, theme: string) => {
    const isDark = theme === 'dark'

    const defaultStyles = {
        primary: {
            background: 'rgba(0, 133, 255, 0.2)',
            color: 'var(--camino-brand-too-blue-to-be-true)',
        },
        positive: {
            background: isDark ? 'rgba(9, 222, 107, 0.2)' : 'var(--camino-success-light)',
            color: isDark ? 'var(--camino-success-light)' : '#ffff',
        },
        warning: {
            background: isDark ? 'rgba(229, 162, 31, 0.2)' : 'var(--camino-warning-light)',
            color: isDark ? 'var(--camino-warning-light)' : '#ffff',
        },
        negative: {
            background: isDark ? 'rgba(229, 67, 31, 0.2)' : 'var(--camino-error-light)',
            color: isDark ? 'var(--camino-error-light)' : '#ffff',
        },
        verified: {
            background: 'var(--camino-aphrodite-aqua)',
            color: 'var(--tailwind-slate-slate-800)',
        },
        default: {
            background: 'var(--tailwind-slate-slate-800)',
            color: 'var(--tailwind-slate-slate-300)',
        },
    }

    return defaultStyles[variant] || defaultStyles.default
}

const getSizeStyles = (size: string) => {
    switch (size) {
        case 'small':
            return {
                fontSize: '10px',
            }
        default:
            return {
                fontSize: '12px',
            }
    }
}

const CamBadge = ({
    variant = 'default',
    label,
    size = 'medium',
    sx,
}: {
    variant?: 'default' | 'primary' | 'positive' | 'warning' | 'negative' | 'verified'
    label: string
    size?: 'small' | 'medium'
    sx?: SxProps
}) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                paddingX: '8px',
                paddingY: '1px',
                borderRadius: '4px',
                ...getVariantStyles(variant, theme.palette.mode),
                ...sx,
            }}
        >
            <Typography variant="overline" fontWeight={600} sx={getSizeStyles(size)}>
                {label}
            </Typography>
        </Box>
    )
}

export default CamBadge
