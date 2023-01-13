import React, { useEffect, useRef } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { Grid, alpha } from "@mui/material";
import {
  mdiShieldKeyOutline,
  mdiListBoxOutline,
  mdiFileKeyOutline,
  mdiChevronRight,
  mdiWalletOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
// import { makeStyles, withStyles } from "tss-react/mui";
// import { red } from "@mui/material/colors";

// const useStyles = makeStyles((theme) => ({
//   link: {
//     color: theme.palette.text.primary,
//     textDecorationColor: "inherit",
//   },
// }));

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "32px",
          borderRadius: "18px",
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h2">Camino Application Suite</Typography>
        {/* Saved wallets section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="subtitle1">Saved Camino Wallets</Typography>
          <SavedWalletButton label="Daniel's Wallet" />
        </Box>
        {/* Access wallet section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="subtitle1">
            Access your Camino Wallets
          </Typography>
          <Grid container rowSpacing={2}>
            <Grid container item xs={12} justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <AccessActionButton to="/access/privateKey">
                  <Typography variant="body1">Private Key</Typography>
                  <Icon path={mdiShieldKeyOutline} size={1} />
                </AccessActionButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <AccessActionButton to="/access/mnemonic">
                  <Typography variant="body1">Mnemonic Key Phrase</Typography>
                  <Icon path={mdiListBoxOutline} size={1} />
                </AccessActionButton>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <AccessActionButton to="/access/keystore">
                  <Typography variant="body1">Keystore File</Typography>
                  <Icon path={mdiFileKeyOutline} size={1} />
                </AccessActionButton>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ cursor: "not-allowed" }}>
                <AccessActionButton disabled>
                  <Typography variant="body1">Ledger</Typography>
                  <Icon path={mdiListBoxOutline} size={1} />
                </AccessActionButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/* Actions section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="subtitle1">Don't have a wallet yet ?</Typography>
          <Button
            variant="contained"
            sx={{ p: ".75rem", width: "100%" }}
            href="/create"
          >
            <Typography variant="body1">Create a wallet</Typography>
          </Button>
          <Typography variant="body2" color="text.secondary">
            By using this application, you agree to the{" "}
            <Link to="/legal" /*className={useStyles().link}*/>
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Paper>
    </React.Suspense>
  );
}

function SavedWalletButton({ label }, props) {
  return (
    <Button
      variant="contained"
      sx={{
        p: ".75rem",
        width: "100%",
        bgcolor: "button.primary",
        padding: "1.25rem",
        justifyContent: "space-between",
        "&:hover": { bgcolor: "button.primary", opacity: ".8" },
      }}
      {...props}
    >
      <Typography
        variant="body1"
        sx={{ justifyContent: "center", gap: ".5rem", display: "flex" }}
      >
        <Icon path={mdiWalletOutline} size={1} />
        {label}
      </Typography>
      <Icon path={mdiChevronRight} size={1} />
    </Button>
  );
}

function AccessActionButton(props) {
  return (
    <Link to={props.to}>
      <Button
        variant="contained"
        sx={{
          p: ".75rem",
          width: "100%",
          bgcolor: "button.secondary",
          padding: "1.25rem",
          justifyContent: "space-between",
          "&:hover": { bgcolor: "button.secondary", opacity: ".8" },
          "&:disabled": {
            opacity: ".3",
            bgcolor: "button.secondary",
            cursor: "not-allowed",
          },
        }}
        {...props}
      >
        {props.children}
      </Button>
    </Link>
  );
}
