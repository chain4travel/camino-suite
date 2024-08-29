import { InputAdornment, Typography } from '@mui/material'
import TextField from '@mui/material/TextField' // Import TextField if using Material-UI
import React from 'react'

const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    fullWidth = false,
    variant = 'outlined',
    error = true,
    helperText = '',
    endIcon = null,
    ...rest
}) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            fullWidth={fullWidth}
            variant={variant}
            error={error}
            helperText={helperText}
            InputProps={{
                sx: {
                    '& input': {
                        fontSize: '16px', // Equivalent to Typography body2
                    },
                },
                startAdornment: (
                    <InputAdornment
                        position="start"
                        sx={{
                            width: 'fit-content',
                            color: theme => theme.palette.text.primary,
                        }}
                    >
                        <Typography variant="body2">C-Chain Balance:</Typography>
                    </InputAdornment>
                ),
                endAdornment: true ? (
                    <InputAdornment position="end" sx={{ width: 'fit-contnet' }}>
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
                    <InputAdornment position="end" sx={{ width: 'fit-contnet' }}>
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
                ),
            }}
            {...rest}
        />
    )
}

export default Input
