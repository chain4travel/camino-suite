import { Box, Button, Link, Toolbar, Typography } from '@mui/material'

import { Paper } from '@mui/material'
import React, { useEffect } from 'react'
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
        const body = `This is to claim a Partner record and associate it to the wallet with C-Chain address .Please add your name, contact details, the Partner name, and attach any evidence of your affiliation with the Partner.`

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
                Contact the Camino Network Foundation via <Link onClick={generateEmail}>email</Link>{' '}
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
    const { data, isLoading } = useIsPartnerQuery({
        cChainAddress: store?.state?.activeWallet?.ethAddress
            ? '0x' + store?.state?.activeWallet?.ethAddress
            : '',
    })
    let { partnerID } = useParams()
    const { data: partner } = useFetchPartnerDataQuery({
        companyName: partnerID,
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

    const activeNetwork = useAppSelector(getActiveNetwork)
    if (isLoading) return <></>
    if (
        path.includes('partners/messenger-configuration') &&
        !store.state.isAuth &&
        activeNetwork.name.toLowerCase() !== 'columbus'
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
                        data?.attributes?.cChainAddress) ||
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
                                    data?.attributes?.cChainAddress) ||
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
                            data?.attributes?.cChainAddress) ? (
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
