import { Box, Link, Toolbar, Typography } from '@mui/material'

import { Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import store from 'wallet/store'
import { PartnerConfigurationProvider } from '../helpers/partnerConfigurationContext'
import { SmartContractProvider } from '../helpers/useSmartContract'
import { useAppSelector } from '../hooks/reduxHooks'
import { useIsPartnerQuery } from '../redux/services/partners'
import { getWalletName } from '../redux/slices/app-config'
import Links from '../views/settings/Links'

const ClaimProfile = () => {
    const emailAddress = 'foundation@camino.network'
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                height: '100%',
            }}
        >
            <Typography variant="h5">Claim a profile</Typography>
            <Typography variant="body2" textAlign={'center'}>
                To manage and configure your Camino Messenger, you need to claim an account.
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
                Contact the Camino Network Foundation via{' '}
                <Link href={`mailto:${emailAddress}`} target="_blank" rel="noopener noreferrer">
                    email
                </Link>{' '}
                to proceed.
            </Typography>
        </Box>
    )
}

const PartnersLayout = () => {
    const path = window.location.pathname
    const { data, isLoading } = useIsPartnerQuery({
        cChainAddress: store?.state?.activeWallet?.ethAddress
            ? '0x' + store?.state?.activeWallet?.ethAddress
            : '',
    })
    const walletName = useAppSelector(getWalletName)
    const navigate = useNavigate()
    useEffect(() => {
        if (
            walletName &&
            path.includes('partners/messenger-configuration') &&
            store.state.activeWallet?.type === 'multisig'
        ) {
            navigate('/')
        }
    }, [walletName])
    if (isLoading) return <></>
    if (path.includes('partners/messenger-configuration') && !store.state.isAuth) {
        return <Navigate to="/login" replace />
    }
    return (
        <SmartContractProvider>
            <PartnerConfigurationProvider>
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
                    {path.includes('partners/messenger-configuration') && !!data && (
                        <Toolbar
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'rgba(145, 158, 171, 0.24)',
                                background: theme => theme.palette.background.paper,
                                flexGrow: 1,
                                p: '1.5rem',
                                zIndex: 9,
                                position: 'fixed',
                                top: '129px',
                                width: '100vw',
                                height: '61px',
                                display: 'flex',
                                justifyContent: 'center',
                                right: 0,
                            }}
                        >
                            <Links type="subtabs" />
                        </Toolbar>
                    )}
                    <Box
                        sx={{
                            mt:
                                path.includes('partners/messenger-configuration') && !!data
                                    ? '9rem'
                                    : '5rem',
                            height: '100%',
                            width: '100%',
                            maxWidth: theme => theme.customWidth.layoutMaxWitdh,
                            mb: '2rem',
                            padding: '32px',
                        }}
                        component={Paper}
                    >
                        {!path.includes('partners/messenger-configuration') ||
                        (path.includes('partners/messenger-configuration') && !!data) ? (
                            <Outlet />
                        ) : (
                            <ClaimProfile />
                        )}
                    </Box>
                </Box>
            </PartnerConfigurationProvider>
        </SmartContractProvider>
    )
}

export default PartnersLayout
