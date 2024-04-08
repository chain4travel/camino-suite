import { mdiCog, mdiLogout } from '@mdi/js'
import { Box, Chip, MenuItem, MenuList, Select, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getNameOfWallet, getPchainAddress } from '../../helpers/walletStore'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    changeActiveApp,
    getAccount,
    updateAccount,
    updatePchainAddress,
} from '../../redux/slices/app-config'

import Icon from '@mdi/react'
import MHidden from '../@material-extend/MHidden'
import { LoadAccountMenu } from '../LoadAccountMenu'
import AliasPicker from './AliasPicker'
import ThemeSwitcher from './ThemeSwitcher'
// @ts-ignore
import { useNavigate } from 'react-router-dom'
import store from 'wallet/store'
import { updateAuthStatus } from '../../redux/slices/utils'

interface LoginIconProps {
    handleCloseSidebar: () => void
}

export default function Account({ handleCloseSidebar }: LoginIconProps) {
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const account = useAppSelector(getAccount)
    const theme = useTheme()
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
    const [open, setOpen] = useState(false)
    return (
        <>
            <MHidden width="smUp">
                <MenuList sx={{ backgroundColor: 'transparent' }}>
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
                    <MenuItem>
                        <LoadAccountMenu type="kyc" />
                    </MenuItem>
                    <MenuItem sx={{ position: 'relative' }}>
                        <LoadAccountMenu type="kyb" />
                        <Chip
                            color="secondary"
                            size="small"
                            sx={{
                                position: 'absolute',
                                fontSize: '12px',
                                height: '16px',
                                top: '5px',
                                width: '50px',
                                left: 'calc(100% - 55px)',
                                zIndex: '1',
                            }}
                            label="beta"
                        />
                    </MenuItem>
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
                                    <Box onClick={() => setOpen(v => !v)}>
                                        <LoadAccountMenu type="" />
                                    </Box>
                                )
                            }
                            renderValue={() =>
                                account ? (
                                    <Box onClick={() => setOpen(v => !v)}>
                                        <LoadAccountMenu type="" />
                                    </Box>
                                ) : (
                                    <Typography>Account</Typography>
                                )
                            }
                            sx={{
                                maxWidth: '13rem',
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '.MuiSvgIcon-root': { color: theme.palette.text.primary },
                            }}
                            onKeyDown={e => {
                                handleKeyDown(e)
                            }}
                            MenuProps={{
                                onClick: e => {
                                    e.preventDefault()
                                },
                            }}
                        >
                            <MenuItem
                                onKeyDown={e => {
                                    handleKeyDown(e)
                                }}
                                sx={{ typography: 'body2', width: '100%', maxWidth: '326px' }}
                            >
                                <LoadAccountMenu type="kyc" setOpen={setOpen} />
                            </MenuItem>
                            <MenuItem
                                onKeyDown={e => {
                                    handleKeyDown(e)
                                }}
                                sx={{
                                    typography: 'body1',
                                    width: '100%',
                                    maxWidth: '326px',
                                    position: 'relative',
                                }}
                            >
                                <Chip
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        fontSize: '12px',
                                        height: '16px',
                                        top: '5px',
                                        width: '50px',
                                        left: 'calc(100% - 55px)',
                                        zIndex: '1',
                                    }}
                                    label="beta"
                                />
                                <LoadAccountMenu type="kyb" setOpen={setOpen} />
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
