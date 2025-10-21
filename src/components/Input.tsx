import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { actionTypes, usePartnerConfigurationContext } from '../helpers/partnerConfigurationContext'
import useWalletBalance from '../helpers/useWalletBalance'

const Input = ({ ...rest }) => {
    const { state, dispatch } = usePartnerConfigurationContext()
    const { balance: maxBalance } = useWalletBalance()

    const handleChange = e => {
        const newAmount = e.target.value
        if (newAmount === '' || /^\d*\.?\d*$/.test(newAmount)) {
            dispatch({
                type: actionTypes.UPDATE_BALANCE,
                payload: { newValue: newAmount },
            })
        }
    }

    const validation = useMemo(() => {
        if (!state.balance || state.balance === '') {
            return { isValid: false, error: 'Amount is required', showIcon: false }
        }

        const balance = parseFloat(state.balance)
        const maxAvailable = parseFloat(maxBalance) - 0.5

        if (isNaN(balance))
            return { isValid: false, error: 'Please enter a valid number', showIcon: false }
        if (balance < 0)
            return {
                isValid: false,
                error: 'Amount must be greater than or equal to 0',
                showIcon: true,
            }
        if (balance > maxAvailable)
            return {
                isValid: false,
                error: `Amount cannot exceed ${maxAvailable.toFixed(
                    2,
                )} CAM (you need to keep 0.5 CAM for gas fees)`,
                showIcon: true,
            }

        return { isValid: true, error: null, showIcon: true }
    }, [state.balance, maxBalance])

    useEffect(() => {
        dispatch({
            type: actionTypes.UPDATE_VALIDATION_STATUS,
            payload: { isBalanceValid: validation.isValid },
        })
    }, [validation.isValid])

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
                    validation.showIcon &&
                    state.balance !== '' && (
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
                    )
                }
                sx={theme => ({
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: state.balance
                        ? validation.isValid
                            ? theme.palette.mode === 'dark'
                                ? 'rgba(53, 233, 173, 0.05)'
                                : 'rgba(53, 233, 173, 0.1)'
                            : theme.palette.mode === 'dark'
                            ? 'rgba(239, 68, 68, 0.05)'
                            : 'rgba(239, 68, 68, 0.1)'
                        : 'transparent',
                    border: validation.isValid
                        ? `1px solid ${theme.palette.success.main}`
                        : state.balance !== ''
                        ? `1px solid ${theme.palette.error.main}`
                        : `1px solid ${theme.palette.card.border}`,
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover': {
                        borderColor: validation.isValid
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                    },
                    '&.Mui-focused': {
                        borderWidth: '1px',
                    },
                })}
                {...rest}
            />
            {state.balance !== '' && !validation.isValid && validation.error && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                    {validation.error}
                </Typography>
            )}
            {validation.isValid && state.balance !== '' && (
                <Typography
                    variant="caption"
                    sx={{
                        mt: 0.5,
                        display: 'block',
                        color: 'success.main',
                    }}
                >
                    ✓ Valid amount (Max available: {(parseFloat(maxBalance) - 0.5).toFixed(2)} CAM)
                </Typography>
            )}
        </Box>
    )
}

export default Input
