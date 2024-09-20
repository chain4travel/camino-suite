import { ethers } from 'ethers'
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import store from 'wallet/store'
import { useAppSelector } from '../hooks/reduxHooks'
import { getActiveNetwork } from '../redux/slices/network'
import CMAccount from './CMAccountManagerModule#CMAccount.json'
import CMAccountManager from './ManagerProxyModule#CMAccountManager.json'

const IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'

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

    const CMAccountCreated = async cmAccountAddress => {
        const accountWritableContract = new ethers.Contract(cmAccountAddress, CMAccount, wallet)
        const accountReadOnlyContract = new ethers.Contract(cmAccountAddress, CMAccount, provider)

        if (!account) {
            console.error('Account is not initialized')
            return { success: false, error: 'Account is not initialized' }
        }
        try {
            const WITHDRAWER_ROLE = await accountReadOnlyContract.WITHDRAWER_ROLE()
            const tx = await accountWritableContract.grantRole(WITHDRAWER_ROLE, wallet.address)
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

    const upgradeCMAccount = useCallback(async () => {
        try {
            if (accountWriteContract) {
                const implementation = await managerReadContract.getAccountImplementation()

                const implAddrPadded = await provider.getStorage(
                    contractCMAccountAddress,
                    IMPLEMENTATION_SLOT,
                )
                const implAddr = '0x' + implAddrPadded.slice(-40)
                console.log({ implementation, implAddr })
                const tx = await accountWriteContract.upgradeToAndCall(implementation, '0x')
                const receipt = await tx.wait()
                console.log({ receipt })
                return receipt
            }
        } catch (error) {
            const decodedError = accountWriteContract.interface.parseError(error.data)
            console.error('Message:', error.message)
            console.error(`Reason: ${decodedError?.name} (${decodedError?.args})`)
        }
    }, [accountWriteContract])

    const initializeEthers = async () => {
        const selectedNetwork = store.getters['Network/selectedNetwork']
        const ethersProvider = new ethers.JsonRpcProvider(
            `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`,
        )
        try {
            if (auth) {
                const wallet = new ethers.Wallet(store.state.activeWallet?.ethKey, ethersProvider)
                const managerWritableContract = new ethers.Contract(
                    contractCMAccountManagerAddress,
                    CMAccountManager.abi,
                    wallet,
                )
                setManagerWriteContract(managerWritableContract)
                setWallet(wallet)
                setAccount(wallet.address)
            }
            const managerReadOnlyContract = new ethers.Contract(
                contractCMAccountManagerAddress,
                CMAccountManager.abi,
                ethersProvider,
            )
            setProvider(ethersProvider)
            setManagerReadContract(managerReadOnlyContract)
        } catch (error) {
            console.error('User denied account access:', error)
        }
    }
    const activeNetwork = useAppSelector(getActiveNetwork)

    useEffect(() => {
        if (activeNetwork.name.toLowerCase() === 'columbus') initializeEthers()
    }, [activeNetwork, auth])

    useEffect(() => {
        if (contractCMAccountAddress) initializeCMAccountContract()
    }, [provider, contractCMAccountAddress])

    const getCMAccountMappings = useCallback(async () => {
        try {
            console.log('called?')
            const mappings = new Map()
            const CMACCOUNT_ROLE = await readFromContract('manager', 'CMACCOUNT_ROLE')
            const roleMemberCount = await readFromContract(
                'manager',
                'getRoleMemberCount',
                CMACCOUNT_ROLE,
            )

            const promises = []
            for (let i = 0; i < roleMemberCount; i++) {
                promises.push(
                    managerReadContract.getRoleMember(CMACCOUNT_ROLE, i).then(async role => {
                        const creator = await readFromContract(
                            'manager',
                            'getCMAccountCreator',
                            role,
                        )
                        return { role, creator }
                    }),
                )
            }

            const results = await Promise.all(promises)
            results.forEach(({ role, creator }) => {
                mappings.set(role.toLowerCase(), creator.toLowerCase())
            })

            const findAddress = query => {
                query = query.toLowerCase()
                if (mappings.has(query)) {
                    return { role: query, creator: mappings.get(query) }
                }
                for (const [role, creator] of mappings) {
                    if (creator === query) {
                        return { role, creator: query }
                    }
                }
                return null
            }

            return {
                findAddress,
                getAllMappings: () => Object.fromEntries(mappings),
            }
        } catch (error) {
            console.error('Error in getCMAccountMappings:', error)
            throw error
        }
    }, [managerReadContract])

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
        getCMAccountMappings,
        upgradeCMAccount,
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
