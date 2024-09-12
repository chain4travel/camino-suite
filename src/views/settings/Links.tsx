import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useNavigate } from 'react-router'
import store from 'wallet/store'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { changeActiveApp } from '../../redux/slices/app-config'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function Links({ type = 'else' }: { type?: string }) {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(0)
    const [secondValue, setSecondValue] = useState(0)
    const navigate = useNavigate()
    const path = window.location.pathname
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (type === 'subtabs') {
            setSecondValue(newValue)
        } else setValue(newValue)
    }
    useEffect(() => {
        if (path === '/settings') setValue(0)
        else if (path === '/settings/manage-multisig') setValue(1)
        else if (path === '/settings/verify-wallet') setValue(2)
        else if (path === '/partners') setValue(0)
        else if (path.includes('partners/messenger-configuration')) setValue(1)
        else if (path.includes('overview')) setSecondValue(0)
        else if (path.includes('distribution')) setSecondValue(1)
        else if (path.includes('supply')) setSecondValue(2)
        else setValue(0)
        dispatch(changeActiveApp('Network'))
    }, [path]) // eslint-disable-line react-hooks/exhaustive-deps
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const sc = useSmartContract()
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
            onClick={() => navigate('/partners')}
            className="tab"
            disableRipple
            label="Partner showroom"
            {...a11yProps(0)}
            key={0}
            sx={{ '&::after': { display: value === 0 ? 'block' : 'none' } }}
        />,
        auth && store.state.activeWallet?.type !== 'multisig' && (
            <Tab
                onClick={() => navigate('/partners/messenger-configuration')}
                className="tab"
                disableRipple
                label="My Partners Profile"
                {...a11yProps(1)}
                key={1}
                sx={{ '&::after': { display: value === 1 ? 'block' : 'none' } }}
            />
        ),
    ]

    const partnersSubTabs = [
        <Tab
            onClick={() => navigate('/partners/messenger-configuration/messenger')}
            className="tab"
            disableRipple
            label="My Messenger Account"
            {...a11yProps(0)}
            key={0}
            sx={{ '&::after': { display: secondValue === 0 ? 'block' : 'none' } }}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/supplier')}
            className="tab"
            disableRipple
            label="Offered Services"
            {...a11yProps(1)}
            key={1}
            sx={{ '&::after': { display: secondValue === 1 ? 'block' : 'none' } }}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/distribution')}
            className="tab"
            disableRipple
            label="Wanted Services"
            {...a11yProps(2)}
            key={2}
            sx={{ '&::after': { display: secondValue === 2 ? 'block' : 'none' } }}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/bots')}
            className="tab"
            disableRipple
            label="Manage Bots"
            {...a11yProps(3)}
            key={3}
            sx={{ '&::after': { display: secondValue === 3 ? 'block' : 'none' } }}
        />,
    ]

    if (type === 'subtabs')
        return (
            <Box sx={{ display: 'flex', cursor: 'pointer', width: '100%', maxWidth: '1536px' }}>
                <Tabs
                    value={secondValue}
                    onChange={handleChange}
                    sx={{ '& .MuiTabs-indicator': { display: 'none' }, height: '61px' }}
                    scrollButtons="auto"
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    {partnersSubTabs.map((tab, index) => (tab ? tab : null))}
                </Tabs>
            </Box>
        )
    return (
        <Box sx={{ display: 'flex', cursor: 'pointer', width: '100%', maxWidth: '1536px' }}>
            <Tabs
                value={type === 'subtabs' ? secondValue : value}
                onChange={handleChange}
                sx={{
                    '& .MuiTabs-indicator': { display: 'none' },
                    height: '61px',
                }}
                textColor="text.primary"
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
            >
                {type === 'subtabs'
                    ? partnersSubTabs.map((tab, index) => (tab ? tab : null))
                    : path.includes('/partners')
                    ? partnersTabs.map((tab, index) => {
                          return tab
                      })
                    : settingsTabs.map((tab, index) => (tab ? tab : null))}
            </Tabs>
        </Box>
    )
}
