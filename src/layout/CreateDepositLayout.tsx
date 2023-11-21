import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { Box, Toolbar } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useNavigate } from 'react-router'
import { Typography } from '@mui/material'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Links = () => {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue)
    return (
        <Box
            sx={{
                display: 'flex',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '1536px',
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                sx={{ '& .MuiTabs-indicator': { display: 'none' }, height: '61px' }}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
            >
                <Tab
                    className="tab"
                    disableRipple
                    label={
                        <Typography
                            sx={{
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                lineHeight: '20px',
                                color: theme => theme.palette.text.primary,
                            }}
                        >
                            Create new depositOffer
                        </Typography>
                    }
                    onClick={() => navigate('/settings')}
                    {...a11yProps(0)}
                    sx={{
                        display: 'flex',
                        padding: '10px 12px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        height: '61px',
                        '&::after': {
                            content: '""',
                            display: value === 0 ? 'block' : 'none',
                            width: '100%',
                            height: '4px',
                            position: 'absolute',
                            bottom: '0px',
                            borderRadius: '4px 4px 0px 0px',
                            background: '#0085FF',
                        },
                    }}
                />
            </Tabs>
        </Box>
    )
}
const CreateDepositsLayout = () => {
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
            <Outlet />
        </Box>
    )
}

export default CreateDepositsLayout
