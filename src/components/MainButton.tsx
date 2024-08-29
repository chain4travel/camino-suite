import { Button, Typography } from '@mui/material'
import * as React from 'react'

function MainButton({
    variant,
    onClick,
    children,
    style,
}: {
    variant: 'contained' | 'outlined'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
    style?: React.CSSProperties
}) {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            sx={{
                borderRadius: '8px',
                padding: '10px 16px',
                backgroundColor: variant === 'outlined' ? 'transparent' : 'secondary.main',
                color: variant === 'outlined' ? 'secondary.main' : 'white',
                borderColor: variant === 'outlined' ? theme => theme.palette.grey[600] : '',
                boxShadow: 'none',
                borderWidth: '1px',
                '&:hover': {
                    borderWidth: '1px',
                    boxShadow: 'none',
                    backgroundColor: variant === 'outlined' ? 'transparent' : 'secondary.main',
                    borderColor: variant === 'outlined' ? 'secondary.main' : 'white',
                },
                ...style,
            }}
        >
            <Typography variant="caption" fontWeight={600}>
                {children}
            </Typography>
        </Button>
    )
}

export default React.memo(MainButton)
