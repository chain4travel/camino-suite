import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router'

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
                height: '48px',
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
            >
                <Tab
                    className="tab"
                    disableRipple
                    label="Save account"
                    onClick={() => navigate('/settings')}
                    {...a11yProps(0)}
                    sx={{
                        alignItems: { xs: 'baseline', sm: 'self-start' },
                    }}
                />
                <Tab
                    className="tab"
                    disableRipple
                    label="Multisignature Wallet"
                    onClick={() => navigate('create-multisig')}
                    {...a11yProps(1)}
                    sx={{ alignItems: { xs: 'baseline', sm: 'self-start' } }}
                />
            </Tabs>
        </Box>
    )
}
