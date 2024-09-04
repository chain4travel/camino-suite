import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { changeActiveApp } from '../../redux/slices/app-config'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function Links() {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
    const path = window.location.pathname
    const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue)
    useEffect(() => {
        if (path === '/settings') setValue(0)
        else if (path === '/settings/manage-multisig') setValue(1)
        else if (path === '/settings/verify-wallet') setValue(2)
        else setValue(0)
        dispatch(changeActiveApp('Network'))
    }, [path]) // eslint-disable-line react-hooks/exhaustive-deps

    const settingsTabs = [
        <Tab
            className="tab"
            disableRipple
            label="Save account"
            onClick={() => navigate('/settings')}
            {...a11yProps(0)}
            key={0}
            sx={{ '&::after': { display: value === 0 ? 'block' : 'none' } }}
        />,
        <Tab
            className="tab"
            disableRipple
            label="Multisignature Wallet"
            onClick={() => navigate('manage-multisig')}
            {...a11yProps(1)}
            key={1}
            sx={{ '&::after': { display: value === 1 ? 'block' : 'none' } }}
        />,
        <Tab
            className="tab"
            disableRipple
            label="Verify Wallet"
            onClick={() => navigate('verify-wallet')}
            {...a11yProps(2)}
            key={2}
            sx={{ '&::after': { display: value === 2 ? 'block' : 'none' } }}
        />,
    ]

    const partnersTabs = [
        <Tab
            className="tab"
            disableRipple
            label="Partner showroom"
            {...a11yProps(0)}
            key={0}
            sx={{ '&::after': { display: value === 0 ? 'block' : 'none' } }}
        />,
    ]

    return (
        <Box sx={{ display: 'flex', cursor: 'pointer', width: '100%', maxWidth: '1536px' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                sx={{ '& .MuiTabs-indicator': { display: 'none' }, height: '61px' }}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
            >
                {path.includes('/partners')
                    ? partnersTabs.map((tab, index) => (tab ? tab : null))
                    : settingsTabs.map((tab, index) => (tab ? tab : null))}
            </Tabs>
        </Box>
    )
}
