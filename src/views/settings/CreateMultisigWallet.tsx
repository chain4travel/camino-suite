import React, { useEffect, useRef } from 'react'
import { mountCreateMultisigWallet } from 'wallet/mountCreateMultisigWallet'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { updateNotificationStatus } from '../../redux/slices/app-config'

const LoadCreateMultisigWallet = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    useEffect(() => {
        mountCreateMultisigWallet(ref.current, { dispatchNotification })
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div ref={ref} />
        </div>
    )
}

export default function CreateMultisigWallet() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadCreateMultisigWallet />
        </React.Suspense>
    )
}
