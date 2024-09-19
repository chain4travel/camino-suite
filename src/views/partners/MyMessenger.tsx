import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { ContentCopy, RefreshOutlined } from '@mui/icons-material'
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    IconButton,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material'
import { ethers } from 'ethers'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Alert from '../../components/Alert'
import DialogAnimate from '../../components/Animate/DialogAnimate'
import MainButton from '../../components/MainButton'
import ServiceList from '../../components/Partners/ServiceList'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import useWalletBalance from '../../helpers/useWalletBalance'
import { useFetchPartnerDataQuery } from '../../redux/services/partners'
import { Configuration } from './Configuration'

const AmountInput = ({ amount, onAmountChange, onMaxAmountClick, maxAmount }) => {
    const handleChange = e => {
        const newAmount = e.target.value
        if (newAmount === '' || /^\d*\.?\d*$/.test(newAmount)) {
            onAmountChange(newAmount)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <Typography
                    sx={{
                        flex: '0 0 15%',
                        padding: '6px 12px',
                        gap: '6px',
                        borderRadius: '8px',
                        border: '1px solid #475569',
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
                        borderWidth: '1px',
                    }}
                    variant="caption"
                >
                    Amount
                </Typography>
                <OutlinedInput
                    value={amount}
                    onChange={handleChange}
                    inputProps={{
                        inputMode: 'decimal',
                        pattern: '[0-9]*',
                    }}
                    sx={theme => ({
                        width: '100%',
                        height: '40px',
                        p: '8px 16px',
                        border: `solid 1px ${theme.palette.card.border}`,
                        borderRadius: '12px',
                        fontSize: '14px',
                        lineHeight: '24px',
                        fontWeight: 500,
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    })}
                />
                <Button
                    variant="contained"
                    onClick={onMaxAmountClick}
                    sx={{
                        flex: '0 0 16%',
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
                    <Typography variant="caption">Max</Typography>
                </Button>
            </Box>
            <Typography variant="caption" sx={{ alignSelf: 'flex-end' }}>
                Max available: {maxAmount} CAM
            </Typography>
        </Box>
    )
}

const AddressInput = ({ address, onAddressChange, onMyAddressClick }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <Typography
                sx={{
                    padding: '6px 12px',
                    gap: '6px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    backgroundColor: theme =>
                        theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
                    borderWidth: '1px',
                    flex: '0 0 15%',
                }}
                variant="caption"
            >
                To Address
            </Typography>
            <OutlinedInput
                value={address}
                onChange={e => onAddressChange(e.target.value)}
                sx={theme => ({
                    width: '100%',
                    height: '40px',
                    p: '8px 16px',
                    border: `solid 1px ${theme.palette.card.border}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                })}
            />
            <Button
                variant="contained"
                onClick={onMyAddressClick}
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
                    flex: '0 0 16%',
                }}
            >
                <Typography variant="caption">My Address</Typography>
            </Button>
        </Box>
    )
}

const CamWithdraw = () => {
    const { wallet, contractCMAccountAddress } = useSmartContract()
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [loading, setLoading] = useState(false)
    const [amountError, setAmountError] = useState('')
    const { withDraw } = usePartnerConfig()
    const { getBalanceOfAnAddress, balanceOfAnAddress: balance } = useWalletBalance()

    const maxAmount = useMemo(() => {
        const balanceParsed = parseFloat(balance)
        if (isNaN(balanceParsed)) {
            return '0.00'
        }
        return Math.max(balanceParsed - 100, 0).toFixed(2)
    }, [balance])

    const handleAddressChange = useCallback(newAddress => {
        setAddress(newAddress)
        setIsValidAddress(ethers.isAddress(newAddress))
    }, [])

    const handleAmountChange = useCallback(
        newAmount => {
            setAmount(newAmount)
            validateAmount(newAmount)
        },
        [maxAmount],
    )

    const validateAmount = useCallback(
        value => {
            const numValue = parseFloat(value)
            const maxValue = parseFloat(maxAmount)
            if (value === '') {
                setAmountError('')
            } else if (isNaN(numValue) || numValue <= 0) {
                setAmountError('Amount must be greater than 0')
            } else if (numValue > maxValue) {
                setAmountError(`Amount cannot exceed ${maxAmount}`)
            } else {
                setAmountError('')
            }
        },
        [maxAmount],
    )

    const handleMyAddressClick = useCallback(() => {
        const newAddress = wallet.address
        setAddress(newAddress)
        setIsValidAddress(ethers.isAddress(newAddress))
    }, [wallet.address])

    const handleMaxAmountClick = useCallback(() => {
        setAmount(maxAmount)
        validateAmount(maxAmount)
    }, [maxAmount, validateAmount])

    async function handleWithdraw() {
        setLoading(true)
        await withDraw(address, ethers.parseEther(amount))
        getBalanceOfAnAddress(contractCMAccountAddress)
        setAmount('')
        setConfirm(false)
        setAddress('')
        setLoading(false)
    }

    useEffect(() => {
        getBalanceOfAnAddress(contractCMAccountAddress)
    }, [getBalanceOfAnAddress])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AddressInput
                address={address}
                onAddressChange={handleAddressChange}
                onMyAddressClick={handleMyAddressClick}
            />
            <AmountInput
                amount={amount}
                onAmountChange={handleAmountChange}
                onMaxAmountClick={handleMaxAmountClick}
                maxAmount={maxAmount}
            />
            <FormControlLabel
                sx={{
                    margin: '0 0',
                }}
                label={
                    <Typography variant="body2">
                        i double-checked the address i am sending to
                    </Typography>
                }
                control={
                    <Checkbox
                        sx={{
                            color: theme => theme.palette.secondary.main,
                            '&.Mui-checked': {
                                color: theme => theme.palette.secondary.main,
                            },
                            '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                color: theme => theme.palette.secondary.main,
                            },
                            p: '0 8px 0 0',
                        }}
                        checked={confirm}
                        onChange={() => setConfirm(prev => !prev)}
                    />
                }
            />
            {address !== '' && !isValidAddress && (
                <Alert variant="negative" content="Invalid C-Chain address" />
            )}
            {amountError && <Alert variant="negative" content={amountError} />}
            <Button
                disabled={!confirm || !isValidAddress || !!amountError || !!!amount}
                variant="contained"
                onClick={handleWithdraw}
                sx={{
                    width: 'fit-content',
                    padding: '6px 12px',
                    gap: '6px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    borderWidth: '1px',
                    '&:hover': {
                        borderWidth: '1px',
                        boxShadow: 'none',
                    },
                    flex: '0 0 16%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {loading ? (
                    <CircularProgress size={20} style={{ width: 20, height: 20 }} color="inherit" />
                ) : (
                    <Typography variant="caption">Transfer</Typography>
                )}
            </Button>
        </Box>
    )
}

const MyMessenger = () => {
    const { state, dispatch } = usePartnerConfigurationContext()
    const [open, setOpen] = useState(false)
    const [isOffChainPaymentSupported, setIsOffChainPaymentSupported] = useState(false)
    const [isCAMSupported, setCAMSupported] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [tempOffChainPaymentSupported, setTempOffChainPaymentSupported] = useState(false)
    const [tempCAMSupported, setTempCAMSupported] = useState(false)
    const { balanceOfAnAddress, getBalanceOfAnAddress } = useWalletBalance()
    const [isLoading, setIsLoading] = useState(false)
    const [bots, setBots] = useState([])
    const { contractCMAccountAddress, wallet } = useSmartContract()
    const {
        getSupportedTokens,
        getOffChainPaymentSupported,
        setOffChainPaymentSupported,
        addSupportedToken,
        removeSupportedToken,
        getListOfBots,
    } = usePartnerConfig()
    const { data: partner } = useFetchPartnerDataQuery({
        companyName: '',
        cChainAddress: wallet.address,
    })
    const handleOpenModal = () => {
        setOpen(true)
    }
    async function checkIfOffChainPaymentSupported() {
        let res = await getOffChainPaymentSupported()
        setIsOffChainPaymentSupported(res)
    }
    async function checkIfCamSupported() {
        let res = await getSupportedTokens()
        setCAMSupported(!!res.find(elem => elem === ethers.ZeroAddress))
    }
    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleEditClick = () => {
        setTempOffChainPaymentSupported(isOffChainPaymentSupported)
        setTempCAMSupported(isCAMSupported)
        setIsEditMode(true)
    }

    const handleCancelEdit = () => {
        setIsEditMode(false)
    }

    const handleConfirmEdit = async () => {
        setIsLoading(true)
        try {
            if (tempOffChainPaymentSupported !== isOffChainPaymentSupported) {
                await setOffChainPaymentSupported(tempOffChainPaymentSupported)
            }
            if (tempCAMSupported !== isCAMSupported) {
                if (tempCAMSupported) await addSupportedToken(ethers.ZeroAddress)
                else await removeSupportedToken(ethers.ZeroAddress)
            }
            setIsEditMode(false)
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            await checkIfOffChainPaymentSupported()
            await checkIfCamSupported()
            setIsLoading(false)
        }
    }
    async function fetchBots() {
        const res = await getListOfBots()
        setBots(res)
    }
    useEffect(() => {
        checkIfCamSupported()
        checkIfOffChainPaymentSupported()
        getBalanceOfAnAddress(contractCMAccountAddress)
    }, [getBalanceOfAnAddress])

    useEffect(() => {
        fetchBots()
    }, [])

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
                        First you need to top up the CM Account with CAM, EURSH or USDC to work
                        properly. Transfer it to the newly generated CM address below.
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
                                    }}
                                >
                                    Copy
                                </MainButton>
                            ),
                        }}
                    />
                    <ServiceList
                        listName="Wanted Services"
                        services={state.stepsConfig[2]?.services.map(elem => elem.name)}
                    />
                    <ServiceList
                        listName="Offered Services"
                        services={state.stepsConfig[1]?.services.map(elem => elem.name)}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                        <Typography sx={{ flex: '0 0 20%' }} variant="body2">
                            Configured Bots
                        </Typography>
                        <Typography variant="caption">
                            {bots.length === 0 ? (
                                <>None</>
                            ) : (
                                <>
                                    You have {bots.length} configured{' '}
                                    {bots.length === 1 ? 'bot.' : 'bots.'}
                                </>
                            )}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            width: 'fit-content',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="body2">Accepted Currencies</Typography>
                            <RefreshOutlined
                                onClick={() => {
                                    getBalanceOfAnAddress(contractCMAccountAddress)
                                }}
                                sx={{
                                    color: theme => `${theme.palette.text.primary} !important`,
                                }}
                            />
                        </Box>
                        <FormControlLabel
                            disabled={!isEditMode}
                            label={<Typography variant="body2">Fiat: off-chain</Typography>}
                            control={
                                <Checkbox
                                    sx={{
                                        color: theme => theme.palette.secondary.main,
                                        '&.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        m: '0 8px 0 0',
                                    }}
                                    checked={
                                        isEditMode
                                            ? tempOffChainPaymentSupported
                                            : isOffChainPaymentSupported
                                    }
                                    onChange={e =>
                                        setTempOffChainPaymentSupported(e.target.checked)
                                    }
                                />
                            }
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControlLabel
                                disabled={!isEditMode}
                                label={
                                    <Typography variant="body2">
                                        CAM: {balanceOfAnAddress}
                                    </Typography>
                                }
                                control={
                                    <Checkbox
                                        sx={{
                                            color: theme => theme.palette.secondary.main,
                                            '&.Mui-checked': {
                                                color: theme => theme.palette.secondary.main,
                                            },
                                            '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                                color: theme => theme.palette.secondary.main,
                                            },
                                            m: '0 8px 0 0',
                                        }}
                                        checked={isEditMode ? tempCAMSupported : isCAMSupported}
                                        onChange={e => setTempCAMSupported(e.target.checked)}
                                    />
                                }
                            />
                            {!isEditMode && (
                                <Button
                                    disabled={!isCAMSupported}
                                    variant="contained"
                                    onClick={handleOpenModal}
                                >
                                    Withdraw
                                </Button>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControlLabel
                                label={
                                    <Typography variant="body2">USDC* (coming soon) </Typography>
                                }
                                disabled
                                control={
                                    <Checkbox
                                        sx={{
                                            color: theme => theme.palette.secondary.main,
                                            '&.Mui-checked': {
                                                color: theme => theme.palette.secondary.main,
                                            },
                                            '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                                color: theme => theme.palette.secondary.main,
                                            },
                                            m: '0 8px 0 0',
                                        }}
                                        checked={false}
                                    />
                                }
                            />
                            {!isEditMode && (
                                <Button disabled={true} variant="contained">
                                    Withdraw
                                </Button>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControlLabel
                                disabled
                                label={<Typography variant="body2">EURC* (coming soon)</Typography>}
                                control={
                                    <Checkbox
                                        sx={{
                                            color: theme => theme.palette.secondary.main,
                                            '&.Mui-checked': {
                                                color: theme => theme.palette.secondary.main,
                                            },
                                            '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                                color: theme => theme.palette.secondary.main,
                                            },
                                            m: '0 8px 0 0',
                                        }}
                                        checked={false}
                                    />
                                }
                            />
                            {!isEditMode && (
                                <Button disabled={true} variant="contained">
                                    Withdraw
                                </Button>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {!isEditMode ? (
                                <Button variant="contained" onClick={handleEditClick}>
                                    Edit Currencies
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        disabled={isLoading}
                                        variant="outlined"
                                        onClick={handleCancelEdit}
                                        sx={{ mr: '8px' }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isLoading}
                                        variant="contained"
                                        onClick={handleConfirmEdit}
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            'Confirm'
                                        )}
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Configuration>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Configuration.Infos
                        information="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address. Once the process is complete, your Camino Messenger address will appear on your partner detail page, allowing you to communicate directly with other Camino Messenger accounts."
                        rackRates="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address."
                    ></Configuration.Infos>
                </Box>
            </Box>
            <DialogAnimate open={open} onClose={handleCloseModal}>
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        width: '768px',
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                    }}
                >
                    <Typography variant="body1" component="span">
                        Withdraw CAM
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 15,
                            cursor: 'pointer',
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <Icon path={mdiClose} size={1} />
                    </IconButton>
                </DialogTitle>

                <Divider sx={{ borderWidth: '1.5px' }} />
                <DialogContent
                    sx={{
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                    }}
                >
                    <CamWithdraw balance={balanceOfAnAddress} />
                </DialogContent>
            </DialogAnimate>
        </>
    )
}

export default MyMessenger
