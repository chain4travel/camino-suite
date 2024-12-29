import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Alert from '../../components/Alert'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useFetchPartnerDataQuery } from '../../redux/services/partners'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import { Configuration } from './Configuration'

export const BasicManageBots = () => {
    const { partnerID } = useParams()
    const { data: partner, refetch } = useFetchPartnerDataQuery({
        companyName: partnerID,
    })
    const activeNetwork = useAppSelector(getActiveNetwork)
    useEffect(() => {
        if (activeNetwork) refetch()
    }, [activeNetwork])
    const navigate = useNavigate()
    if (!partner) return <></>

    if (partner && !partner?.contractAddress) navigate('/partners')
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
            }}
        >
            <Configuration>
                <Configuration.Title>Bots</Configuration.Title>
                <Configuration.Paragraphe>
                    This page lists all bot addresses registered to this Messenger Account.
                    {partner && partner.bots && partner?.bots?.length === 0 && (
                        <>
                            <br />
                            <br />
                            No bot addresses are currently registered with this Messenger Account.
                        </>
                    )}
                </Configuration.Paragraphe>
                {partner.bots &&
                    partner.bots.length > 0 &&
                    partner.bots.map((bot, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid #1E293B',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            padding: '6px 12px',
                                            gap: '6px',
                                            borderRadius: '8px',
                                            border: '1px solid #475569',
                                            backgroundColor: theme =>
                                                theme.palette.mode === 'dark'
                                                    ? '#0F182A'
                                                    : '#F1F5F9',
                                            borderWidth: '1px',
                                            '&:hover': {
                                                borderWidth: '1px',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        variant="caption"
                                    >
                                        Bot
                                    </Typography>
                                    <TextField
                                        disabled
                                        value={bot}
                                        sx={{ flexGrow: '1' }}
                                        InputProps={{
                                            sx: {
                                                '& input': {
                                                    fontSize: '16px',
                                                },
                                                '& input.Mui-disabled': {
                                                    color: theme => theme.palette.text.primary,
                                                    WebkitTextFillColor: theme =>
                                                        theme.palette.text.primary,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        )
                    })}
            </Configuration>
        </Box>
    )
}

const ManageBots = () => {
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [address, setAddress] = useState('')
    const [bots, setBots] = useState([])
    const [loading, setLoading] = useState(false)
    const handleAddressChange = e => {
        const newAddress = e.target.value
        setAddress(newAddress)
        setIsValidAddress(ethers.isAddress(newAddress))
    }
    const appDispatch = useAppDispatch()

    const { addMessengerBot, getListOfBots, removeMessengerBot } = usePartnerConfig()

    async function fetchBots() {
        setLoading(true)
        const res = await getListOfBots()
        setLoading(false)
        setBots(res)
    }
    useEffect(() => {
        fetchBots()
    }, [])
    const handleAddBot = () => {
        if (isValidAddress) {
            setLoading(true)
            addMessengerBot(address).then(async () => {
                setAddress('')
                await fetchBots()
                appDispatch(
                    updateNotificationStatus({
                        message: 'Bot added successfully',
                        severity: 'success',
                    }),
                )
            })
        }
    }
    const handleRemoveBot = address => {
        setLoading(true)
        removeMessengerBot(address).then(async () => {
            await fetchBots()
            appDispatch(
                updateNotificationStatus({
                    message: 'Bot removed successfully',
                    severity: 'success',
                }),
            )
        })
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
            }}
        >
            <Configuration>
                <Configuration.Title>Manage Bots</Configuration.Title>
                <Configuration.Paragraphe>
                    List in this page the addresses of all bots using this Messenger Account.
                </Configuration.Paragraphe>
                {loading && (
                    <Box sx={{ position: 'relative', height: '106px' }}>
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    </Box>
                )}
                {bots &&
                    bots.length > 0 &&
                    bots.map((bot, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid #1E293B',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            padding: '6px 12px',
                                            gap: '6px',
                                            borderRadius: '8px',
                                            border: '1px solid #475569',
                                            backgroundColor: theme =>
                                                theme.palette.mode === 'dark'
                                                    ? '#0F182A'
                                                    : '#F1F5F9',
                                            borderWidth: '1px',
                                            '&:hover': {
                                                borderWidth: '1px',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        variant="caption"
                                    >
                                        Bot
                                    </Typography>
                                    <TextField
                                        disabled
                                        value={bot}
                                        sx={{ flexGrow: '1' }}
                                        InputProps={{
                                            sx: {
                                                '& input': {
                                                    fontSize: '16px',
                                                },
                                                '& input.Mui-disabled': {
                                                    color: theme => theme.palette.text.primary,
                                                    WebkitTextFillColor: theme =>
                                                        theme.palette.text.primary,
                                                },
                                            },
                                        }}
                                        onChange={handleAddressChange}
                                    />
                                    <Button
                                        disabled={loading}
                                        variant="contained"
                                        onClick={() => handleRemoveBot(bot)}
                                        sx={{
                                            padding: '6px 12px',
                                            gap: '6px',
                                            borderRadius: '8px',
                                            border: '1px solid #475569',
                                            borderWidth: '1px',
                                            '&:hover': {
                                                borderWidth: '1px',
                                                boxShadow: 'none',
                                            },
                                        }}
                                    >
                                        <Typography variant="caption">Remove</Typography>
                                    </Button>
                                </Box>
                            </Box>
                        )
                    })}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #1E293B',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <Typography
                            sx={{
                                padding: '6px 12px',
                                gap: '6px',
                                borderRadius: '8px',
                                border: '1px solid #475569',
                                borderWidth: '1px',
                                '&:hover': {
                                    borderWidth: '1px',
                                    boxShadow: 'none',
                                },
                            }}
                            variant="caption"
                        >
                            Bot
                        </Typography>
                        <TextField
                            value={address}
                            InputProps={{
                                sx: {
                                    '& input': {
                                        fontSize: '16px',
                                    },
                                },
                            }}
                            sx={{
                                flexGrow: '1',
                            }}
                            onChange={handleAddressChange}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddBot}
                            disabled={!isValidAddress || loading}
                            sx={{
                                padding: '6px 12px',
                                gap: '6px',
                                borderRadius: '8px',
                                border: '1px solid #475569',
                                borderWidth: '1px',
                                '&:hover': {
                                    borderWidth: '1px',
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            <Typography variant="caption">Add</Typography>
                        </Button>
                    </Box>
                    {address !== '' && !isValidAddress && (
                        <Alert variant="negative" content="Invalid C-Chain address" />
                    )}
                </Box>
            </Configuration>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Configuration.Infos information="Check with your IT departments for the C-Chain address of each bot, and keep the list updated in case of changes."></Configuration.Infos>
            </Box>
        </Box>
    )
}

export default ManageBots
