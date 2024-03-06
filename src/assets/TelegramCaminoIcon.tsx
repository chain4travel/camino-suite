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
                    d="m8.554 13.58-5.705-1.437c-1.045-.263-1.156-1.715-.163-2.136L18.987 3.09c.819-.347 1.694.357 1.54 1.238l-2.66 15.186a1.119 1.119 0 0 1-1.842.653L8.554 13.58Zm0 0 5.044-3.953"
                ></path>
            </svg>
        </Box>
    )
}
