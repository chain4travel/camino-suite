import { Box } from '@mui/material'
import { styled } from '@mui/system'
import React, { useRef } from 'react'
import { mountKyesComponent } from 'wallet/mountKyesComponent'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import useWallet from '../../hooks/useWallet'
import { updateAccount, updateNotificationStatus } from '../../redux/slices/app-config'

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '@media (max-width: 600px)': {
        justifyContent: 'flex-start',
        '& .my_keys': {
            width: '400px',
        },
        '& .rows': {
            flexDirection: 'column !important',
            justifyContent: 'center !important',
            alignItems: 'center !important',
        },
    },
    '@media (max-width: 450px)': {
        justifyContent: 'flex-start',
        '& .my_keys': {
            width: '350px',
        },
    },
    '@media (max-width: 400px)': {
        justifyContent: 'flex-start',
        '& .my_keys': {
            width: '200px',
        },
    },
}))

const LoadMyKeysComponent = () => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    const setAccount = account => dispatch(updateAccount(account))
    const { updateStore } = useWallet()
    useEffectOnce(() => {
        mountKyesComponent(ref.current, {
            dispatchNotification,
            updateStore,
            setAccount
        })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledBox>
            <div ref={ref} />
        </StyledBox>
    )
}

export default React.memo(LoadMyKeysComponent)
