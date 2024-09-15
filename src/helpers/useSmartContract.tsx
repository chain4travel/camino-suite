import { ethers } from 'ethers'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import store from 'wallet/store'
import { useAppSelector } from '../hooks/reduxHooks'
import { getActiveNetwork } from '../redux/slices/network'
import CMAccount from './CMAccountManagerModule#CMAccount.json'
import CMAccountManager from './ManagerProxyModule#CMAccountManager.json'

const SmartContractContext = createContext<any>(null)

export const useSmartContract = () => useContext(SmartContractContext)

type SmartContractProviderProps = {
    children?: ReactNode
}

export const SmartContractProvider: React.FC<SmartContractProviderProps> = ({ children }) => {
    const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null)
    const [managerReadContract, setManagerReadContract] = useState<ethers.Contract | null>(null)
    const [managerWriteContract, setManagerWriteContract] = useState<ethers.Contract | null>(null)
    const [accountReadContract, setAccountReadContract] = useState<ethers.Contract | null>(null)
    const [accountWriteContract, setAccountWriteContract] = useState<ethers.Contract | null>(null)
    const [wallet, setWallet] = useState(null)
    const [account, setAccount] = useState<string | null>(null)
    const [contractCMAccountAddress, setContractCMAccountAddress] = useState<string | null>('')
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const contractCMAccountManagerAddress = '0xE5B2f76C778D082b07BDd7D51FFe83E3E055B47F'

    const CMAccountCreated = async (state, cmAccountAddress) => {
        const accountWritableContract = new ethers.Contract(cmAccountAddress, CMAccount, wallet)
        const accountReadOnlyContract = new ethers.Contract(cmAccountAddress, CMAccount, provider)

        if (!account) {
            console.error('Account is not initialized')
            return { success: false, error: 'Account is not initialized' }
        }
        try {
            console.log({ state, cmAccountAddress })
            for (const service of state.services) {
                const tx = await accountWritableContract.addService(
                    service.name,
                    service.fee,
                    service.rackRates,
                    service.capabilities,
                )
                await tx.wait()
            }

            if (state.wantedServices.length > 0) {
                const wantedServicesTx = await accountWritableContract.addWantedServices(
                    state.wantedServices,
                )
                await wantedServicesTx.wait()
            }
            if (state.isOffChainPayement) {
                const offChainPaymentTx = await accountWritableContract.setOffChainPaymentSupported(
                    state.isOffChainPayement,
                )
                await offChainPaymentTx.wait()
            }
            if (state.isCam) {
                const tx = await accountWriteContract.addSupportedToken(ethers.ZeroAddress)
                await tx.wait()
            }
            const WITHDRAWER_ROLE = await readFromContract('account', 'WITHDRAWER_ROLE')
            const tx = await accountWriteContract.grantRole(WITHDRAWER_ROLE, wallet.address)
            await tx.wait()
            setContractCMAccountAddress(cmAccountAddress)
            setAccountReadContract(accountReadOnlyContract)
            setAccountWriteContract(accountWritableContract)
            return { success: true, message: 'All operations completed successfully' }
        } catch (error) {
            const decodedError = accountWritableContract.interface.parseError(error.data)
            console.error('Message:', error.message)
            console.error(`Reason: ${decodedError?.name} (${decodedError?.args})`)
            return { success: false, error: error.message }
        }
    }

    const initializeCMAccountContract = async () => {
        if (!provider) return
        try {
            const accountWritableContract = new ethers.Contract(
                contractCMAccountAddress,
                CMAccount,
                wallet,
            )
            const accountReadOnlyContract = new ethers.Contract(
                contractCMAccountAddress,
                CMAccount,
                provider,
            )
            setAccountReadContract(accountReadOnlyContract)
            setAccountWriteContract(accountWritableContract)
        } catch (error) {
            console.error('User denied account access:', error)
        }
    }
    const initializeEthers = async () => {
        const selectedNetwork = store.getters['Network/selectedNetwork']
        const ethersProvider = new ethers.JsonRpcProvider(
            `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`,
        )
        try {
            const wallet = new ethers.Wallet(store.state.activeWallet?.ethKey, ethersProvider)
            const managerWritableContract = new ethers.Contract(
                contractCMAccountManagerAddress,
                CMAccountManager.abi,
                wallet,
            )
            const managerReadOnlyContract = new ethers.Contract(
                contractCMAccountManagerAddress,
                CMAccountManager.abi,
                ethersProvider,
            )
            setWallet(wallet)
            setProvider(ethersProvider)
            setManagerReadContract(managerReadOnlyContract)
            setManagerWriteContract(managerWritableContract)
            setAccount(wallet.address)
        } catch (error) {
            console.error('User denied account access:', error)
        }
    }
    const activeNetwork = useAppSelector(getActiveNetwork)

    useEffect(() => {
        if (auth) initializeEthers()
    }, [activeNetwork, auth])

    useEffect(() => {
        if (contractCMAccountAddress) initializeCMAccountContract()
    }, [provider, contractCMAccountAddress])

    const readFromContract = async (
        contractType: 'manager' | 'account',
        method: string,
        ...args: any[]
    ) => {
        const contract = contractType === 'manager' ? managerReadContract : accountReadContract
        if (!contract) {
            return
        }

        try {
            const result = await contract[method](...args)
            return result
        } catch (error) {
            console.error(`Error reading from ${contractType} contract (method: ${method}):`, error)
            throw error
        }
    }

    const writeToContract = async (
        contractType: 'manager' | 'account',
        method: string,
        ...args: any[]
    ) => {
        const contract = contractType === 'manager' ? managerWriteContract : accountWriteContract
        if (!contract) {
            return
        }

        try {
            const tx = await contract[method](...args)
            const receipt = await tx.wait()
            return receipt
        } catch (error) {
            console.error(`Error writing to ${contractType} contract (method: ${method}):`, error)
            throw error
        }
    }

    const value = {
        contractCMAccountAddress,
        setContractCMAccountAddress,
        wallet,
        provider,
        managerReadContract,
        managerWriteContract,
        accountReadContract,
        accountWriteContract,
        account,
        readFromContract,
        writeToContract,
        CMAccountCreated,
    }

    return <SmartContractContext.Provider value={value}>{children}</SmartContractContext.Provider>
}
