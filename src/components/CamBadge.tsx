import { Box, SxProps } from '@mui/material'

import { useTheme } from '@mui/system'
import React from 'react'

const VARIANT_STYLES = {
    primary: {
        background: 'rgba(0, 133, 255, 0.2)',
        color: 'var(--camino-brand-too-blue-to-be-true)',
    },
    positive: {
        dark: {
            background: 'rgba(9, 222, 107, 0.2)',
            color: 'var(--camino-success-light)',
        },
        light: {
            background: 'var(--camino-success-light)',
            color: '#ffff',
        },
    },
    warning: {
        dark: {
            background: 'rgba(229, 162, 31, 0.2)',
            color: 'var(--camino-warning-light)',
        },
        light: {
            background: 'var(--camino-warning-light)',
            color: '#ffff',
        },
    },
    negative: {
        dark: {
            background: 'rgba(229, 67, 31, 0.2)',
            color: 'var(--camino-error-light)',
        },
        light: {
            background: 'var(--camino-error-light)',
            color: '#ffff',
        },
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

const getVariantStyles = (variant: string, themeMode: string) => {
    const isDark = themeMode === 'dark'
    const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.default

    if (styles.dark && styles.light) {
        return isDark ? styles.dark : styles.light
    }
    return styles
}

const SIZE_STYLES = {
    small: {
        fontSize: '10px',
    },
    medium: {
        fontSize: '12px',
    },
}

const getSizeStyles = (size: string) => SIZE_STYLES[size] || SIZE_STYLES.medium

interface CamBadgeProps {
    variant?: 'default' | 'primary' | 'positive' | 'warning' | 'negative' | 'verified'
    label: string
    size?: 'small' | 'medium'
    sx?: SxProps
    'data-testid'?: string
}

const CamBadge: React.FC<CamBadgeProps> = ({
    variant = 'default',
    label,
    size = 'medium',
    sx,
    'data-testid': dataTestId,
}) => {
    const theme = useTheme()

    return (
        <Box
            className="CamBadge MuiChip-root"
            sx={{
                display: 'flex',
                alignItems: 'center',
                paddingX: '8px',
                paddingY: '1px',
                borderRadius: '4px',
                ...getVariantStyles(variant, theme.palette.mode),
                ...sx,
            }}
            data-testid={dataTestId}
        >
            <span
                style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    lineHeight: '16px',
                    letterSpacing: '1.6px',
                    textTransform: 'uppercase',
                    fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
                    fontFeatureSettings: '"ss01" on',
                    ...getSizeStyles(size),
                }}
            >
                {label}
            </span>
        </Box>
    )
}

export default CamBadge
