import { Box, BoxProps } from '@mui/material'

import React from 'react'

export default function XIcon({ ...other }: BoxProps) {
    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 20 6.857-6.857m0 0L16 20h4l-6.857-9.143m-2.286 2.286L4 4h4l5.143 6.857m0 0L20 4"
                ></path>
            </svg>
        </Box>
    )
}
