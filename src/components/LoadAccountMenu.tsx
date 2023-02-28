import React, { useRef } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'
import { updateAccount, updateNotificationStatus } from '../redux/slices/app-config'
import { mountAccountMenu } from 'wallet/mountAccountMenu'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { useEffectOnce } from '../hooks/useEffectOnce'

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
export const LoadAccountMenu = (props: {
    type: string
    selectedAlias?: string
    updateAlias?: any
}) => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const setAccount = account => dispatch(updateAccount(account))
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    useEffectOnce(() => {
        mountAccountMenu(ref.current, { ...props, setAccount, dispatchNotification })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledBox>
            <div ref={ref} />
        </StyledBox>
    )
}

export default React.memo(LoadAccountMenu)
