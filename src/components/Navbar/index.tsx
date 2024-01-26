import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material'
import { DRAWER_WIDTH, TIMEOUT_DURATION } from '../../constants/apps-consts'
import React, { useState } from 'react'
import { mdiClose, mdiMenu, mdiWalletOutline } from '@mdi/js'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import Account from './Account'
import Icon from '@mdi/react'
import LoggedInAccount from './LoggedInAccount'
import MHidden from '../@material-extend/MHidden'
import MIconButton from '../@material-extend/MIconButton'
import NetworkSwitcher from './NetworkSwitcher'
import PlatformSwitcher from '../PlatformSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { getActiveNetwork } from '../../redux/slices/network'
import store from 'wallet/store'
import { updateAccount } from '../../redux/slices/app-config'
import { updateAuthStatus } from '../../redux/slices/utils'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const theme = useTheme()
    const activeNetwork = useAppSelector(getActiveNetwork)
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const navigate = useNavigate()

    const [openSidebar, setOpenSidebar] = useState(false)
    const handleCloseSidebar = () => {
        setOpenSidebar(false)
    }
    const handleOpenSidebar = () => {
        setOpenSidebar(true)
    }
    const dispatch = useAppDispatch()

    const onIdle = async () => {
        if (auth && window.location.hostname !== 'localhost') {
            await store.dispatch('logout')
            dispatch(updateAccount(null))
            dispatch(updateAuthStatus(false))
        }
    }

    const navigateToLogin = () => {
        navigate('/login')
        handleCloseSidebar()
    }

    useIdleTimer({
        onIdle,
        timeout: TIMEOUT_DURATION,
    })

    return (
        <AppBar
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                minHeight: '65px',
                px: '1.5rem !important',
            }}
            position="fixed"
        >
            <Toolbar
                sx={{
                    width: '100%',
                    maxWidth: 'xl',
                    display: 'flex',
                    height: 'auto',
                    p: '0',
                    gap: '1rem',
                    px: '0px !important',
                    alignItems: 'normal',
                    justifyContent: 'space-between',
                }}
            >
                <PlatformSwitcher />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    {/* Mobile */}
                    <MHidden width="smUp">
                        {!auth && (
                            <Box
                                onClick={navigateToLogin}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                <Icon path={mdiWalletOutline} size={1} />
                            </Box>
                        )}
                        <Drawer
                            anchor="right"
                            ModalProps={{ keepMounted: true }}
                            open={openSidebar}
                            onClose={handleCloseSidebar}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: DRAWER_WIDTH,
                                    maxWidth: '100%',
                                    bgcolor: theme.palette.background.secondary,
                                    justifyContent: 'space-between',
                                },
                                '& .MuiPaper-root': { border: 'none', pb: '1rem' },
                                borderRadius: '0',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ padding: theme.spacing(2) }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ThemeSwitcher />
                                        <IconButton onClick={navigateToLogin}>
                                            <Icon path={mdiWalletOutline} size={1} />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <MIconButton onClick={handleCloseSidebar}>
                                        <Icon path={mdiClose} size={1} />
                                    </MIconButton>
                                </Stack>
                                {activeNetwork && (
                                    <NetworkSwitcher handleCloseSidebar={handleCloseSidebar} />
                                )}
                            </Box>
                            {auth && <Account handleCloseSidebar={handleCloseSidebar} />}
                        </Drawer>
                        <MIconButton onClick={handleOpenSidebar}>
                            <Icon path={mdiMenu} size={1} />
                        </MIconButton>
                    </MHidden>
                    {/* Desktop */}
                    <MHidden width="smDown">
                        <>
                            {!auth && <ThemeSwitcher />}
                            {activeNetwork && <NetworkSwitcher />}
                            {!auth ? (
                                <Box
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Icon path={mdiWalletOutline} size={1} />
                                    <Typography variant="body2" component="span">
                                        Login
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <LoggedInAccount />
                                    <Account handleCloseSidebar={handleCloseSidebar} />
                                </>
                            )}
                        </>
                    </MHidden>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
