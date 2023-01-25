import React from "react";
import { forwardRef } from "react";
import { IconButton, IconButtonProps } from "@mui/material";

const MIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, ...other }, ref) => (
    <IconButton ref={ref} {...other}>
      {children}
    </IconButton>
  )
);

export default MIconButton;
