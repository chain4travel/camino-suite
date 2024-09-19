import { Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { NetworkID, getActiveNetwork, selectNetworkStatus } from '../../redux/slices/network'
import CamBadge from '../CamBadge'

const networkStatusColor = (status: string) => {
    switch (status) {
        case 'idle':
            return '#F19D38'
        case 'loading':
            return '#F19D38'
        case 'succeeded':
            return '#35E9AD'
        case 'failed':
            return '#DD5E56'
        default:
            return '#F19D38'
    }
}

const networkChip = (networkId: NetworkID) => {
    if (networkId === NetworkID.MAINNET) {
        return 'mainnet'
    } else if (networkId === NetworkID.TESTNET) {
        return 'testnet'
    } else {
        return 'custom'
    }
}

export default function SelectedNetwork() {
    const status = useAppSelector(selectNetworkStatus)
    const activeNetwork = useAppSelector(getActiveNetwork)
    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
                sx={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: networkStatusColor(status),
                }}
            />
            <Typography
                variant="body2"
                component="span"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {activeNetwork?.name}
            </Typography>
            <CamBadge
                size="small"
                variant="verified"
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
                label={networkChip(activeNetwork?.networkId)}
            />
        </Box>
    )
}
