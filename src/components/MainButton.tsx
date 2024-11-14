import { Button, CircularProgress, SvgIconTypeMap, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import * as React from 'react'

function MainButton({
    variant,
    onClick,
    children,
    style,
    disabled,
    loading,
    endIcon,
}: {
    variant: 'contained' | 'outlined'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
    style?: React.CSSProperties
    disabled?: boolean
    loading?: boolean
    endIcon?: any
}) {
    return (
        <Button
            disabled={disabled || loading}
            variant={variant}
            onClick={onClick}
            endIcon={endIcon}
            sx={{
                borderRadius: '8px',
                padding: '10px 16px',
                backgroundColor: variant === 'outlined' ? 'transparent' : 'secondary.main',
                color: theme => theme.palette.text.primary,
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
            {loading && (
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
            )}
            <Typography
                variant="caption"
                fontWeight={600}
                sx={{
                    visibility: loading ? 'hidden' : 'visible',
                    color: theme => theme.palette.text.primary,
                }}
            >
                {children}
            </Typography>
        </Button>
    )
}

export default React.memo(MainButton)
