import React, { useEffect, useState } from 'react'
import { Alert, Box, Snackbar, Typography } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import {
    getNotificationMessage,
    getNotificationSeverity,
    getNotificationStatus,
    getNotificationTitle,
    updateNotificationStatus,
} from '../redux/slices/app-config'

type TransitionProps = Omit<SlideProps, 'direction'>

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="left" />
}

export default function Notifications() {
    const notificationStatus = useAppSelector(getNotificationStatus)
    const notificationMessage = useAppSelector(getNotificationMessage)
    const notificationTitle = useAppSelector(getNotificationTitle)
    const notificationSeverity = useAppSelector(getNotificationSeverity)
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(
        undefined,
    )

    const handleClose = () => {
        setOpen(false)
        dispatch(updateNotificationStatus(null))
    }
    useEffect(() => {
        if (notificationStatus) {
            setTransition(() => TransitionUp)
            setOpen(true)
        }
    }, [notificationStatus])

    return (
        <>
            {notificationSeverity && (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    key={transition ? transition.name : ''}
                    autoHideDuration={5000}
                    sx={{
                        top: {
                            xs: '69px !important',
                            md: '72px !important',
                        },
                    }}
                >
                    <Box
                        sx={{
                            padding: '6px 16px',
                            backgroundColor: 'rgb(6, 12, 5)',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '12px',
                            border: '1px solid rgba(145, 158, 171, 0.24)',
                        }}
                    >
                        {notificationTitle && (
                            <Typography variant="h6">{notificationTitle}</Typography>
                        )}
                        <Alert
                            severity={notificationSeverity}
                            sx={{
                                borderRadius: '0px',
                                display: 'flex',
                                alignItems: 'center',
                                borderWidth: 0,
                            }}
                        >
                            <Typography>{notificationMessage}</Typography>
                        </Alert>
                    </Box>
                </Snackbar>
            )}
        </>
    )
}
