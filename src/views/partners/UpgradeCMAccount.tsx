import { Box, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import MainButton from '../../components/MainButton'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { updateNotificationStatus } from '../../redux/slices/app-config'

const UpgradeCMAccount = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { contractCMAccountAddress, upgradeCMAccount } = useSmartContract()
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const appDispatch = useAppDispatch()
    if (!auth) return <Navigate to="/login" replace></Navigate>
    async function upgrade() {
        setLoading(true)
        await upgradeCMAccount()
        appDispatch(
            updateNotificationStatus({
                message: 'Camion Messenger account upgraded successfully.',
                severity: 'success',
            }),
        )
        setLoading(false)
        navigate('/partners/messenger-configuration/mymessenger')
    }
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                height: '100%',
            }}
        >
            <Typography variant="h5">Housekeeping needed</Typography>
            <Typography variant="body2" textAlign={'center'}>
                new implementation of the Camino Messenger Account smart contract is available.
                While current functionality is not disrupted, we need your confirmation to upgrade
                you to the new smart contrtact. This operation will incur a minimal cost (0.02 CAM).
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
                Upgrade Camino Messenger Account {contractCMAccountAddress},
                <Link
                    component="a"
                    sx={{
                        color: theme => theme.palette.text.primary,
                        textDecorationColor: 'inherit',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/partners/messenger-configuration/mymessenger')}
                >
                    {' '}
                    or Skip and go to My Account.
                </Link>
            </Typography>
            <MainButton
                loading={loading}
                variant="contained"
                onClick={upgrade}
                style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg, #0085FF 0%, #B440FC 100%)',
                    backgroundColor: theme =>
                        theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                }}
            >
                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                    Upgrade
                </Typography>
            </MainButton>
        </Box>
    )
}

export default UpgradeCMAccount
