import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import { selectAuthStatus } from '../redux/slices/app-config'

function Protected({ children }) {
    const auth = useAppSelector(selectAuthStatus)
    if (auth === false) {
        return <Navigate to="/login" replace />
    }
    return children
}
export default Protected
