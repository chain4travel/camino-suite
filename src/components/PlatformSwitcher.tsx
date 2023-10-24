import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import { Box, MenuItem, Select, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import useWidth from '../hooks/useWidth'
import {
    changeActiveApp,
    getActiveApp,
    getAllApps,
    getAuthStatus,
} from '../redux/slices/app-config'

export default function PlatformSwitcher() {
    const theme = useTheme()
    const navigate = useNavigate()
    const activeApp = useAppSelector(getActiveApp)
    const allApps = useAppSelector(getAllApps)
    const isAuth = useAppSelector(getAuthStatus)
    const themeMode = theme.palette.mode === 'light' ? true : false
    const { isDesktop } = useWidth()
    const dispatch = useDispatch()

    return (
        <Box
            sx={{
                borderRight: { xs: 'none', md: `1px solid ${theme.palette.divider}` },
                minHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                pr: '1rem',
                [theme.breakpoints.down('xs')]: { pr: '.5rem' },
            }}
        >
            <Select
                MenuProps={{ MenuListProps: { disableListWrap: true } }}
                value={allApps[activeApp].name}
                onChange={e => {
                    dispatch(changeActiveApp(e.target.value))
                }}
                sx={{
                    minWidth: 'auto',
                    pl: '0rem !important',
                    border: 'none',
                    '.MuiSelect-select': { pl: '0rem !important' },
                    '.MuiOutlinedInput-input': { pr: '42px !important' },
                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '.MuiSvgIcon-root': {
                        color: theme.palette.text.primary,
                        fontSize: '2rem',
                    },
                }}
                renderValue={() => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={
                                !isDesktop
                                    ? '/assets/CaminoLogo.svg'
                                    : themeMode
                                    ? '/assets/LightModeLogo.svg'
                                    : '/assets/DarkModeLogo.svg'
                            }
                            alt="Camino Logo"
                            style={
                                !isDesktop
                                    ? { width: '30px', height: '30px' }
                                    : { width: '120px', height: '36px' }
                            }
                        />
                        <Typography
                            variant={!isDesktop ? 'h6' : 'h4'}
                            component="span"
                            fontWeight="500"
                            sx={{ ml: '.5rem', color: theme.palette.logo.primary }}
                        >
                            {allApps[activeApp].name}
                        </Typography>
                    </Box>
                )}
                data-cy="app-selector-menu"
            >
                {allApps?.map((app, index) => {
                    if (!app.hidden && (!app.private || isAuth))
                        return (
                            <MenuItem
                                key={index}
                                value={app.name}
                                divider
                                onClick={() => navigate(app.url)}
                                data-cy={`app-selector-${app.name}`}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                            noWrap
                                            fontWeight="500"
                                            sx={{ color: '#149EED' }}
                                        >
                                            {app.name}
                                        </Typography>
                                        <Icon path={mdiChevronRight} size={0.9} />
                                    </Box>
                                    <Typography variant="caption" component="span" fontWeight="300">
                                        {app.subText}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        )
                })}
            </Select>
        </Box>
    )
}
