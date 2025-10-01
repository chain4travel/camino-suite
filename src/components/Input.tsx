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
        return balance > parseFloat(maxBalance) - 0.5
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
                {...rest}
            />
            {error && (
                <Typography variant="caption" color="error">
                    {parseFloat(state.balance) < parseFloat(maxBalance) - 0.5
                        ? `Prefund Amount cannot exceed ${parseFloat(maxBalance) - 0.5}`
                        : ''}
                </Typography>
            )}
        </>
    )
}

export default Input
