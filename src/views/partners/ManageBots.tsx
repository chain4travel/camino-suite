import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import Alert from '../../components/Alert'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { Configuration } from './Configuration'

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
            addMessengerBot(address).then(() => {
                setAddress('')
                fetchBots()
            })
        }
    }
    const handleRemoveBot = address => {
        setLoading(true)
        removeMessengerBot(address).then(() => fetchBots())
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
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                    eget dolor. Aenean massa. Donec sociis natoque penatibus.
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
                                        variant="outlined"
                                        onClick={() => handleRemoveBot(bot)}
                                        sx={{
                                            padding: '6px 12px',
                                            gap: '6px',
                                            borderRadius: '8px',
                                            border: '1px solid #475569',
                                            backgroundColor: theme =>
                                                theme.palette.mode === 'dark'
                                                    ? '#020617'
                                                    : '#F1F5F9',
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
                                backgroundColor: theme =>
                                    theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
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
                            variant="outlined"
                            onClick={handleAddBot}
                            disabled={!isValidAddress || loading}
                            sx={{
                                padding: '6px 12px',
                                gap: '6px',
                                borderRadius: '8px',
                                border: '1px solid #475569',
                                backgroundColor: theme =>
                                    theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
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
                <Configuration.Infos
                    information="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address. Once the process is complete, your Camino Messenger address will appear on your partner detail page, allowing you to communicate directly with other Camino Messenger accounts."
                    rackRates="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address."
                ></Configuration.Infos>
            </Box>
        </Box>
    )
}

export default ManageBots
