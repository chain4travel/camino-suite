import { Box, BoxProps } from '@mui/material'

import React from 'react'

export default function LinkedInIconIcon({ ...other }: BoxProps) {
    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 11v5m8 0v-3c0-.667-.4-2-2-2s-2 1.333-2 2m0 3v-3m0 0v-2M8 8h.01M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
                ></path>
            </svg>
        </Box>
    )
}
