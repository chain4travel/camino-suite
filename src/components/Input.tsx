import { InputAdornment, OutlinedInput, Typography } from '@mui/material'
import React, { useMemo } from 'react'
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
                payload: {
                    newValue: newAmount,
                },
            })
        }
    }
    const error = useMemo(() => {
        if (!state.balance) return true
        let balance = parseFloat(state.balance)
        return balance < 100 || balance > parseFloat(maxBalance) - 0.5
    }, [state, maxBalance])

    return (
        <>
            <OutlinedInput
                value={state.balance}
                onChange={handleChange}
                error={error}
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
                        <Typography variant="body2">Prefund Amount:</Typography>
                    </InputAdornment>
                }
                endAdornment={
                    error ? (
                        <InputAdornment position="end" sx={{ width: 'fit-content' }}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                                    fill="#E5431F"
                                />
                            </svg>
                        </InputAdornment>
                    ) : (
                        <InputAdornment position="end" sx={{ width: 'fit-content' }}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                                    fill="#18B728"
                                />
                            </svg>
                        </InputAdornment>
                    )
                }
                {...rest}
            />
            {error && (
                <Typography variant="caption" color="error">
                    {parseFloat(state.balance) < 100 || !state.balance || state.balance === '0'
                        ? 'Balance must be at least 100'
                        : `Balance cannot exceed ${parseFloat(maxBalance) - 0.5}`}
                </Typography>
            )}
        </>
    )
}

export default Input
//8 279.81669975
