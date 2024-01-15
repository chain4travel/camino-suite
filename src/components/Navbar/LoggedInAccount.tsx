import { mdiWalletOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useEffect } from 'react'
import { getNameOfWallet, getPchainAddress } from '../../helpers/walletStore'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getWalletName, updatePchainAddress } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import LongString from '../LongString'

const LoggedInAccount = () => {
    const walletName = useAppSelector(getWalletName)
    const activeNetwork = useAppSelector(getActiveNetwork)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(
            updatePchainAddress({ address: getPchainAddress(), walletName: getNameOfWallet() }),
        )
    }, [activeNetwork])
    return (
        <>
            <Icon path={mdiWalletOutline} size={1} />
            <LongString value={walletName} />
        </>
    )
}
export default LoggedInAccount
