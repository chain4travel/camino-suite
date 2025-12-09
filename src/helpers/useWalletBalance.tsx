import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import store from 'wallet/store'
import { useSmartContract } from './useSmartContract'
const useWalletBalance = () => {
    const [balance, setBalance] = useState('')
    const [balanceWei, setBalanceWei] = useState<bigint>(BigInt(0))
    const [balanceOfAnAddress, setBalanceOfAnAddress] = useState('')
    const [error, setError] = useState(null)
    const { provider } = useSmartContract()

    async function getBalanceOfAnAddress(address: string) {
        const fetchedBalance = await provider.getBalance(address)
        setBalanceOfAnAddress(ethers.formatEther(fetchedBalance))
    }
    const fetchBalance = async () => {
        if (!provider || !store.state.activeWallet?.ethAddress) {
            setBalance(null)
            return
        }

        try {
            const fetchedBalance = await provider.getBalance(
                '0x' + store.state.activeWallet.ethAddress,
            )
            setBalanceWei(fetchedBalance)
            setBalance(ethers.formatEther(fetchedBalance))
        } catch (err) {
            console.error('Error fetching balance:', err)
            setError(err.message)
        }
    }
    useEffect(() => {
        fetchBalance()
    }, [provider])
    return { balance, balanceWei, error, balanceOfAnAddress, getBalanceOfAnAddress, fetchBalance }
}

export default useWalletBalance
