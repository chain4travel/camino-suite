import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AccessLayout = () => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Outlet />
        </Box>
    )
}

export default AccessLayout
