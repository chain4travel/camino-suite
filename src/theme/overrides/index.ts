import { Theme } from '@mui/material/styles'
import { merge } from 'lodash'
import AppBar from './AppBar'
import Button from './Button'
import CssBaseline from './CssBaseline'
import DialogActions from './DialogActions'
import Drawer from './Drawer'
import Input from './Input'
import MenuList from './MenuList'
import Modal from './Modal'
import Paper from './Paper'
import Select from './Select'
import Tab from './Tab'
import TextField from './TextField'
import Toolbar from './Toolbar'

export default function ComponentsOverrides(theme: Theme) {
    return merge(
        AppBar(theme),
        Toolbar(theme),
        Select(theme),
        MenuList(theme),
        Button(theme),
        Modal(theme),
        TextField(theme),
        CssBaseline(theme),
        Paper(theme),
        Drawer(theme),
        Input(theme),
        DialogActions(theme),
        Tab(theme),
    )
}
