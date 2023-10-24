import { CssBaseline } from '@mui/material'
import {
    StyledEngineProvider,
    ThemeOptions,
    ThemeProvider,
    createTheme,
} from '@mui/material/styles'
import React, { ReactNode, useMemo } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { getTheme } from '../redux/slices/theme'
import breakpoints from './breakpoints'
import componentsOverrides from './overrides'
import palette from './palette'
import shadow, { CustomShadowOptions, customShadows } from './shadows'
import shape from './shape'
import typography from './typography'

type ThemeConfigProps = {
    children: ReactNode
}

interface CustomPaddingOptions {
    defaultPadding: string
}
interface CustomWidthOptions {
    layoutMaxWitdh: string
}
interface CustomShapeOptions {
    borderRadiusNone: number | string
    borderRadiusSm: number | string
    borderRadiusMd: number | string
    borderRadiusLg: number | string
    borderRadiusXl: number | string
}

const customShape = {
    borderRadiusNone: 0,
    borderRadius: 8,
    borderRadiusSm: 12,
    borderRadiusMd: 16,
    borderRadiusLg: 20,
    borderRadiusXl: 25,
}
declare module '@mui/material/styles' {
    interface Theme {
        customShadows: CustomShadowOptions
        customPadding: CustomPaddingOptions
        customWidth: CustomWidthOptions
        customShape: CustomShapeOptions
    }
    interface ThemeOptions {
        customShadows?: CustomShadowOptions
        customPadding?: CustomPaddingOptions
        customWidth?: CustomWidthOptions
        customShape?: CustomShapeOptions
    }
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
    const mode = useAppSelector(getTheme)
    const isLight = mode === 'light'

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: isLight
                ? { ...palette.light, mode: 'light' }
                : { ...palette.dark, mode: 'dark' },
            shadow,
            shape,
            typography,
            breakpoints,
            customShadows: isLight ? customShadows.light : customShadows.dark,
            customPadding: {
                defaultPadding: '10px 16px 10px 16px',
            },
            customWidth: {
                layoutMaxWitdh: '1536px',
            },
            customShape,
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
