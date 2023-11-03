import { Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getActiveApp, getAllApps } from '../../redux/slices/app-config'

const CreateDepositButton = () => {
    const activeApp = useAppSelector(getActiveApp)
    const allApps = useAppSelector(getAllApps)
    if (true && allApps[activeApp].name === 'Partners')
        return (
            <>
                <Typography variant="subtitle1"> Create new depositOffer </Typography>
            </>
        )
}

export default CreateDepositButton
