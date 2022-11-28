import { merge } from "lodash";
import { Theme } from "@mui/material/styles";
import AppBar from "./AppBar";
import Select from "./Select";
import MenuList from "./MenuList";
import Toolbar from "./Toolbar";
import Button from "./Button";
import Modal from "./Modal";
import TextField from "./TextField";
import CssBaseline from "./CssBaseline";
import Paper from "./Paper";

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
    Paper(theme)
  );
}
