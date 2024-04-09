import { Button, Typography, useTheme } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getTheme, toggleTheme } from '../../redux/slices/theme'

import { mdiWhiteBalanceSunny } from '@mdi/js'
import Icon from '@mdi/react'
import { useStore } from 'Explorer/useStore'
import React, { Dispatch, SetStateAction } from 'react'
import store from 'wallet/store'
import useWidth from '../../hooks/useWidth'

export default function ThemeSwitcher({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { isDesktop, isMobile } = useWidth()
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const currentTheme = useAppSelector(getTheme)
    const { changeTheme } = useStore()
    const auth = useAppSelector(state => state.appConfig.isAuth)

    const handleChangeTheme = () => {
        if (currentTheme === 'light') document.documentElement.setAttribute('data-theme', 'dark')
        else document.documentElement.setAttribute('data-theme', 'light')
        changeTheme(currentTheme === 'light' ? 'dark' : 'light')
        store.commit('updateTheme')
        dispatch(toggleTheme())
        setOpen(v => !v)
    }

    return (
        <Button
            variant="text"
            onClick={handleChangeTheme}
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
