import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import store from 'wallet/store'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { changeActiveApp } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function Links({ type = 'else', partner }: { type?: string; partner?: any }) {
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
    const theme = useTheme()
    useEffect(() => {
        if (path === '/settings') setValue(0)
        else if (path === '/settings/manage-multisig') setValue(1)
        else if (path === '/settings/verify-wallet') setValue(2)
        else if (path === '/partners') setValue(0)
        else if (path.includes('partners/messenger-configuration')) {
            setValue(1)
            if (path.includes('mymessenger')) setSecondValue(1)
            else if (path.includes('mydetails')) setSecondValue(0)
            else if (path.includes('distribution')) setSecondValue(3)
            else if (path.includes('supply')) setSecondValue(2)
            else if (path.includes('bots')) setSecondValue(4)
        } else setValue(0)
        dispatch(changeActiveApp('Network'))
    }, [path]) // eslint-disable-line react-hooks/exhaustive-deps
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const sc = useSmartContract()
    const activeNetwork = useAppSelector(getActiveNetwork)
    const tabStyle = (index: number, currentValue: number) => ({
        '&::after': { display: currentValue === index ? 'block' : 'none' },
        color: currentValue === index ? theme.palette.text.primary : 'inherit',
        '&.Mui-selected': {
            color: theme.palette.text.primary,
        },
    })
    let { partnerID } = useParams()
    const settingsTabs = [
        <Tab
            className="tab"
            disableRipple
            label="Save account"
            onClick={() => navigate('/settings')}
            {...a11yProps(0)}
            key={0}
            sx={tabStyle(0, value)}
        />,
        <Tab
            className="tab"
            disableRipple
            label="Multisignature Wallet"
            onClick={() => navigate('manage-multisig')}
            {...a11yProps(1)}
            key={1}
            sx={tabStyle(1, value)}
        />,
        <Tab
            className="tab"
            disableRipple
            label="Verify Wallet"
            onClick={() => navigate('verify-wallet')}
            {...a11yProps(2)}
            key={2}
            sx={tabStyle(2, value)}
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
            sx={tabStyle(0, value)}
        />,
        auth &&
            store.state.activeWallet?.type !== 'multisig' &&
            activeNetwork.name.toLowerCase() === 'columbus' && (
                <Tab
                    onClick={() => navigate('/partners/messenger-configuration')}
                    className="tab"
                    disableRipple
                    label="My Partners Profile"
                    {...a11yProps(1)}
                    key={1}
                    sx={tabStyle(1, value)}
                />
            ),
    ]

    const partnersSubTabs = [
        <Tab
            onClick={() => navigate('/partners/messenger-configuration/mydetails')}
            className="tab"
            disableRipple
            label="My Details"
            {...a11yProps(0)}
            key={0}
            sx={tabStyle(0, secondValue)}
        />,
        <Tab
            onClick={() => navigate('/partners/messenger-configuration/mymessenger')}
            className="tab"
            disableRipple
            label="My Messenger Account"
            {...a11yProps(1)}
            key={1}
            sx={tabStyle(1, secondValue)}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/supplier')}
            className="tab"
            disableRipple
            label="Offered Services"
            {...a11yProps(2)}
            key={2}
            sx={tabStyle(2, secondValue)}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/distribution')}
            className="tab"
            disableRipple
            label="Wanted Services"
            {...a11yProps(3)}
            key={3}
            sx={tabStyle(3, secondValue)}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/bots')}
            className="tab"
            disableRipple
            label="Manage Bots"
            {...a11yProps(4)}
            key={4}
            sx={tabStyle(4, secondValue)}
        />,
    ]

    const partnersSubTabsGuest = [
        <Tab
            onClick={() => navigate('/partners/' + partnerID)}
            className="tab"
            disableRipple
            label="Details"
            {...a11yProps(0)}
            key={0}
            sx={tabStyle(0, secondValue)}
        />,
        <Tab
            onClick={() => navigate('/partners/' + partnerID + '/supplier')}
            className="tab"
            disableRipple
            label="Offered Services"
            {...a11yProps(1)}
            key={1}
            sx={tabStyle(1, secondValue)}
        />,
        <Tab
            onClick={() => navigate('/partners/' + partnerID + '/distribution')}
            className="tab"
            disableRipple
            label="Wanted Services"
            {...a11yProps(2)}
            key={2}
            sx={tabStyle(2, secondValue)}
        />,
        <Tab
            disabled={!!!sc?.contractCMAccountAddress}
            onClick={() => navigate('/partners/messenger-configuration/bots')}
            className="tab"
            disableRipple
            label="Bots"
            {...a11yProps(3)}
            key={3}
            sx={tabStyle(3, secondValue)}
        />,
    ]

    if (type === 'subtabs')
        return (
            <Box sx={{ display: 'flex', cursor: 'pointer', width: '100%', maxWidth: '1536px' }}>
                <Tabs
                    value={secondValue}
                    onChange={handleChange}
                    sx={{
                        '& .MuiTabs-indicator': { display: 'none' },
                        height: '61px',
                        '& .Mui-selected': { color: 'black' },
                    }}
                    scrollButtons="auto"
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    {partner?.contractAddress.toLocaleLowerCase() ===
                        sc?.contractCMAccountAddress.toLocaleLowerCase() ||
                    path.includes('partners/messenger-configuration')
                        ? partnersSubTabs.map((tab, index) => (tab ? tab : null))
                        : partnersSubTabsGuest.map((tab, index) => (tab ? tab : null))}
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
                    '& .Mui-selected': { color: 'black' },
                }}
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
