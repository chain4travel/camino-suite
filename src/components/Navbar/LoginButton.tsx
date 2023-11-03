import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { MenuItem, MenuList, Select, IconButton, useTheme, Typography, Chip } from '@mui/material'
import store from 'wallet/store'
import { useNavigate } from 'react-router-dom'
import { getAccount, updateAccount, changeActiveApp } from '../../redux/slices/app-config'
import { mdiLogout, mdiCogOutline } from '@mdi/js'
import Icon from '@mdi/react'
import MHidden from '../@material-extend/MHidden'
import { LoadAccountMenu } from '../LoadAccountMenu'
import AliasPicker from './AliasPicker'
import { updateAuthStatus } from '../../redux/slices/utils'

interface LoginIconProps {
    handleCloseSidebar: () => void
}

export default function LoginButton({ handleCloseSidebar }: LoginIconProps) {
    const cAddress = useAppSelector(state => state.appConfig.walletStore?.activeWallet?.ethAddress)
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

    const handleKeyDown = e => {
        e.stopPropagation()
    }

    return (
        <>
            <MHidden width="smUp">
                <MenuList sx={{ backgroundColor: 'transparent' }}>
                    <MenuItem onClick={navigateToSettings}>
                        <IconButton>
                            <Icon path={mdiCogOutline} size={0.8} />
                        </IconButton>
                        <Typography variant="body1">Settings</Typography>
                    </MenuItem>
                    {auth && (
                        <MenuItem>
                            <AliasPicker />
                        </MenuItem>
                    )}
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
                                top: 0,
                                right: { xs: '0.3rem', sm: 0 },
                            }}
                            label="beta"
                        />
                    </MenuItem>
                    <MenuItem onClick={logout} sx={{ display: 'flex' }}>
                        <IconButton>
                            <Icon path={mdiLogout} size={0.8} />
                        </IconButton>
                        <Typography variant="body1">logout</Typography>
                    </MenuItem>
                </MenuList>
            </MHidden>
            <MHidden width="smDown">
                <>
                    {cAddress && (
                        <Select
                            value={!account ? cAddress : <LoadAccountMenu type="" />}
                            renderValue={() =>
                                account ? <LoadAccountMenu type="" /> : `0x${cAddress}`
                            }
                            sx={{
                                maxWidth: '13rem',
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '.MuiSvgIcon-root': { color: theme.palette.text.primary },
                            }}
                            onKeyDown={e => {
                                handleKeyDown(e)
                            }}
                        >
                            <MenuItem
                                onClick={() => navigate('/settings')}
                                onKeyDown={e => {
                                    handleKeyDown(e)
                                }}
                                sx={{
                                    typography: 'body1',
                                    width: '100%',
                                    maxWidth: '326px',
                                    display: 'flex',
                                    justifyContent: { xs: 'flex-end', sm: 'center' },
                                }}
                            >
                                <IconButton>
                                    <Icon path={mdiCogOutline} size={0.7} />
                                </IconButton>
                                <Typography variant="body1">Settings</Typography>
                            </MenuItem>
                            <MenuItem
                                onKeyDown={e => {
                                    handleKeyDown(e)
                                }}
                                sx={{ typography: 'body1', width: '100%', maxWidth: '326px' }}
                            >
                                <LoadAccountMenu type="kyc" />
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
                                        top: 0,
                                        right: { xs: '0.3rem', sm: 0 },
                                    }}
                                    label="beta"
                                />
                                <LoadAccountMenu type="kyb" />
                            </MenuItem>
                            <MenuItem
                                onKeyDown={e => handleKeyDown(e)}
                                onClick={logout}
                                sx={{
                                    typography: 'body1',
                                    width: '100%',
                                    maxWidth: '326px',
                                    display: 'flex',
                                    justifyContent: { xs: 'flex-end', sm: 'center' },
                                    gap: '0.3rem',
                                }}
                            >
                                <IconButton>
                                    <Icon path={mdiLogout} size={0.7} />
                                </IconButton>
                                <Typography variant="body1">logout</Typography>
                            </MenuItem>
                        </Select>
                    )}
                </>
            </MHidden>
        </>
    )
}
