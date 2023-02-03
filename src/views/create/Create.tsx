import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mountCreateWallet } from 'wallet/mountCreate'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    getActiveApp,
    selectAuthStatus,
    updateAuthStatus,
    updateValues,
} from '../../redux/slices/app-config'

const CreateWallet = () => {
    const ref = useRef(null)
    const [updateStore, setUpdateStore] = useState(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(updateValues(updateStore))
        if (updateStore?.isAuth) {
            dispatch(updateAuthStatus(updateStore?.isAuth))
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
    const app = useAppSelector(getActiveApp)
    const auth = useAppSelector(selectAuthStatus)
    const navigate = useNavigate()
    useEffect(() => {
        if (auth) {
            if (app === 'wallet') {
                navigate('/wallet')
            } else navigate('/explorer')
        }
    }, [auth]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <CreateWallet />
        </React.Suspense>
    )
}
