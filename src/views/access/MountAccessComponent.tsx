import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getActiveApp, getAllApps, selectAuthStatus } from '../../redux/slices/app-config'
import LoadComponent from './LoadComponent'
const MountAccessComponent = ({ type }) => {
    const navigate = useNavigate()
    const activeApp = useAppSelector(getActiveApp)
    const allApps = useAppSelector(getAllApps)
    const auth = useAppSelector(selectAuthStatus)
    const location = useLocation()
    useEffect(() => {
        if (auth) {
            navigate(allApps[activeApp].url)
        }
    }, [auth]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadComponent
                type={type}
                props={{
                    navigate: location => navigate(location),
                    index: location.pathname.split('/')[3],
                }}
            />
        </React.Suspense>
    )
}

export default MountAccessComponent
