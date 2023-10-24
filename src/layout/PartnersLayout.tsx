import React from 'react'
import { Outlet } from 'react-router'
import { Box, Toolbar } from '@mui/material'
import Links from '../views/settings/Links'
const PartnersLayout = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Toolbar
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'rgba(145, 158, 171, 0.24)',
                    background: theme => theme.palette.background.paper,
                    flexGrow: 1,
                    px: '0rem !important',
                    zIndex: 9,
                    position: 'fixed',
                    top: '65px',
                    width: '100vw',
                    height: '61px',
                    display: 'flex',
                    justifyContent: 'center',
                    right: 0,
                }}
            >
                <Links />
            </Toolbar>
            <Outlet />
        </Box>
    )
}

export default PartnersLayout
