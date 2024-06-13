import {
    Box,
    Container,
    Divider,
    Fade,
    Grid,
    MenuItem,
    Paper,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import { FooterButtons, FooterLinks, SocialMediaLinks } from '../../constants/footer-consts'

import { mdiInformationOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SUITE_RELEASES } from '../../constants/route-paths'
import Version from './Version'

export default function Footer() {
    const theme = useTheme()
    const year = new Date().getFullYear()
    return (
        <footer style={{ position: 'relative', marginTop: 'auto' }}>
            {theme.palette.mode !== 'light' && <Divider variant="fullWidth" />}
            <Paper
                sx={{
                    marginTop: '0px',
                    marginBottom: '0px',
                    border: 'none',
                    borderRadius: 0,
                    boxShadow: 0,
                }}
            >
                <Container
                    // @ts-ignore
                    maxWidth="xxl"
                    sx={{
                        marginTop: '15px',
                        paddingLeft: '0px !important',
                        paddingRight: '0px !important',
                        my: '0px !important',
                    }}
                >
                    <Grid container spacing={4} justifyContent="space-between" sx={{ p: '24px' }}>
                        <Grid container item xs={12} lg={6} spacing={4} justifyContent="left">
                            <Grid item>
                                <Box sx={{ height: { xs: '32px', md: '44px' }, width: 'auto' }}>
                                    {theme.palette.mode === 'light' ? (
                                        <img
                                            src="/assets/LightModeLogo.svg"
                                            style={{ height: '100%', width: '100%' }}
                                            alt="camino logo"
                                        />
                                    ) : (
                                        <img
                                            src="/assets/DarkModeLogo.svg"
                                            style={{ height: '100%', width: '100%' }}
                                            alt="camino logo"
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    sx={{ color: 'grey.400', textAlign: 'left' }}
                                >
                                    Camino is the travel industry blockchain. Fueled by the Camino
                                    token, it is offering a versatile network to expand current
                                    business models and to create new touristic products to delight
                                    travelers and business partners.
                                </Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Box sx={{ display: 'flex' }}>
                                    {SocialMediaLinks.map((link, index) => (
                                        <Link
                                            to={link.url}
                                            key={index}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '.75rem',
                                                    color: theme => theme.palette.text.primary,
                                                    padding: '.5rem',
                                                    '&:hover': {
                                                        backgroundColor: theme =>
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.grey[700]
                                                                : theme.palette.grey[200],
                                                    },
                                                }}
                                            >
                                                {link.icon}
                                            </Box>
                                        </Link>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid xs={12} item>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        gap: 3,
                                    }}
                                >
                                    {FooterButtons.map((button, index) => (
                                        <Link
                                            to={button.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={index}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Box
                                                sx={{
                                                    p: '.5rem 1rem',
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    color: theme => theme.palette.text.primary,
                                                    backgroundColor: theme =>
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.grey[900]
                                                            : theme.palette.grey[100],
                                                    borderRadius: '.75rem',
                                                    '&:hover': {
                                                        borderWidth: '1px',
                                                        color: theme => theme.palette.grey[950],
                                                        backgroundColor: theme =>
                                                            theme.palette.mode === 'dark'
                                                                ? '#FFF'
                                                                : theme.palette.grey[300],
                                                    },
                                                }}
                                            >
                                                <Typography variant="body2" component="span">
                                                    {button.name}
                                                </Typography>
                                            </Box>
                                        </Link>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} lg={6} spacing={2} justifyContent="left">
                            {FooterLinks.map((link, index) => (
                                <Grid item md key={index}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        fontWeight="fontWeightBold"
                                        sx={{ whiteSpace: 'nowrap', fontWeight: 'bolder' }}
                                    >
                                        {link.name}
                                    </Typography>
                                    <ul style={{ display: 'grid', gap: '5px', marginTop: '.5rem' }}>
                                        {link.links.map((l, i) => (
                                            <MenuItem
                                                sx={{
                                                    textDecoration: 'none',
                                                    listStyle: 'none',
                                                    p: 0,
                                                    minHeight: 'auto',
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
                                                        sx={{ color: 'grey.400' }}
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
                <Box
                    sx={{
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
                        color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700'),
                    }}
                >
                    <Container maxWidth="xl">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                p: '1rem',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="p"
                                sx={{ textAlign: 'center' }}
                            >
                                &copy; {year} Camino Network Foundation. All rights reserved.
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '.5rem',
                                    justifyContent: 'center',
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
                                    <Icon path={mdiInformationOutline} size={0.65} />
                                </Tooltip>

                                <Link
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    to={SUITE_RELEASES}
                                >
                                    <Typography variant="caption" component="span" color="inherit">
                                        {process.env.VERSION}
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Paper>
        </footer>
    )
}
