import React, { useRef } from 'react'
import { mountKyesComponent } from 'wallet/mountKyesComponent'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { styled } from '@mui/system'
import { Box } from '@mui/material'

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
    useEffectOnce(() => {
        mountKyesComponent(ref.current, { dispatchNotification })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledBox>
            <div ref={ref} />
        </StyledBox>
    )
}

export default React.memo(LoadMyKeysComponent)
