import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { actionTypes, usePartnerConfigurationContext } from '../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../helpers/usePartnerConfig'
import { useSmartContract } from '../helpers/useSmartContract'
import useWalletBalance from '../helpers/useWalletBalance'

function toNumberSafe(v: unknown, fallback = 0): number {
    const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''))
    return Number.isFinite(n) ? n : fallback
}
function clampMinZero(n: number) {
    return n > 0 ? n : 0
}

const GAS_FALLBACK = 0.5 // CAM fallback if estimation fails

const Input = ({ ...rest }) => {
    const { state, dispatch } = usePartnerConfigurationContext()
    const { isNewImpl } = useSmartContract()
    const { balance: maxBalanceRaw } = useWalletBalance()
    const partnerConfig = usePartnerConfig()

    const [gasReserve, setGasReserve] = useState<number>(GAS_FALLBACK)
    const [gasReady, setGasReady] = useState<boolean>(false)
    const fetchIdRef = useRef(0)

    useEffect(() => {
        let cancelled = false
        const myFetchId = ++fetchIdRef.current

        async function run() {
            try {
                const v = await partnerConfig?.estimateCreateCost?.()
                const n = toNumberSafe(v, GAS_FALLBACK)

                if (cancelled || myFetchId !== fetchIdRef.current) return
                setGasReserve(n > 0 ? n : GAS_FALLBACK)
                setGasReady(true)
            } catch {
                if (cancelled || myFetchId !== fetchIdRef.current) return
                setGasReserve(GAS_FALLBACK)
                setGasReady(true)
            }
        }

        run()
        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = e.target.value
        if (newAmount === '' || /^\d*\.?\d*$/.test(newAmount)) {
            dispatch({
                type: actionTypes.UPDATE_BALANCE,
                payload: { newValue: newAmount },
            })
        }
    }

    const safeMaxBalance = toNumberSafe(maxBalanceRaw, 0)
    const reserve = toNumberSafe(gasReserve, GAS_FALLBACK)
    const maxAvailable = clampMinZero(safeMaxBalance - reserve)

    const handleMaxClick = () => {
        dispatch({
            type: actionTypes.UPDATE_BALANCE,
            payload: { newValue: maxAvailable.toFixed(6) },
        })
    }

    const validation = useMemo(() => {
        const raw = state.balance
        if (!raw || raw === '') {
            return { isValid: false, error: 'Amount is required', showIcon: false }
        }

        const balance = toNumberSafe(raw, NaN)
        if (Number.isNaN(balance)) {
            return { isValid: false, error: 'Please enter a valid number', showIcon: false }
        }

        if (balance < 0) {
            return {
                isValid: false,
                error: 'Amount must be greater than or equal to 0',
                showIcon: true,
            }
        }

        if (!isNewImpl && balance < 100) {
            return {
                isValid: false,
                error: 'Minimum amount required for the old implementation is 100 CAM',
                showIcon: true,
            }
        }

        if (balance > maxAvailable) {
            return {
                isValid: false,
                error: `Amount cannot exceed ${maxAvailable.toFixed(
                    4,
                )} CAM (you need to keep ${reserve.toFixed(4)} CAM for gas fees)`,
                showIcon: true,
            }
        }

        return { isValid: true, error: null, showIcon: true }
    }, [state.balance, maxAvailable, reserve, isNewImpl])

    useEffect(() => {
        dispatch({
            type: actionTypes.UPDATE_VALIDATION_STATUS,
            payload: { isBalanceValid: validation.isValid },
        })
    }, [dispatch, validation.isValid])

    const balanceNumber = toNumberSafe(state.balance, 0)
    const exceeds = balanceNumber > maxAvailable

    return (
        <Box sx={{ width: '100%' }}>
            <OutlinedInput
                fullWidth
                value={state.balance}
                onChange={handleChange}
                inputProps={{
                    inputMode: 'decimal',
                    pattern: '[0-9]*',
                }}
                startAdornment={
                    <InputAdornment
                        position="start"
                        sx={{
                            width: 'fit-content',
                            color: theme => theme.palette.text.primary,
                        }}
                    >
                        <Typography variant="body2">CAMs Amount:</Typography>
                    </InputAdornment>
                }
                endAdornment={
                    <>
                        {validation.showIcon && state.balance !== '' && (
                            <InputAdornment position="end">
                                {validation.isValid ? (
                                    <CheckCircleIcon
                                        sx={{
                                            color: theme => theme.palette.success.main,
                                            fontSize: 20,
                                        }}
                                    />
                                ) : (
                                    <ErrorOutlineIcon
                                        sx={{
                                            color: theme => theme.palette.error.main,
                                            fontSize: 20,
                                        }}
                                    />
                                )}
                            </InputAdornment>
                        )}
                        <InputAdornment position="end" sx={{ mr: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    cursor: 'pointer',
                                    color: theme => theme.palette.primary.main,
                                    fontWeight: 500,
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                                onClick={handleMaxClick}
                            >
                                MAX
                            </Typography>
                        </InputAdornment>
                    </>
                }
                sx={theme => ({
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: state.balance
                        ? exceeds
                            ? theme.palette.error.light + '15'
                            : validation.isValid
                            ? theme.palette.mode === 'dark'
                                ? 'rgba(53, 233, 173, 0.05)'
                                : 'rgba(53, 233, 173, 0.1)'
                            : theme.palette.mode === 'dark'
                            ? 'rgba(239, 68, 68, 0.05)'
                            : 'rgba(239, 68, 68, 0.1)'
                        : 'transparent',
                    border: validation.isValid
                        ? `1px solid ${theme.palette.success.main}`
                        : exceeds
                        ? `1px solid ${theme.palette.error.main}`
                        : state.balance !== ''
                        ? `1px solid ${theme.palette.error.main}`
                        : `1px solid ${theme.palette.card.border}`,
                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover': {
                        borderColor: validation.isValid
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                    },
                    '&.Mui-focused': { borderWidth: '1px' },
                })}
                {...rest}
            />

            {/* Error message */}
            {state.balance !== '' && !validation.isValid && validation.error && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{
                        mt: 0.5,
                        display: 'block',
                        fontWeight: 500,
                        animation: 'blink 0.5s ease-in-out',
                        '@keyframes blink': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.6 },
                        },
                    }}
                >
                    ⚠️ {validation.error}
                </Typography>
            )}

            {/* Valid state message */}
            {validation.isValid && state.balance !== '' && (
                <Typography
                    variant="caption"
                    sx={{
                        mt: 0.5,
                        display: 'block',
                        color: 'success.main',
                    }}
                >
                    ✓ Valid amount (Max available: {maxAvailable.toFixed(4)} CAM
                    {gasReady ? '' : ' • using fallback'})
                </Typography>
            )}
        </Box>
    )
}

export default Input
