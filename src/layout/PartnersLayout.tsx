import { Box, Toolbar } from '@mui/material'

import React from 'react'
import { Outlet } from 'react-router'
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
                    p: '1.5rem',
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
            <Box
                sx={{
                    mt: '5rem',
                    height: '100%',
                    width: '100%',
                    maxWidth: theme => theme.customWidth.layoutMaxWitdh,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default PartnersLayout
