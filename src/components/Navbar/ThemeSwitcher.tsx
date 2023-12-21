import { mdiWhiteBalanceSunny } from '@mdi/js'
import Icon from '@mdi/react'
import { Button, Typography, useTheme } from '@mui/material'
import { useStore } from 'Explorer/useStore'
import React from 'react'
import store from 'wallet/store'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useWidth from '../../hooks/useWidth'
import { getTheme, toggleTheme } from '../../redux/slices/theme'

export default function ThemeSwitcher() {
    const { isDesktop, isMobile } = useWidth()
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const currentTheme = useAppSelector(getTheme)
    const { changeTheme } = useStore()
    const auth = useAppSelector(state => state.appConfig.isAuth)
    return (
        <Button
            variant="text"
            onClick={() => {
                if (currentTheme === 'light')
                    document.documentElement.setAttribute('data-theme', 'dark')
                else document.documentElement.setAttribute('data-theme', 'light')
                changeTheme(currentTheme === 'light' ? 'dark' : 'light')
                store.commit('updateTheme')
                dispatch(toggleTheme())
            }}
            startIcon={<Icon path={mdiWhiteBalanceSunny} size={1} />}
            disableRipple
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: '8px',
                minWidth: 'auto',
                '&:hover': { backgroundColor: 'transparent' },
                '.MuiButton-startIcon': { mr: isDesktop ? '0rem' : '0rem', ml: '-8px' },
                ...(true && { width: '100%' }),
            }}
        >
            {(isDesktop || (auth && !isMobile)) && (
                <Typography variant="body2">{theme.palette.mode}</Typography>
            )}
        </Button>
    )
}
