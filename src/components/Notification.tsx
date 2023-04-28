import React, { useEffect, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import {
    getNotificationMessage,
    getNotificationSeverity,
    getNotificationStatus,
    updateNotificationStatus,
} from '../redux/slices/app-config'

type TransitionProps = Omit<SlideProps, 'direction'>

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="left" />
}

export default function Notifications() {
    const notificationStatus = useAppSelector(getNotificationStatus)
    const notificationMessage = useAppSelector(getNotificationMessage)
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
                >
                    <Alert
                        severity={notificationSeverity}
                        sx={{
                            borderRadius: '12px',
                            marginTop: '45px',
                        }}
                    >
                        {notificationMessage}
                    </Alert>
                </Snackbar>
            )}
        </>
    )
}
