import { mdiWalletOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useEffect, useState } from 'react'
import {
    getNameOfMultiSigWallet,
    getPchainAddress,
    isMultiSigWallet,
} from '../../helpers/walletStore'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getPChainAddress } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import LongString from '../LongString'

const LoggedInAccount = () => {
    const [walletName, setWalletName] = useState('')
    const pChainAddress = useAppSelector(getPChainAddress)
    const activeNetwork = useAppSelector(getActiveNetwork)

    useEffect(() => {
        if (isMultiSigWallet()) {
            setWalletName(getNameOfMultiSigWallet() || getPchainAddress()[0])
        } else setWalletName(getPchainAddress()[0])
    }, [pChainAddress, activeNetwork])
    return (
        <>
            <Icon path={mdiWalletOutline} size={1} />
            <LongString value={walletName} />
        </>
    )
}
export default LoggedInAccount
