import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getActiveApp, selectAuthStatus } from '../../redux/slices/app-config'
import LoadComponent from './LoadComponent'
const MountAccessComponent = ({ type }) => {
    const navigate = useNavigate()
    const app = useAppSelector(getActiveApp)
    const auth = useAppSelector(selectAuthStatus)
    const location = useLocation()
    useEffect(() => {
        if (auth) {
            if (app === 'wallet') {
                navigate('/wallet')
            } else navigate('/explorer')
        }
    }, [auth]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadComponent
                type={type}
                props={{
                    navigate: location => navigate(location),
                    //index: location.pathname.split('/')[3],
                    index: location.pathname.split('/')[4],
                }}
            />
        </React.Suspense>
    )
}

export default MountAccessComponent
