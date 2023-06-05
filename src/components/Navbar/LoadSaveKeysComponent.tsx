import React, { useRef } from 'react'
import { mountSaveKyesButton } from 'wallet/mountsaveKyesButton'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { updateAccount, updateNotificationStatus } from '../../redux/slices/app-config'
import { useEffectOnce } from '../../hooks/useEffectOnce'

const LoadSaveKeysComponent = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const setAccount = account => dispatch(updateAccount(account))
    const dispatchNotification = ({ message, type, title }) =>
        dispatch(updateNotificationStatus({ message, severity: type, title }))
    useEffectOnce(() => {
        mountSaveKyesButton(ref.current, { dispatchNotification, setAccount })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div ref={ref} />
        </>
    )
}

export default React.memo(LoadSaveKeysComponent)
