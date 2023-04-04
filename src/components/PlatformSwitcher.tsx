import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, MenuItem, Select, useTheme, Typography } from '@mui/material'
import { mdiChevronRight } from '@mdi/js'
import { APPS_CONSTS } from '../constants/apps-consts'
import useWidth from '../hooks/useWidth'
import Icon from '@mdi/react'
import { useDispatch } from 'react-redux'
import { changeActiveApp } from '../redux/slices/app-config'
import { useNavigate } from 'react-router-dom'

export default function PlatformSwitcher() {
    const theme = useTheme()
    const navigate = useNavigate()
    const themeMode = theme.palette.mode === 'light' ? true : false
    const { isDesktop } = useWidth()
    const location = window.location.pathname.split('/')[1]
    const dispatch = useDispatch()
    const [app, setApp] = useState(
        location.charAt(0).toUpperCase() + location.slice(1) || 'Explorer',
    )

    useEffect(() => {
        if (!APPS_CONSTS.find(a => a.name === app)) setApp('Explorer')
    }, [app])

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
                value={app}
                onChange={e => {
                    setApp(e.target.value)
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
                            {app}
                        </Typography>
                    </Box>
                )}
                data-cy="app-selector-menu"
            >
                {APPS_CONSTS.map((app, index) => (
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
                ))}
            </Select>
        </Box>
    )
}
