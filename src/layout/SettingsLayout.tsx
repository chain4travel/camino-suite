import React from 'react'
import { Outlet } from 'react-router'
import { Box, Toolbar } from '@mui/material'
import Links from '../views/settings/Links'
const SettingsLayout = () => {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(145, 158, 171, 0.24)',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Toolbar sx={{ flexGrow: 1, maxWidth: '1536px', px: '0rem !important' }}>
                    <Links />
                </Toolbar>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem 1.5rem',
                    flex: 1,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default SettingsLayout
