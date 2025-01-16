import React, { useRef } from 'react'
import { mountSaveKyesButton } from 'wallet/mountsaveKyesButton'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import useWallet from '../../hooks/useWallet'
import { updateAccount, updateNotificationStatus } from '../../redux/slices/app-config'

const LoadSaveKeysComponent = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const setAccount = account => dispatch(updateAccount(account))
    const updateStore = useWallet()
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    useEffectOnce(() => {
        mountSaveKyesButton(ref.current, { dispatchNotification, setAccount, updateStore })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div ref={ref} />
        </>
    )
}

export default React.memo(LoadSaveKeysComponent)
