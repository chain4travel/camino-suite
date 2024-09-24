import { mdiCheckDecagram, mdiCog, mdiLogout } from '@mdi/js'
import { Box, MenuItem, MenuList, Select, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getNameOfWallet, getPchainAddress } from '../../helpers/walletStore'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    changeActiveApp,
    getAccount,
    getWalletStore,
    updateAccount,
    updatePchainAddress,
    updatePendingTxState,
} from '../../redux/slices/app-config'

import Icon from '@mdi/react'
import MHidden from '../@material-extend/MHidden'
import { LoadAccountMenu } from '../LoadAccountMenu'
import AliasPicker from './AliasPicker'
import ThemeSwitcher from './ThemeSwitcher'
// @ts-ignore
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from 'wallet/store'
import { getActiveNetwork } from '../../redux/slices/network'
import { updateAuthStatus } from '../../redux/slices/utils'
import CamBadge from '../CamBadge'

interface LoginIconProps {
    handleCloseSidebar: () => void
}

export default function Account({ handleCloseSidebar }: LoginIconProps) {
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const account = useAppSelector(getAccount)
    const theme = useTheme()
    const walletStore = useAppSelector(getWalletStore)
    const [open, setOpen] = useState(false)
    const [hasPendingTx, setHasPendingTx] = useState<boolean>(false)
    const pendingTxState = useSelector((state: any) => state.appConfig.pendingTxState)
    const activeNetwork = useAppSelector(getActiveNetwork)
    const logout = async () => {
        handleCloseSidebar()
        await store.dispatch('logout')
        dispatch(updateAccount(null))
        dispatch(updateAuthStatus(false))
        dispatch(changeActiveApp('Network'))
        navigate('/')
    }

    const navigateToSettings = () => {
        navigate('/settings')
        handleCloseSidebar()
    }

    useEffect(() => {
        dispatch(
            updatePchainAddress({ address: getPchainAddress(), walletName: getNameOfWallet() }),
        )
    }, [auth])
    const handleKeyDown = e => {
        e.stopPropagation()
    }

    // get pending transactions
    useEffect(() => {
        checkPendingTx()
    }, [pendingTxState, activeNetwork])

    const checkPendingTx = async () => {
        if (walletStore?.Signavault?.importedTransactions?.length > 0) {
            setHasPendingTx(walletStore?.Signavault?.importedTransactions?.length > 0)
            dispatch(updatePendingTxState(false))
        } else if (walletStore?.Signavault?.importedTransactions?.length === 0) {
            setHasPendingTx(false)
            dispatch(updatePendingTxState(false))
        } else if (pendingTxState) dispatch(updatePendingTxState(false))
    }

    return (
        <>
            <MHidden width="smUp">
                <MenuList sx={{ backgroundColor: 'transparent' }}>
                    <MenuItem
                        onClick={() => {
                            navigate('/settings/verify-wallet')
                            handleCloseSidebar()
                        }}
                        sx={{
                            typography: 'body2',
                            width: '100%',
                            maxWidth: '326px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: '8px',
                        }}
                    >
                        <Icon path={mdiCheckDecagram} size={1} />
                        <Typography variant="body2">Verify Wallet</Typography>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            typography: 'body2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: '8px',
                        }}
                        onClick={navigateToSettings}
                    >
                        <Icon path={mdiCog} size={0.8} />
                        <Typography variant="body1">Settings</Typography>
                    </MenuItem>
                    {auth && <AliasPicker handleKeyDown={handleKeyDown} />}

                    <MenuItem
                        onClick={logout}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: '8px',
                        }}
                    >
                        <Icon path={mdiLogout} size={0.8} />
                        <Typography variant="body2">Logout</Typography>
                    </MenuItem>
                </MenuList>
            </MHidden>
            <MHidden width="smDown">
                <>
                    {auth && (
                        <Select
                            open={open}
                            value={
                                !account ? (
                                    <Typography>Account</Typography>
                                ) : (
                                    <LoadAccountMenu type="" />
                                )
                            }
                            renderValue={() => (
                                <Box
                                    onClick={() => {
                                        setOpen(v => !v)
                                    }}
                                >
                                    {hasPendingTx && (
                                        <CamBadge
                                            size="small"
                                            variant="warning"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                            }}
                                            label={'Pending Tx'}
                                        />
                                    )}
                                    {!account ? (
                                        <Typography>Account</Typography>
                                    ) : (
                                        <LoadAccountMenu type="" />
                                    )}
                                </Box>
                            )}
                            sx={{
                                maxWidth: '13rem',
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '.MuiSvgIcon-root': { color: theme.palette.text.primary },
                            }}
                            onKeyDown={e => {
                                handleKeyDown(e)
                            }}
                            MenuProps={{
                                onClose: () => {
                                    setOpen(v => !v)
                                },
                                onClick: e => {
                                    e.preventDefault()
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    navigate('/settings/verify-wallet')
                                    setOpen(v => !v)
                                }}
                                onKeyDown={e => {
                                    handleKeyDown(e)
                                }}
                                sx={{
                                    typography: 'body2',
                                    width: '100%',
                                    maxWidth: '326px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '8px',
                                }}
                            >
                                <Icon path={mdiCheckDecagram} size={1} />
                                <Typography variant="body2">Verify Wallet</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    navigate('/settings')
                                    setOpen(v => !v)
                                }}
                                onKeyDown={e => {
                                    handleKeyDown(e)
                                }}
                                sx={{
                                    typography: 'body2',
                                    width: '100%',
                                    maxWidth: '326px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '8px',
                                }}
                            >
                                <Icon path={mdiCog} size={1} />
                                <Typography variant="body2">Settings</Typography>
                            </MenuItem>
                            <AliasPicker setOpenSelect={setOpen} handleKeyDown={handleKeyDown} />
                            <MenuItem>
                                <ThemeSwitcher setOpen={setOpen} />
                            </MenuItem>
                            <MenuItem
                                onKeyDown={e => handleKeyDown(e)}
                                onClick={logout}
                                sx={{
                                    typography: 'body2',
                                    width: '100%',
                                    maxWidth: '326px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '8px',
                                }}
                            >
                                <Icon path={mdiLogout} size={1} />
                                <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                        </Select>
                    )}
                </>
            </MHidden>
        </>
    )
}
