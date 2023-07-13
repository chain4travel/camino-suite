import React from 'react'
import WalletVersionComponent from './LoadWalletVersion'
import { Box, Typography } from '@mui/material'
import { useStore } from 'Explorer/useStore'
import { Link } from 'react-router-dom'
import { SUITE, SUITE_EXPLORER, SUITE_WALLET } from '../../constants/route-paths'

const LinkButton = ({ children, type, to }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <Typography variant="body1" component="p">
                {type}
            </Typography>
            <Link
                rel="noopener noreferrer"
                target="_blank"
                style={{ textDecoration: 'none' }}
                to={to}
            >
                <Typography variant="body2" component="p" color={'primary'}>
                    {children}
                </Typography>
            </Link>
        </Box>
    )
}

const Version = () => {
    const { state } = useStore()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <LinkButton type="Suite" to={SUITE}>
                {process.env.GIT_COMMIT_HASH}
            </LinkButton>
            <LinkButton type="Wallet" to={SUITE_WALLET}>
                <WalletVersionComponent />
            </LinkButton>
            <LinkButton type="Explorer" to={SUITE_EXPLORER}>
                {state.appConfig.commitHash}
            </LinkButton>
        </Box>
    )
}

export default Version
