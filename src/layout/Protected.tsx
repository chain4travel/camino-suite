import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { updateAssets } from '../helpers/walletStore'
import { useEffectOnce } from '../hooks/useEffectOnce'
import store from 'wallet/store'

const OutletWrraper = () => {
    const [fetch, setFetch] = useState(false)
    const fetchUTXOs = async () => {
        await updateAssets()
        setFetch(true)
    }
    useEffectOnce(() => {
        fetchUTXOs()
    })
    if (!fetch) return <></>
    return <Outlet />
}

function Protected() {
    if (!store.state.isAuth) {
        return <Navigate to="/login" replace />
    }
    return <OutletWrraper />
}
export default Protected
