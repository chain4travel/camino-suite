import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    OutlinedInput,
    Typography,
} from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'

import { ethers } from 'ethers'
import { usePartnerConfig } from '../helpers/usePartnerConfig'
import { useSmartContract } from '../helpers/useSmartContract'
import useWalletBalance from '../helpers/useWalletBalance'
import { updateNotificationStatus } from '../redux/slices/app-config'
import Alert from './Alert'

const AmountInput = ({ amount, onAmountChange, onMaxAmountClick, maxAmount, selectedToken }) => {
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
                Max available: {maxAmount} {selectedToken ? selectedToken.symbol : 'CAM'}
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

const CamWithdraw = ({ setOpen, token, fetchTokenBalances }) => {
    const { wallet, contractCMAccountAddress } = useSmartContract()
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [loading, setLoading] = useState(false)
    const [amountError, setAmountError] = useState('')
    const { withDraw, transferERC20, sftDecimal } = usePartnerConfig()
    const { getBalanceOfAnAddress, balanceOfAnAddress: balance } = useWalletBalance()

    const maxAmount = useMemo(() => {
        if (token) return parseFloat(token.balance)
        const balanceParsed = parseFloat(balance)
        if (isNaN(balanceParsed)) {
            return '0.00'
        }
        return Math.max(balanceParsed, 0).toFixed(2)
    }, [balance, token])

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
    const appDispatch = useAppDispatch()
    const handleMaxAmountClick = useCallback(() => {
        setAmount(maxAmount)
        validateAmount(maxAmount)
    }, [maxAmount, validateAmount])

    async function handleWithdraw() {
        setLoading(true)
        try {
            if (!token) {
                await withDraw(address, ethers.parseUnits(amount, sftDecimal))
                getBalanceOfAnAddress(contractCMAccountAddress)
            } else {
                await transferERC20(token.address, address, ethers.parseUnits(amount, sftDecimal))
                await fetchTokenBalances()
            }
            setAmount('')
            setConfirm(false)
            setAddress('')
            appDispatch(
                updateNotificationStatus({
                    message: 'Withdrawal completed successfully!',
                    severity: 'success',
                }),
            )
        } catch (error) {
            console.error(error)
            appDispatch(
                updateNotificationStatus({
                    message: 'Withdrawal failed. Please try again.',
                    severity: 'error',
                }),
            )
        } finally {
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        getBalanceOfAnAddress(contractCMAccountAddress)
    }, [getBalanceOfAnAddress, contractCMAccountAddress])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AddressInput
                address={address}
                onAddressChange={handleAddressChange}
                onMyAddressClick={handleMyAddressClick}
            />
            <AmountInput
                selectedToken={token}
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
                        I double-checked the address I am about to send to
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
export default CamWithdraw
