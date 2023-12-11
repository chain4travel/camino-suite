import React from 'react'
import {
    Box,
    Grid,
    Typography,
    useTheme,
    Divider,
    Container,
    MenuItem,
    Tooltip,
    Fade,
} from '@mui/material'
import {
    DOCS,
    TWITTER,
    TELEGRAM_CAMINO,
    TELEGRAM_ANNOUNCEMENTS,
    MEDIUM,
    GITHUB,
    DISCORD,
    CAMINO,
    SUITE_RELEASES,
} from '../../constants/route-paths'
import { Link } from 'react-router-dom'
import { mdiInformationOutline } from '@mdi/js'
import Icon from '@mdi/react'
import Version from './Version'

export default function Footer() {
    const theme = useTheme()
    return (
        <footer style={{ position: 'relative', marginTop: 'auto' }}>
            {theme.palette.mode !== 'light' && <Divider variant="fullWidth" />}
            <Box
                sx={{
                    backgroundColor: theme.palette.mode !== 'light' ? 'grey.800' : 'white',
                    p: '24px',
                    marginTop: '0px',
                    marginBottom: '0px',
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        marginTop: '15px',
                        paddingLeft: '0px !important',
                        paddingRight: '0px !important',
                        my: '0px !important',
                    }}
                >
                    <Grid container spacing={4} justifyContent="space-between">
                        <Grid
                            container
                            item
                            xs={12}
                            md={6}
                            spacing={4}
                            justifyContent={{ xs: 'center', md: 'left' }}
                        >
                            <Grid item>
                                {theme.palette.mode === 'light' ? (
                                    <img
                                        src="/assets/LightModeLogo.svg"
                                        style={{ height: '40px', width: 'auto' }}
                                        alt="camino logo"
                                    />
                                ) : (
                                    <img
                                        src="/assets/DarkModeLogo.svg"
                                        style={{ height: '40px', width: 'auto' }}
                                        alt="camino logo"
                                    />
                                )}
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        color: 'grey.500',
                                        textAlign: { xs: 'center', md: 'left' },
                                    }}
                                >
                                    Camino is a fast, high-throughput open-source consortium
                                    blockchain enabling the creation of travel-related products.
                                    Camino’s tech stack and consensus protocol deliver unmatched
                                    speed, security, and reliability within the network.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            md={6}
                            spacing={2}
                            justifyContent={{ xs: 'space-around', md: 'left' }}
                        >
                            {FooterLinks.map((link, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    xl={4}
                                    key={index}
                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        fontWeight="fontWeightBold"
                                        sx={{
                                            marginBottom: '.5rem',
                                            fontSize: '1.25rem',
                                            justifyContent: { xs: 'center', md: 'left' },
                                            display: 'flex',
                                        }}
                                    >
                                        {link.name}
                                    </Typography>
                                    <ul style={{ display: 'grid', gap: '7px' }}>
                                        {link.links.map((l, i) => (
                                            <MenuItem
                                                sx={{
                                                    textDecoration: 'none',
                                                    listStyle: 'none',
                                                    p: 0,
                                                    minHeight: 'auto',
                                                    justifyContent: { xs: 'center', md: 'left' },
                                                    '&:hover': { backgroundColor: 'transparent' },
                                                }}
                                                disableRipple
                                                key={i}
                                            >
                                                <Link
                                                    to={l.url}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        component="span"
                                                        sx={{ color: 'grey.500' }}
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
                    <Divider sx={{ mt: 2 }} variant="fullWidth" />
                    <Grid container sx={{ mt: 2 }} justifyContent="space-between">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{
                                    textAlign: { xs: 'center', md: 'left' },
                                }}
                            >
                                Camino Network Foundation &copy; 2023
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '.5rem',
                                    justifyContent: { xs: 'center', md: 'flex-end' },
                                }}
                            >
                                <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={<Version />}
                                    placement="top"
                                    PopperProps={{
                                        sx: {
                                            '& .MuiTooltip-tooltip': {
                                                maxWidth: '500px !important',
                                            },
                                        },
                                    }}
                                >
                                    <Icon path={mdiInformationOutline} size={0.85} />
                                </Tooltip>

                                <Link
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    to={SUITE_RELEASES}
                                >
                                    <Typography variant="body2" component="p" color="inherit">
                                        {process.env.VERSION}
                                    </Typography>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}

const FooterLinks = [
    {
        name: 'Community',
        links: [
            {
                text: 'Discord',
                url: DISCORD,
            },
            {
                text: 'Twitter',
                url: TWITTER,
            },
            {
                text: 'Telegram Camino Network',
                url: TELEGRAM_CAMINO,
            },
            {
                text: 'Telegram Announcements',
                url: TELEGRAM_ANNOUNCEMENTS,
            },
        ],
    },
    {
        name: 'More',
        links: [
            {
                text: 'Github',
                url: GITHUB,
            },
            {
                text: 'Medium',
                url: MEDIUM,
            },
            {
                text: 'Documentation',
                url: DOCS,
            },
            {
                text: 'Camino Network Website',
                url: CAMINO,
            },
        ],
    },
]
