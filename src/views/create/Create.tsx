import React, { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { mountCreateWallet } from 'wallet/mountCreate'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { changeActiveApp, updateValues } from '../../redux/slices/app-config'
import { updateAuthStatus } from '../../redux/slices/utils'

const CreateWallet = () => {
    const ref = useRef(null)
    const [updateStore, setUpdateStore] = useState(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(updateValues(updateStore))
        if (updateStore?.isAuth) {
            dispatch(updateAuthStatus(updateStore?.isAuth))
            dispatch(changeActiveApp('Wallet'))
            navigate('/wallet')
        }
    }, [updateStore]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        mountCreateWallet(ref.current, {
            setUpdateStore,
            navigate: to => navigate(to),
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

export default function Create() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <CreateWallet />
        </React.Suspense>
    )
}
