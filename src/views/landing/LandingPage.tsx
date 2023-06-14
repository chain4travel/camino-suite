import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import LandingPageAppWidget from './LandingPageAppWidget'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { changeActiveApp, getAllApps } from '../../redux/slices/app-config'
import { useAppSelector } from '../../hooks/reduxHooks'

export default function LandingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allApps = useAppSelector(getAllApps)
    const isAuth = useAppSelector(state => state.appConfig.isAuth)
    const handleWidgetClick = app => {
        dispatch(changeActiveApp(app?.name))
        navigate(app?.url)
    }

    return (
        <Box>
            <Box>
                <Typography textAlign={'center'} variant="h2">
                    {'Camino Application Suite'}
                </Typography>
                <Typography textAlign={'center'}>
                    {
                        'The Camino Application Suite unifies all network wide applications of the Camino Network'
                    }
                </Typography>
            </Box>

            <Box mt={4}>
                <Grid sx={{ flexGrow: 1 }} container alignItems={'stretch'} spacing={2}>
                    {allApps?.map((app, index) => {
                        if (
                            !app.hidden &&
                            (app.private === false || (app.name === 'Partners' && isAuth))
                        )
                            return (
                                <Grid item key={index} xs={12} sm={12} md>
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
