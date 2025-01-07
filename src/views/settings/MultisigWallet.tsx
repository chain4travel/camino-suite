import React, { useEffect, useRef } from 'react'
// @ts-ignore
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { mountMultisigWalletSetting } from 'wallet/mountMultisigWalletSetting'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useWallet from '../../hooks/useWallet'
import { updateNotificationStatus, updateShowButton } from '../../redux/slices/app-config'

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

const LoadMultisigWalletSetting = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const { updateStore } = useWallet()
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    const updateShowAlias = () => dispatch(updateShowButton())
    useEffect(() => {
        mountMultisigWalletSetting(ref.current, { dispatchNotification, updateShowAlias, updateStore })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledBox>
            <div ref={ref} />
        </StyledBox>
    )
}

export default function MultisigWalletSetting() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadMultisigWalletSetting />
        </React.Suspense>
    )
}
