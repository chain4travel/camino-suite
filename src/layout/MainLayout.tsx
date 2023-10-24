import { Backdrop, CircularProgress, Paper, Typography } from '@mui/material'
import { Box, Toolbar, useTheme } from '@mui/material'
import React, { useState } from 'react'
import {
    addNetworks,
    changeActiveNetwork,
    changeLoading,
    changeNetworkStatus,
} from '../redux/slices/network'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Notifications from '../components/Notification'
import { Status } from '../@types'
import { changeActiveApp } from '../redux/slices/app-config'
import { matchNetworkStatus } from '../utils/componentsUtils'
import store from 'wallet/store'
import { useAppDispatch } from '../hooks/reduxHooks'
import { useEffect } from 'react'
import { useEffectOnce } from '../hooks/useEffectOnce'
import { useLocation } from 'react-router-dom'
import useNetwork from '../hooks/useNetwork'
import { useStore } from 'Explorer/useStore'

const MainLayout = ({ children }) => {
    const [loadNetworks, setLoadNetworks] = useState(true)
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const { updateNetworks, changeNetworkExplorer } = useStore()
    const { loading } = useNetwork()
    const location = useLocation()
    const init = async () => {
        dispatch(changeLoading(true))
        if (location.pathname.split('/')[1] === 'wallet') dispatch(changeActiveApp('Wallet'))
        else if (location.pathname.split('/')[1] === 'explorer')
            dispatch(changeActiveApp('Explorer'))
        else if (location.pathname.split('/')[1] === 'partners')
            dispatch(changeActiveApp('Partners'))

        dispatch(changeNetworkStatus(Status.LOADING))
        await store.dispatch('Network/init')
        await store.dispatch('Assets/initErc20List')
        await store.dispatch('Assets/ERCNft/init')
        await store.dispatch('updateAvaxPrice')
        let networks = store.getters['Network/allNetworks']
        dispatch(addNetworks(networks))
        let selectedNetwork = store.state.Network.selectedNetwork
            ? store.state.Network.selectedNetwork
            : networks[1]
        dispatch(changeActiveNetwork(selectedNetwork))
        dispatch(changeNetworkStatus(matchNetworkStatus(store.state.Network.status)))
        updateNetworks(networks)
        changeNetworkExplorer(selectedNetwork)
        setLoadNetworks(false)
        dispatch(changeLoading(false))
    }
    useEffectOnce(() => {
        init()
    })

    useEffect(() => {
        const html = document.documentElement
        if (loading || loadNetworks) html.style.overflow = 'hidden'
        else html.style.overflow = 'auto'
    }, [loading, loadNetworks])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Navbar />
                <Notifications />
                <Toolbar
                    sx={{
                        minHeight: '65px !important',
                        p: '0px !important',
                        [theme.breakpoints.up('md')]: { minHeight: '69px !important' },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 'calc(80vh - 69px)',
                        padding: '0 1.5rem',
                    }}
                >
                    {!loadNetworks && <>{children}</>}
                </Box>
                <Footer />
            </Box>
            {(loading || loadNetworks) && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'fixed',
                            padding: '20px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            minHeight: '200px',
                            maxWidth: '500px',
                        }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontSize: '1.25rem !important',
                                mb: theme => theme.spacing(3),
                                textAlign: 'center',
                            }}
                        >
                            {!loadNetworks
                                ? `Connecting to a new network, please wait.`
                                : `Loading networks, please wait.`}
                        </Typography>
                        <Typography variant="caption" gutterBottom sx={{ textAlign: 'center' }}>
                            This will only take a few seconds. Please do not close the window.
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                mt: theme => theme.spacing(4),
                            }}
                        >
                            <CircularProgress
                                size={50}
                                thickness={2}
                                sx={{ color: 'var(--camino-brand-too-blue-to-be-true)' }}
                            />
                        </Box>
                    </Paper>
                </Backdrop>
            )}
        </>
    )
}

export default MainLayout
