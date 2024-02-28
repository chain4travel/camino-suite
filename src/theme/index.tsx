import { ReactNode, useMemo } from 'react'
import {
    StyledEngineProvider,
    ThemeOptions,
    ThemeProvider,
    createTheme,
} from '@mui/material/styles'
import shadows, { customShadows } from './shadows'

import { CssBaseline } from '@mui/material'
import React from 'react'
import breakpoints from './breakpoints'
import componentsOverrides from './overrides'
import { getTheme } from '../redux/slices/theme'
import palette from './palette'
import shape from './shape'
import typography from './typography'
import { useAppSelector } from '../hooks/reduxHooks'

type ThemeConfigProps = {
    children: ReactNode
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
    const mode = useAppSelector(getTheme)
    const isLight = mode === 'light'

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: isLight
                ? { ...palette.light, mode: 'light' }
                : { ...palette.dark, mode: 'dark' },
            shape,
            typography,
            breakpoints,
            shadows: isLight ? shadows.light : shadows.dark,
            customShadows: isLight ? customShadows.light : customShadows.dark,
        }),
        [isLight],
    )

    const theme = createTheme(themeOptions)
    theme.components = componentsOverrides(theme)

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
