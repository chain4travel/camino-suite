import { mdiWalletOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
    const [test, setTest] = useState<any>()
    const adr = getPchainAddress()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            updatePchainAddress({ address: getPchainAddress(), walletName: getNameOfWallet() }),
        )

        console.log('Wallet store: ', walletStore)

        setTest(walletStore?.Signavault)
    }, [activeNetwork, walletStore, walletName])

    useEffect(() => {
        console.log('Test: ', test)
        console.log('Test transactions: ', test?.transactions)
        if (test && test.transactions.length > 0) {
            setHasPendingTx(true)
        } else setHasPendingTx(false)
    }, [test, walletName, adr])

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
