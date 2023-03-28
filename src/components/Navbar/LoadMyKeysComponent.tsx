import React, { useRef } from 'react'
import { mountKyesComponent } from 'wallet/mountKyesComponent'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import { useEffectOnce } from '../../hooks/useEffectOnce'

const LoadMyKeysComponent = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()

    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    useEffectOnce(() => {
        mountKyesComponent(ref.current, { dispatchNotification })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div ref={ref} />
        </>
    )
}

export default React.memo(LoadMyKeysComponent)
