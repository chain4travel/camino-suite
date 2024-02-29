import { Box, BoxProps } from '@mui/material'

import React from 'react'

export default function GithubIcon({ ...other }: BoxProps) {
    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 21v-2a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 3 5 3 5 3c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 10c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85m0 0v2m0-2c-4.51 2-5-2-7-2"
                ></path>
            </svg>
        </Box>
    )
}
