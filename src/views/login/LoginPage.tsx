import { mdiFileKeyOutline, mdiListBoxOutline, mdiShieldKeyOutline } from '@mdi/js'
import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Icon from '@mdi/react'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { mountAccounts } from 'wallet/mountAccounts'
import { TERMS_OF_USE_URL } from '../../constants/route-paths'

const StyledExternalLink = styled('a')(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'underline !important',
    mx: '.5rem',
}))

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'underline !important',
    mx: '.5rem',
}))

const AccessActionButton = props => {
    const navigate = useNavigate()
    return (
        <Button
            variant="contained"
            sx={{
                p: '.75rem',
                width: '100%',
                bgcolor: 'transparent',
                padding: '1.25rem',
                justifyContent: 'flex-start',
                borderWidth: 1,
                borderStyle: 'solid',
                gap: '1rem',
                borderColor: theme => theme.palette.divider,
                '&:hover': {
                    borderWidth: 1,
                    color: theme => theme.palette.grey[950],
                    backgroundColor: theme =>
                        theme.palette.mode === 'dark' ? '#FFF' : theme.palette.grey[300],
                },
                '&:disabled': {
                    opacity: '.3',
                    backgroundColor: 'transparent',
                    cursor: 'not-allowed',
                },
            }}
            onClick={() => navigate(props.to)}
            {...props}
        >
            {props.children}
        </Button>
    )
}

const LoadAccountMenu = () => {
    const ref = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        mountAccounts(ref.current, {
            navigate: location => navigate(location),
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div ref={ref} />
        </div>
    )
}

export default function LoginPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Box sx={{ py: 4, maxWidth: '700px' }}>
                <Typography variant="h2" textAlign="center">
                    Camino Wallet Login
                </Typography>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: '32px',
                        borderRadius: '18px',
                        gap: '1rem',
                        my: '2rem',
                        '@media (max-width: 600px)': {
                            p: '20px',
                        },
                    }}
                >
                    <LoadAccountMenu />
                    {/* Access wallet section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography variant="body2" textTransform="uppercase">
                            Access your Camino Wallets
                        </Typography>
                        <Grid container rowSpacing={2}>
                            <Grid container item xs={12} justifyContent="center" spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <AccessActionButton
                                        data-cy="btn-wallet-access-private-key"
                                        to="/access/privateKey"
                                    >
                                        <Icon path={mdiShieldKeyOutline} size={1} />
                                        <Typography variant="body2">Private Key</Typography>
                                    </AccessActionButton>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AccessActionButton
                                        data-cy="btn-wallet-access-mnemonic"
                                        to="/access/mnemonic"
                                    >
                                        <Icon path={mdiListBoxOutline} size={1} />
                                        <Typography variant="body2">Mnemonic Key Phrase</Typography>
                                    </AccessActionButton>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} justifyContent="center" spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <AccessActionButton to="/access/keystore">
                                        <Icon path={mdiFileKeyOutline} size={1} />
                                        <Typography variant="body2">Keystore File</Typography>
                                    </AccessActionButton>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ cursor: 'not-allowed' }}>
                                    <AccessActionButton disabled>
                                        <Icon path={mdiListBoxOutline} size={1} />
                                        <Typography variant="body2">Ledger</Typography>
                                    </AccessActionButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Actions section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography variant="body2" textTransform="uppercase">
                            Don't have a wallet yet ?
                        </Typography>
                        <StyledLink to="/create" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                sx={{ p: '.75rem', width: '100%' }}
                                data-cy="btn-redirect-create-wallet"
                            >
                                <Typography variant="body2" color="white">
                                    Create a wallet
                                </Typography>
                            </Button>
                        </StyledLink>
                        <Typography variant="caption" color="text.secondary" textAlign="center">
                            By using this application, you agree to the&nbsp;
                            <StyledExternalLink
                                href={TERMS_OF_USE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                Terms of Use
                            </StyledExternalLink>
                            &nbsp;and&nbsp;
                            <StyledExternalLink
                                href="https://camino.network/privacy-policy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                Privacy Policy
                            </StyledExternalLink>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </React.Suspense>
    )
}
