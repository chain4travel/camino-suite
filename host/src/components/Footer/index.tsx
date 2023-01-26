import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  useTheme,
  Divider,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import {
  CCHAIN,
  XCHAIN,
  PCHAIN,
  DOCS,
  TWITTER,
  TELEGRAM,
  MEDIUM,
  GITHUB,
  DISCORD,
  WALLET,
} from "../../constants/route-paths";

export default function Footer() {
  const theme = useTheme();
  return (
    <footer style={{ position: "relative", marginTop: "auto" }}>
      {theme.palette.mode !== "light" && <Divider variant="fullWidth" />}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode !== "light" ? "grey.800" : "white",
          p: "24px",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            marginTop: "15px",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            my: "0px !important",
          }}
        >
          <Grid container spacing={4}>
            <Grid
              container
              item
              xs={12}
              xl={6}
              spacing={4}
              justifyContent={{ xs: "center", md: "left" }}
            >
              <Grid item>
                {theme.palette.mode === "light" ? (
                  <img
                    src="/assets/LogoDark.svg"
                    style={{ height: "40px", width: "auto" }}
                    alt="camino logo"
                  />
                ) : (
                  <img
                    src="/assets/LogoLight.svg"
                    style={{ height: "40px", width: "auto" }}
                    alt="camino logo"
                  />
                )}
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color: "grey.500",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Camino is a fast, high-through put open-source consortium
                  blockchain enabling the creation of travel related products.
                  Camino’s tech stack and consensus protocol deliver unmatched
                  speed, security and reliability within the network.
                </Typography>
              </Grid>
              <Grid
                item
                container
                spacing={{ xs: 2, md: 1, lg: 2 }}
                justifyContent={{ xs: "center", md: "left" }}
              >
                <Grid
                  item
                  container
                  xs={12}
                  sm="auto"
                  justifyContent={{ xs: "center", md: "left" }}
                >
                  <SecondaryButton label="Camino Wallet" toLink={WALLET} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  sm="auto"
                  justifyContent={{ xs: "center", md: "left" }}
                >
                  <SecondaryButton
                    label="Join Discord"
                    toLink={DISCORD}
                    target="_blank"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} xl={6} spacing={2}>
              {FooterLinks.map((link, index) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  key={index}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="subtitle1"
                    component="span"
                    fontWeight="fontWeightBold"
                    sx={{
                      marginBottom: ".5rem",
                      fontSize: "1.25rem",
                      justifyContent: { xs: "center", md: "left" },
                      display: "flex",
                    }}
                  >
                    {link.name}
                  </Typography>
                  <ul style={{ display: "grid", gap: "7px" }}>
                    {link.links.map((l, i) => (
                      <MenuItem
                        sx={{
                          textDecoration: "none",
                          listStyle: "none",
                          p: 0,
                          minHeight: "auto",
                          justifyContent: { xs: "center", md: "left" },
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        key={i}
                      >
                        <Link
                          href={l.url}
                          style={{
                            color: "secondary.primary",
                            display: "flex",
                            textDecoration: "none",
                          }}
                        >
                          <Typography
                            variant="body1"
                            component="span"
                            sx={{ color: "grey.500" }}
                          >
                            {l.text}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

const SecondaryButton = ({
  label,
  toLink,
  target,
}: {
  label: string;
  toLink: string;
  target?: string;
}) => (
  <Button
    variant="contained"
    href={toLink}
    target={target}
    sx={{
      backgroundColor: "#2563eb",
      p: ".5rem 1rem",
      color: "white",
      "&:hover": {
        backgroundColor: "#b5e3fd",
        color: "#0f172a",
      },
    }}
  >
    <Typography variant="body1" component="span" fontWeight="fontWeightBold">
      {label}
    </Typography>
  </Button>
);

const FooterLinks = [
  {
    name: "Platform",
    links: [
      {
        text: "C-Chain",
        url: CCHAIN,
      },
      {
        text: "X-Chain",
        url: XCHAIN,
      },
      {
        text: "P-Chain",
        url: PCHAIN,
      },
      {
        text: "Documentation",
        url: DOCS,
      },
    ],
  },
  {
    name: "Community",
    links: [
      {
        text: "Discord",
        url: DISCORD,
      },
      {
        text: "Twitter",
        url: TWITTER,
      },
      {
        text: "Telegram",
        url: TELEGRAM,
      },
    ],
  },
  {
    name: "More",
    links: [
      {
        text: "Github",
        url: GITHUB,
      },
      {
        text: "Medium",
        url: MEDIUM,
      },
    ],
  },
];
