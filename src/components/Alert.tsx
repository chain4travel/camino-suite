import { Box, SxProps, Typography } from '@mui/material'
import React from 'react'

const Alert = ({
    variant,
    title,
    content,
    sx,
}: {
    variant: 'info' | 'negative' | 'warning'
    title?: string
    content: string
    sx?: SxProps
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '14px',
                padding: '16px',
                border: '1px solid',
                borderColor:
                    variant === 'info'
                        ? 'rgba(0, 133, 255, 0.5)'
                        : variant === 'warning'
                        ? 'rgba(229, 162, 31, 0.5)'
                        : 'rgba(229, 67, 31, 0.5)',
                background:
                    variant === 'info'
                        ? 'rgba(0, 133, 255, 0.05)'
                        : variant === 'warning'
                        ? 'rgba(229, 162, 31, 0.05)'
                        : 'rgba(229, 67, 31, 0.05)',
                borderRadius: '6px',
                maxWidth: '350px',
                ...sx,
                ...(!title && { alignItems: 'center' }),
            }}
        >
            <Box sx={{ ...(!title && { display: 'flex', alignItems: 'center' }) }}>
                {variant === 'info' && (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22ZM11 7H13V9H11V7ZM14 17H10V15H11V13H10V11H13V15H14V17Z"
                            fill="#0085FF"
                        />
                    </svg>
                )}
                {variant === 'negative' && (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                            fill="#E5431F"
                        />
                    </svg>
                )}
                {variant === 'warning' && (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" fill="#E5A21F" />
                    </svg>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {title && (
                    <Typography variant="body2" fontWeight={600}>
                        {title}
                    </Typography>
                )}
                {content && <Typography variant="caption">{content}</Typography>}
            </Box>
        </Box>
    )
}

export default Alert
