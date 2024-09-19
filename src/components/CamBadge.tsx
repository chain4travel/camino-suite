import { Box, SxProps, Typography } from '@mui/material'
import React from 'react'

const getVariantStyles = (variant: string) => {
    switch (variant) {
        case 'primary':
            return {
                background: '#0085FF33',
                color: '#0085FF',
            }
        case 'positive':
            return {
                background: '#09DE6B33',
                color: '#18B728',
            }
        case 'warning':
            return {
                background: '#E5A21F33',
                color: '#E5A21F',
            }
        case 'negative':
            return {
                background: '#E5431F33',
                color: '#E5431F',
            }
        case 'verified':
            return {
                background: '#B5E3FD',
                color: '#1E293B',
            }
        default:
            return {
                background: '#1E293B',
                color: '#CBD4E2',
            }
    }
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


    
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                paddingX: '8px',
                paddingY: '1px',
                borderRadius: '4px',
                ...getSizeStyles(size),
                ...getVariantStyles(variant),
                ...sx,
            }}
        >
            <Typography variant="overline" fontWeight={600}>
                {label}
            </Typography>
        </Box>
    )
}

export default CamBadge
