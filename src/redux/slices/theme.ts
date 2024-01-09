import { createSlice } from '@reduxjs/toolkit'

interface ITheme {
    theme: string
}

const getThemeFromLocalStorage = () => {
    let theme = localStorage.getItem('theme') || undefined

    if (theme) return theme
    else {
        localStorage.setItem('theme', 'light')
        return 'light'
    }
}

let initialState: ITheme = {
    theme: getThemeFromLocalStorage(),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: state => {
            localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light')
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
        getTheme: state => {
            state.theme = getThemeFromLocalStorage()
        },
    },
})

export const getTheme = (state: any) => state.theme.theme

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
