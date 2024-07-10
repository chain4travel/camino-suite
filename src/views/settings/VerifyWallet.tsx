import React, { useEffect, useRef } from 'react'
// @ts-ignore
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { mountVerifyWalletSetting } from 'wallet/mountVerifyWalletSetting'

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '@media (max-width: 600px)': {
        justifyContent: 'flex-start',
    },
}))

const LoadVerifyWalletSetting = () => {
    const ref = useRef(null)
    useEffect(() => {
        mountVerifyWalletSetting(ref.current)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledBox>
            <div ref={ref} />
        </StyledBox>
    )
}

export default function VerifyWalletSetting() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadVerifyWalletSetting />
        </React.Suspense>
    )
}
