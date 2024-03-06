import { Box, BoxProps } from '@mui/material'

import React from 'react'

export default function TelegramCaminoIcon({ ...other }: BoxProps) {
    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7.554 11.58-5.705-1.437C.804 9.88.693 8.428 1.686 8.007L17.987 1.09c.819-.347 1.694.357 1.54 1.238L18.094 10.5m-10.54 1.08 5.044-3.953m-5.044 3.954L9.164 13M19 20.002v-6m0 6 2.4 1.8a1 1 0 0 0 1.6-.8v-8a1 1 0 0 0-1.6-.8l-2.4 1.8m0 6h-3m3-6h-4a3 3 0 0 0 0 6h1m0 0v3"
                ></path>
            </svg>
        </Box>
    )
}
