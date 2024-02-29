import { Box, BoxProps } from '@mui/material'

import React from 'react'

export default function DiscordIcon({ ...other }: BoxProps) {
    return (
        <Box {...other}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 16.925 6 20c-1.5 0-3.333-1.667-4-3-1-2-.5-5.833 1.5-11.5L8 4l1 2s2.195-.5 3-.5c.805 0 3 .5 3 .5l1-2 4.5 1.5C22.5 11.167 23 15 22 17c-.667 1.333-2.5 3-4 3l-3-3.075m-6 0c-1.856-.139-3-.425-3-.425m3 .425c.598.045 2.27.075 3 .075s2.402-.03 3-.075m0 0c1.856-.139 3-.425 3-.425M8 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                ></path>
            </svg>
        </Box>
    )
}
