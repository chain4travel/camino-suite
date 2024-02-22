import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { mountCreateOfferForm } from 'wallet/mountCreateOfferForm'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { changeActiveApp } from '../../redux/slices/app-config'

const LoadCreateOfferForm = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        mountCreateOfferForm(ref.current, {
            isSuite: true,
            navigate: location => {
                dispatch(changeActiveApp('Network'))
                navigate(location)
            },
            isWhiteListing: true,
        })
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                paddingY: '32px',
                marginTop: '2.5rem',
                maxWidth: '1536px',
            }}
        >
            <div ref={ref} />
        </Box>
    )
}

export default function CreatedOffers() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadCreateOfferForm />
        </React.Suspense>
    )
}
