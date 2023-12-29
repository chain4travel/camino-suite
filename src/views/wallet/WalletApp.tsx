import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { mount } from 'wallet/mountApp'
import { updateAssets } from '../../helpers/walletStore'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import {
    updateAccount,
    updateNotificationStatus,
    updatePchainAddress,
    updateShowButton,
    updateValues,
} from '../../redux/slices/app-config'
import { updateAuthStatus } from '../../redux/slices/utils'
const LoadWallet = () => {
    const [updateStore, setUpdateStore] = useState(null)
    const [fetch, setFetch] = useState(false)
    const [logOut, setLogOut] = useState(false)
    const dispatch = useAppDispatch()
    const ref = useRef(null)
    const [walletSwitched, setWalletSwitched] = React.useState('')
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(updatePchainAddress(walletSwitched))
    }, [walletSwitched]) // eslint-disable-line react-hooks/exhaustive-deps
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    const setAccount = account => dispatch(updateAccount(account))
    useEffect(() => {
        dispatch(updateValues(updateStore))
        if (updateStore) dispatch(updateAuthStatus(true))
    }, [updateStore]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(updateValues(updateStore))
    }, [logOut]) // eslint-disable-line react-hooks/exhaustive-deps
    const updateShowAlias = () => dispatch(updateShowButton())
    const fetchUTXOs = async () => {
        await updateAssets()
        setFetch(true)
    }
    useEffect(() => {
        if (fetch)
            mount(ref.current, {
                setUpdateStore,
                setLogOut,
                setAccount,
                dispatchNotification,
                updateShowAlias,
                navigate: location => navigate(location),
                setWalletSwitched,
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch])

    useEffectOnce(() => {
        fetchUTXOs()
    })

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

const Wallet = () => {
    const auth = useAppSelector(state => state.appConfig.isAuth)
    if (!auth) return <Navigate to="/login" replace></Navigate>
    return <React.Suspense fallback={<div>Loading...</div>}>{<LoadWallet />}</React.Suspense>
}

export default Wallet
