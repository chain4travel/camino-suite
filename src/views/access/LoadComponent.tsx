import { mountAccessComponents } from 'wallet/mountAccessComponents'
import React, { useRef, useEffect, useState } from 'react'
import { updateAccount, updateAuthStatus, updateValues } from '../../redux/slices/app-config'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useEffectOnce } from '../../hooks/useEffectOnce'

const LoadComponent = ({ type, props }) => {
    const ref = useRef(null)
    const [updateStore, setUpdateStore] = useState(null)
    const dispatch = useAppDispatch()
    const setAccount = account => dispatch(updateAccount(account))
    useEffect(() => {
        dispatch(updateValues(updateStore))
        if (updateStore?.isAuth) {
            dispatch(updateAuthStatus(updateStore?.isAuth))
        }
    }, [updateStore]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffectOnce(() => {
        mountAccessComponents(ref.current, type, {
            ...props,
            setUpdateStore,
            setAccount,
        })
    }) // eslint-disable-line react-hooks/exhaustive-deps
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

export default LoadComponent
