import { merge } from 'lodash'
import { Theme } from '@mui/material/styles'
import AppBar from './AppBar'
import Select from './Select'
import MenuList from './MenuList'
import Toolbar from './Toolbar'
import Button from './Button'
import Modal from './Modal'
import TextField from './TextField'
import CssBaseline from './CssBaseline'
import Paper from './Paper'
import Drawer from './Drawer'
import Input from './Input'
import DialogActions from './DialogActions'
import Tab from './Tab'

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
