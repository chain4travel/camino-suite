import { Box, Button, Link, Toolbar, Typography } from '@mui/material'

import { Paper } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import store from 'wallet/store'
import { PartnerConfigurationProvider } from '../helpers/partnerConfigurationContext'
import { SmartContractProvider } from '../helpers/useSmartContract'
import { useAppSelector } from '../hooks/reduxHooks'
import { useFetchPartnerDataQuery, useIsPartnerQuery } from '../redux/services/partners'
import { getWalletName } from '../redux/slices/app-config'
import { getActiveNetwork } from '../redux/slices/network'
import Links from '../views/settings/Links'

const ClaimProfile = () => {
    const generateEmail = () => {
        const subject = 'Claim a Partner'
        const body = `This is to claim a Partner record and associate it to the wallet with C-Chain address ${
            '0x' + store.state.activeWallet.ethAddress
        }. Please add your name, contact details, the Partner name, and attach any evidence of your affiliation with the Partner.`
        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
            subject,
        )}&body=${encodeURIComponent(body)}`
        window.location.href = mailtoLink
    }
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
                To manage and configure your Camino Messenger, you need to claim a Partner record
                first.
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
                Contact the Camino Network Foundation via{' '}
                <Link
                    component="a"
                    sx={{
                        color: theme => theme.palette.text.primary,
                        textDecorationColor: 'inherit',
                    }}
                    onClick={generateEmail}
                >
                    email
                </Link>{' '}
                to proceed.
            </Typography>
            <Button
                onClick={generateEmail}
                sx={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg, #0085FF 0%, #B440FC 100%)',
                    backgroundColor: theme =>
                        theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                }}
            >
                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                    Contact
                </Typography>
            </Button>
        </Box>
    )
}

const PartnersLayout = () => {
    const path = window.location.pathname
    const { data, isLoading, refetch } = useIsPartnerQuery({
        cChainAddress: store?.state?.activeWallet?.ethAddress
            ? '0x' + store?.state?.activeWallet?.ethAddress
            : '',
    })
    let { partnerID } = useParams()
    const { data: partner, refetch: refetchPartenrData } = useFetchPartnerDataQuery({
        companyName: partnerID,
    })
    const walletName = useAppSelector(getWalletName)
    const navigate = useNavigate()
    const activeNetwork = useAppSelector(getActiveNetwork)
    useEffect(() => {
        if (activeNetwork) {
            refetch()
            refetchPartenrData()
        }
    }, [activeNetwork])
    useEffect(() => {
        if (
            walletName &&
            path.includes('partners/messenger-configuration') &&
            store.state.activeWallet?.type === 'multisig'
        ) {
            navigate('/')
        }
    }, [walletName])

    const partnerCChainAddress = useMemo(() => {
        let cAddress = data?.attributes?.cChainAddresses.find(
            elem => elem.Network === activeNetwork.name.toLowerCase(),
        )
        if (cAddress) return cAddress
        return ''
    }, [data])
    if (isLoading) return <></>
    if (
        path.includes('partners/messenger-configuration') &&
        !store.state.isAuth &&
        (activeNetwork.name.toLowerCase() !== 'columbus' ||
            activeNetwork.name.toLowerCase() !== 'camino')
    ) {
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
                    {((path.includes('partners/messenger-configuration') &&
                        !!data &&
                        partnerCChainAddress) ||
                        (partner &&
                            partner?.contractAddress &&
                            partnerID === partner.attributes.companyName)) && (
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
                            <Links type="subtabs" partner={partner} />
                        </Toolbar>
                    )}
                    <Box
                        sx={{
                            mt:
                                (path.includes('partners/messenger-configuration') &&
                                    !!data &&
                                    partnerCChainAddress) ||
                                (path !== '/partners' && partner?.contractAddress)
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
                        (path.includes('partners/messenger-configuration') &&
                            !!data &&
                            partnerCChainAddress) ? (
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
