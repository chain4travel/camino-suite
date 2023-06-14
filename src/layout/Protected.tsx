import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

function Protected() {
    const auth = useAppSelector(state => state.appConfig.isAuth)
    if (auth === false) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}
export default Protected
