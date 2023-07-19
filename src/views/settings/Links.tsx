import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router'
import { Typography } from '@mui/material'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function Links() {
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
                            Save account
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
                {/* <Tab
                    className="tab"
                    disableRipple
                    label="Multisignature Wallet"
                    onClick={() => navigate('create-multisig')}
                    {...a11yProps(1)}
                    sx={{ alignItems: { xs: 'baseline', sm: 'self-start' } }}
                /> */}
            </Tabs>
        </Box>
    )
}
