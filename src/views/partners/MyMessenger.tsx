import { ContentCopy } from '@mui/icons-material'
import { Box, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchBusinessFields, fetchPartners } from '../../redux/slices/partnersSlice/utils'

import Blockies from 'react-blockies'
import { useNavigate } from 'react-router'
import MainButton from '../../components/MainButton'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import useWalletBalance from '../../helpers/useWalletBalance'
import { selectPartnerData } from '../../redux/selectors/partners'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import { Configuration } from './Configuration'

const MyMessenger = () => {
    const { state, dispatch } = usePartnerConfigurationContext()
    const [bots, setBots] = useState([])
    const { getBalanceOfAnAddress } = useWalletBalance()
    const { contractCMAccountAddress, wallet } = useSmartContract()
    const { getListOfBots, sftAddress, sftName, sftSymbol } = usePartnerConfig()
    const partner = useAppSelector(rootState => selectPartnerData(rootState, '', wallet.address))
    const activeNetwork = useAppSelector(getActiveNetwork)
    useEffect(() => {
        if (activeNetwork) {
            dispatch(fetchPartners())
            dispatch(fetchBusinessFields())
        }
    }, [activeNetwork, dispatch])

    const appDispatch = useAppDispatch()

    async function fetchBots() {
        const res = await getListOfBots()
        setBots(res)
    }

    useEffect(() => {
        getBalanceOfAnAddress(contractCMAccountAddress)
    }, [contractCMAccountAddress])

    useEffect(() => {
        fetchBots()
    }, [])

    function getServicesNames(services) {
        if (!services || services.length === '0') return 'None.'
        let array = services.map(elem => {
            const parts = elem.name.split('.')
            let name = parts[parts.length - 1]
            name = name.endsWith('Service') ? name.slice(0, -7) : name
            return name // elem.name
        })
        let result = array.join(', ')
        return result
    }
    const navigate = useNavigate()
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}
            >
                <Configuration>
                    <Configuration.Title>
                        {partner?.attributes?.companyName} Messenger Account
                    </Configuration.Title>
                    <Configuration.Paragraphe>
                        In this page you are able to display and copy your Camino Messenger address.
                    </Configuration.Paragraphe>
                    <TextField
                        disabled
                        value={contractCMAccountAddress as string}
                        InputProps={{
                            sx: {
                                '& input': {
                                    fontSize: '16px',
                                },
                                '& input.Mui-disabled': {
                                    color: theme => theme.palette.text.primary,
                                    WebkitTextFillColor: theme => theme.palette.text.primary,
                                },
                            },
                            endAdornment: (
                                <MainButton
                                    endIcon={
                                        <ContentCopy
                                            sx={{
                                                color: theme =>
                                                    `${theme.palette.text.primary} !important`,
                                            }}
                                        />
                                    }
                                    variant="outlined"
                                    onClick={() => {
                                        navigator.clipboard.writeText(contractCMAccountAddress)
                                        appDispatch(
                                            updateNotificationStatus({
                                                message: 'Address copied to clipboard',
                                                severity: 'success',
                                            }),
                                        )
                                    }}
                                >
                                    Copy
                                </MainButton>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                        <Typography sx={{ flex: '0 0 20%' }} variant="body2">
                            Offered Services
                        </Typography>
                        <Typography variant="caption">
                            {state.stepsConfig[1]?.services.length > 0 ? (
                                getServicesNames(state.stepsConfig[1]?.services)
                            ) : (
                                <>
                                    None. Visit the relevant{' '}
                                    <Link
                                        sx={{
                                            cursor: 'pointer',
                                            color: theme => theme.palette.text.primary,
                                            textDecorationColor: 'inherit',
                                        }}
                                        onClick={() =>
                                            navigate('/partners/messenger-configuration/supplier')
                                        }
                                    >
                                        tab
                                    </Link>{' '}
                                    to add offered services
                                </>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                        <Typography sx={{ flex: '0 0 20%' }} variant="body2">
                            Wanted Services
                        </Typography>
                        <Typography variant="caption">
                            {state.stepsConfig[2]?.services.length > 0 ? (
                                getServicesNames(state.stepsConfig[2]?.services)
                            ) : (
                                <>
                                    None. Visit the relevant{' '}
                                    <Link
                                        sx={{
                                            cursor: 'pointer',
                                            color: theme => theme.palette.text.primary,
                                            textDecorationColor: 'inherit',
                                        }}
                                        onClick={() =>
                                            navigate(
                                                '/partners/messenger-configuration/distribution',
                                            )
                                        }
                                    >
                                        tab
                                    </Link>{' '}
                                    to add wanted services
                                </>
                            )}
                        </Typography>
                    </Box>
                    {/* <ServiceList
                        listName="Wanted Services"
                        services={state.stepsConfig[2]?.services.map(elem => elem.name)}
                    />
                    <ServiceList
                        listName="Offered Services"
                        services={state.stepsConfig[1]?.services.map(elem => elem.name)}
                    /> */}
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                        <Typography sx={{ flex: '0 0 20%' }} variant="body2">
                            Configured Bots
                        </Typography>
                        <Typography variant="caption">
                            {bots.length === 0 ? (
                                <>
                                    None. Visit the relevant{' '}
                                    <Link
                                        sx={{
                                            cursor: 'pointer',
                                            color: theme => theme.palette.text.primary,
                                            textDecorationColor: 'inherit',
                                        }}
                                        onClick={() =>
                                            navigate('/partners/messenger-configuration/bots')
                                        }
                                    >
                                        tab
                                    </Link>{' '}
                                    to add bots
                                </>
                            ) : (
                                <>
                                    You have {bots.length} configured{' '}
                                    {bots.length === 1 ? 'bot.' : 'bots.'}
                                </>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Typography sx={{ flex: '0 0 20%' }} variant="body2">
                            Blockchain Transaction Fee Currency
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Typography variant="caption">CAM</Typography>
                        </Box>
                    </Box>

                    {/* Messenger fee currency */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Typography sx={{ flex: '0 0 20%' }} variant="body2">
                            Messenger Fee Currency
                        </Typography>
                        {sftAddress ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Blockies
                                    seed={sftAddress.toLowerCase()}
                                    size={8}
                                    scale={3}
                                    style={{
                                        borderRadius: 8,
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                                <Typography variant="caption">
                                    {sftName} ({sftSymbol})
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="caption">Loading...</Typography>
                        )}
                    </Box>
                </Configuration>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Configuration.Infos
                        information="To top up, transfer the wanted amount of an accepted currency to the Camino Messenger address from any Wallet (on C-Chain)."
                        infos={[
                            'You can send tokens out to any wallet by pressing the Withdraw button and filling the form to initiate a transfer.',
                            'Manage the accepted currencies by selecting them in the list.',
                            'To manage bots, services offered or wanted, click on the respective tabs above.',
                        ]}
                    ></Configuration.Infos>
                </Box>
            </Box>
        </>
    )
}

export default MyMessenger
