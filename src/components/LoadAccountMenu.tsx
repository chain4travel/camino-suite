import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useRef } from 'react'
import { mountAccountMenu } from 'wallet/mountAccountMenu'
import { useAppDispatch } from '../hooks/reduxHooks'
import { useEffectOnce } from '../hooks/useEffectOnce'
import useWallet from '../hooks/useWallet'
import { updateAccount, updateNotificationStatus } from '../redux/slices/app-config'

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
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    selectedAlias?: string
    updateAlias?: any
    hasImportedPendingTx?: boolean
}) => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const setAccount = account => dispatch(updateAccount(account))
    const { updateStore } = useWallet()
    function closeSelect() {
        props.setOpen(v => !v)
    }
    const dispatchNotification = ({ message, type }) =>
        dispatch(updateNotificationStatus({ message, severity: type }))
    useEffectOnce(() => {
        mountAccountMenu(ref.current, {
            ...props,
            setAccount,
            dispatchNotification,
            closeSelect,
            updateStore,
        })
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledBox>
            <div ref={ref} />
        </StyledBox>
    )
}

export default React.memo(LoadAccountMenu)
