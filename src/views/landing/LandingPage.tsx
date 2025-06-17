import { Box, Grid, Typography } from '@mui/material'
import { changeActiveApp, getAllApps } from '../../redux/slices/app-config'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../hooks/reduxHooks'
import useNetwork from '../../hooks/useNetwork'
import { getActiveNetwork } from '../../redux/slices/network'
import { isEnabled } from '../../utils/featureFlags/featureFlagUtils'
import LandingPageAppWidget from './LandingPageAppWidget'

export default function LandingPage() {
    const activeNetwork = useAppSelector(getActiveNetwork)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allApps = useAppSelector(getAllApps)
    const isAuth = useAppSelector(state => state.appConfig.isAuth)
    const [featureEnabled, setFeatureEnabled] = useState<boolean>(false)
    const { status } = useNetwork()

    useEffect(() => {
        if (status === 'succeeded') {
            checkFeature()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNetwork, status])

    const checkFeature = async () => {
        const enabled = await isEnabled(activeNetwork?.url)
        setFeatureEnabled(enabled)
    }

    const handleWidgetClick = app => {
        dispatch(changeActiveApp(app?.name))

        if (app.name === 'Explorer') {
            navigate(app?.url + '/' + activeNetwork.name.toLowerCase())
        } else {
            navigate(app?.url)
        }
    }

    return (
        <Box sx={{ py: 4 }}>
            <Box>
                <Typography textAlign="center" variant="h2">
                    Camino Suite
                </Typography>
                <Typography textAlign={'center'}>
                    The Camino Suite unifies all network wide applications of the Camino Network
                </Typography>
            </Box>

            <Box mt={4}>
                <Grid sx={{ flexGrow: 1 }} container alignItems="stretch" spacing={2}>
                    {allApps?.map((app, index) => {
                        if (
                            !app.hidden &&
                            (app.private === false || (app.name === 'Foundation' && isAuth)) &&
                            (app.name !== 'Governance' || featureEnabled)
                        )
                            return (
                                <Grid item key={index} xs={12} sm={6} md>
                                    <LandingPageAppWidget
                                        name={app.name}
                                        description={app.subText}
                                        onClick={() => handleWidgetClick(app)}
                                    />
                                </Grid>
                            )
                        else return null
                    })}
                </Grid>
            </Box>
        </Box>
    )
}
