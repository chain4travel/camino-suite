import { mdiWalletOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import store from 'wallet/store'
import { getNameOfWallet, getPchainAddress } from '../../helpers/walletStore'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getWalletName, getWalletStore, updatePchainAddress } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import CamBadge from '../CamBadge'
import LongString from '../LongString'

const LoggedInAccount = () => {
    const walletName = useAppSelector(getWalletName)
    const activeNetwork = useAppSelector(getActiveNetwork)
    const walletStore = useAppSelector(getWalletStore)
    const [hasPendingTx, setHasPendingTx] = useState<boolean>(false)
    const adr = getPchainAddress()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            updatePchainAddress({ address: getPchainAddress(), walletName: getNameOfWallet() }),
        )
    }, [activeNetwork])

    useEffect(() => {
        checkPendingTx()
    }, [adr])

    const checkPendingTx = async () => {
        await store.dispatch('Signavault/updateTransaction')
        if (walletStore?.Signavault?.transactions) {
            setHasPendingTx(walletStore.Signavault.transactions.length > 0)
        }
    }

    return (
        <Box sx={{ position: 'relative', display: 'flex', gap: 1, alignItems: 'center' }}>
            {hasPendingTx && (
                <CamBadge
                    size="small"
                    variant="warning"
                    sx={{
                        position: 'absolute',
                        top: -16,
                        right: 0,
                    }}
                    label={'Pending Tx'}
                />
            )}
            <Icon path={mdiWalletOutline} size={1} />
            <LongString value={walletName} />
        </Box>
    )
}
export default LoggedInAccount
