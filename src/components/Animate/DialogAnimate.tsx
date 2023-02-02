import { Box, Dialog, DialogProps, Paper, useTheme } from '@mui/material'
import React from 'react'

interface DialogAnimateProps extends DialogProps {
    animate?: object
    onClose?: VoidFunction
}

export default function DialogAnimate({
    open = false,
    animate,
    onClose,
    children,
    ...other
}: DialogAnimateProps) {
    const theme = useTheme()
    return (
        <>
            {open && (
                <Dialog
                    fullWidth
                    maxWidth="md"
                    open={open}
                    onClose={onClose}
                    PaperComponent={props => (
                        <Box
                            component="div"
                            {...animate}
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                onClick={onClose}
                                sx={{ width: '100%', height: '100%', position: 'fixed' }}
                            />
                            <Paper
                                sx={{
                                    backgroundColor:
                                        theme.palette.mode === 'dark'
                                            ? `${theme.palette.grey[900]}`
                                            : `${theme.palette.grey[50]}`,
                                    backgroundImage: 'none',
                                }}
                                {...props}
                            >
                                {props.children}
                            </Paper>
                        </Box>
                    )}
                    {...other}
                >
                    {children}
                </Dialog>
            )}
        </>
    )
}
