import { mdiInformationOutline } from '@mdi/js'
import Icon from '@mdi/react'
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    footerButtonBoxStyles,
    socialMediaIconBoxStyles,
    socialMediaIcons,
    socialMediaLinks,
} from '../../constants/footer-consts'
import { SUITE_RELEASES } from '../../constants/route-paths'
import Version from './Version'

const API_URL = 'https://storage.googleapis.com/camino-suite-static/footer-consts.json'

const Footer: React.FC = () => {
    const theme = useTheme()
    const year = new Date().getFullYear()

    const [footerData, setFooterData] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(API_URL)
                const data = await response.json()
                console.log(' ============> data', data)

                setFooterData(data)
            } catch (error) {
                setError(error)
            }
        }
        fetchData()
    }, [])

    if (error) return <div>Error loading footer data</div>
    if (!footerData) return <div>Loading...</div>

    return (
        <footer style={{ position: 'relative', marginTop: 'auto' }}>
            {theme.palette.mode !== 'light' && <Divider variant="fullWidth" />}
            <Paper
                sx={{
                    marginTop: 0,
                    marginBottom: 0,
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
                        paddingLeft: 0,
                        paddingRight: 0,
                        my: 0,
                    }}
                >
                    <Grid container spacing={4} justifyContent="space-between" sx={{ p: 3 }}>
                        <Grid container item xs={12} lg={6} spacing={4} justifyContent="flex-start">
                            <Grid item>
                                <Box sx={{ height: { xs: '32px', md: '44px' }, width: 'auto' }}>
                                    <img
                                        src={
                                            theme.palette.mode === 'light'
                                                ? '/assets/LightModeLogo.svg'
                                                : '/assets/DarkModeLogo.svg'
                                        }
                                        style={{ height: '100%', width: '100%' }}
                                        alt="camino logo"
                                    />
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
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex' }}>
                                    {footerData.SocialMediaLinks.map((link: any, index: number) => (
                                        <Link
                                            to={socialMediaLinks[link.url]}
                                            key={index}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Box sx={socialMediaIconBoxStyles(theme)}>
                                                {socialMediaIcons[link.icon]}
                                            </Box>
                                        </Link>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        gap: 3,
                                    }}
                                >
                                    {footerData.FooterButtons.map((button: any, index: number) => (
                                        <Link
                                            to={button.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={index}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Box sx={footerButtonBoxStyles(theme)}>
                                                <Typography variant="body2" component="span">
                                                    {button.name}
                                                </Typography>
                                            </Box>
                                        </Link>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} lg={6} spacing={2} justifyContent="flex-start">
                            {footerData.FooterLinks.map((link: any, index: number) => (
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
                                        {link.links.map((l: any, i: number) => (
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
                        backgroundColor: theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
                        color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
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

export default Footer
