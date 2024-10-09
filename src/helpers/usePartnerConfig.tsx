import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { getActiveNetwork } from '../redux/slices/network'
import { updateCMAcocuntContract } from '../redux/slices/partner'
import { useSmartContract } from './useSmartContract'

export const usePartnerConfig = () => {
    const {
        readFromContract,
        writeToContract,
        account,
        managerWriteContract,
        setContractCMAccountAddress,
        accountWriteContract,
        managerReadContract,
        wallet,
        CMAccountCreated,
        contractCMAccountAddress,
        accountReadContract,
        provider,
    } = useSmartContract()
    const activeNetwork = useAppSelector(getActiveNetwork)
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const dispatch = useAppDispatch()

    async function CreateConfiguration(state) {
        if (!account) {
            console.error('Account is not initialized')
            return
        }
        try {
            let balance = ethers.parseEther(state.balance ? state.balance : '0')

            const tx = await writeToContract('manager', 'createCMAccount', account, account, {
                value: balance,
            })
            const event = tx.logs.find(log => {
                try {
                    return managerWriteContract.interface.parseLog(log).name === 'CMAccountCreated'
                } catch (e) {
                    return false
                }
            })

            const parsedEvent = managerWriteContract.interface.parseLog(event)
            const cmAccountAddress = parsedEvent.args.account
            await CMAccountCreated(cmAccountAddress)
            return tx
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const getAllServices = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }

        try {
            const services = await readFromContract('manager', 'getAllRegisteredServiceNames')
            return services
        } catch (error) {
            console.error('Error getting All Services:', error)
            throw error
        }
    }, [account, readFromContract])

    const getSupportedServices = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }

        try {
            const services = await readFromContract('account', 'getSupportedServices')
            return services
        } catch (error) {
            console.error('Error getting Supported Services:', error)
            throw error
        }
    }, [account, readFromContract])

    const getWantedServices = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }

        try {
            const wantedServices = await readFromContract('account', 'getWantedServices')
            return wantedServices
        } catch (error) {
            console.error('Error getting All Wanted Services:', error)
            throw error
        }
    }, [account, readFromContract])

    const getListOfBots = useCallback(async () => {
        try {
            const CHEQUE_OPERATOR_ROLE = await readFromContract('account', 'CHEQUE_OPERATOR_ROLE')
            const roleMemberCount = await readFromContract(
                'account',
                'getRoleMemberCount',
                CHEQUE_OPERATOR_ROLE,
            )

            const botPromises = []
            for (let i = 0; i < roleMemberCount; i++) {
                botPromises.push(accountReadContract.getRoleMember(CHEQUE_OPERATOR_ROLE, i))
            }

            const bots = await Promise.all(botPromises)
            return bots
        } catch (error) {
            throw error
        }
    }, [account, managerReadContract])

    const isCMAccount = useCallback(async () => {
        try {
            const CMACCOUNT_ROLE = await readFromContract('manager', 'CMACCOUNT_ROLE')
            const roleMemberCount = await readFromContract(
                'manager',
                'getRoleMemberCount',
                CMACCOUNT_ROLE,
            )
            let i = 0
            while (i < roleMemberCount) {
                managerReadContract.getRoleMember(CMACCOUNT_ROLE, i).then(async role => {
                    readFromContract('manager', 'getCMAccountCreator', role).then(creator => {
                        if (creator === wallet.address) {
                            setContractCMAccountAddress(role)
                            dispatch(updateCMAcocuntContract(role))
                        }
                    })
                })
                i++
            }
            return
        } catch (error) {
            throw error
        }
    }, [account, managerReadContract])

    useEffect(() => {
        if (wallet && auth) isCMAccount()
    }, [wallet, activeNetwork])

    const addServices = useCallback(
        async services => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                for (const service of services) {
                    const tx = await accountWriteContract.addService(
                        service.name,
                        ethers.parseEther(service.fee ? service.fee : '0'),
                        service.rackRates,
                        service.capabilities.filter(item => item !== ''),
                    )
                    await tx.wait()
                }
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const setServiceCapabilities = useCallback(
        async (service, capabilities) => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.setServiceCapabilities(service, capabilities)
                const receipt = await tx.wait()
                return receipt
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )
    const setServiceFee = useCallback(
        async (service, fee) => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.setServiceFee(service, fee)
                const receipt = await tx.wait()
                return receipt
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const setServiceRestrictedRate = useCallback(
        async (service, restrictedRate) => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.setServiceRestrictedRate(
                    service,
                    restrictedRate,
                )
                const receipt = await tx.wait()
                return receipt
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const removeServices = useCallback(
        async services => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                for (const service of services) {
                    const tx = await accountWriteContract.removeService(service.name)
                    await tx.wait()
                }
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const addMessengerBot = useCallback(
        async address => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const addMessengerBotTx = await accountWriteContract.addMessengerBot(address, 0n)
                await addMessengerBotTx.wait()
                return addMessengerBotTx
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, accountWriteContract],
    )

    const removeMessengerBot = useCallback(
        async address => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const removeMessengerBotTx = await accountWriteContract.removeMessengerBot(address)
                await removeMessengerBotTx.wait()
                return removeMessengerBotTx
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, accountWriteContract],
    )

    const addWantedServices = useCallback(
        async services => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const wantedServicesTx = await accountWriteContract.addWantedServices(services)
                await wantedServicesTx.wait()
                return wantedServicesTx
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, accountWriteContract],
    )
    const removeWantedServices = useCallback(
        async services => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const wantedServicesTx = await accountWriteContract.removeWantedServices(services)
                await wantedServicesTx.wait()
                return wantedServicesTx
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const checkWithDrawRole = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }
        try {
            const WITHDRAWER_ROLE = await readFromContract('account', 'WITHDRAWER_ROLE')
            const hasRole = await accountReadContract.hasRole(WITHDRAWER_ROLE, wallet.address)
            return hasRole
        } catch (error) {
            const decodedError = accountWriteContract.interface.parseError(error.data)
            console.error('Message:', error.message)
            console.error(`Reason: ${decodedError?.name} (${decodedError?.args})`)
        }
    }, [account, accountWriteContract, accountReadContract])
    const grantWithDrawRole = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }
        try {
            const WITHDRAWER_ROLE = await readFromContract('account', 'WITHDRAWER_ROLE')
            const tx = await accountWriteContract.grantRole(WITHDRAWER_ROLE, wallet.address)
            await tx.wait()
            return tx
        } catch (error) {
            const decodedError = accountWriteContract.interface.parseError(error.data)
            console.error('Message:', error.message)
            console.error(`Reason: ${decodedError?.name} (${decodedError?.args})`)
        }
    }, [account, accountWriteContract, readFromContract])

    const withDraw = useCallback(
        async (address, value) => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.withdraw(address, value)
                await tx.wait()
                return tx
            } catch (error) {
                const decodedError = accountWriteContract.interface.parseError(error.data)
                console.error('Message:', error.message)
                console.error(`Reason: ${decodedError?.name} (${decodedError?.args})`)
            }
        },
        [account, accountWriteContract],
    )

    const transferERC20 = useCallback(
        async (address, value) => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const abi = [
                    {
                        constant: true,
                        inputs: [{ name: '_owner', type: 'address' }],
                        name: 'balanceOf',
                        outputs: [{ name: 'balance', type: 'uint256' }],
                        type: 'function',
                    },
                ]

                // Create a contract instance
                const contract = new ethers.Contract(address, abi, provider)

                // Call the balanceOf function
                const balance = await contract.balanceOf(contractCMAccountAddress)
                const tx = await accountWriteContract.transferERC20(address, wallet.address, value)
                await tx.wait()
                const afterBalance = await contract.balanceOf(contractCMAccountAddress)
                const afterFormattedBalance = ethers.formatUnits(afterBalance, 18)
                return afterFormattedBalance
            } catch (error) {
                const decodedError = accountWriteContract.interface.parseError(error.data)
                console.error('Message:', error.message)
                console.error(`Reason: ${decodedError?.name} (${decodedError?.args})`)
            }
        },
        [account, accountWriteContract],
    )

    const setOffChainPaymentSupported = useCallback(
        async value => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.setOffChainPaymentSupported(value)
                await tx.wait()
                return tx
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, accountWriteContract],
    )

    const getOffChainPaymentSupported = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }
        try {
            const offChainPaymentSupported = await readFromContract(
                'account',
                'offChainPaymentSupported',
            )
            return offChainPaymentSupported
        } catch (error) {
            console.error(error)
            throw error
        }
    }, [account, readFromContract])

    const addSupportedToken = useCallback(
        async tokenID => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.addSupportedToken(tokenID)
                const receipt = await tx.wait()
                return receipt
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const removeSupportedToken = useCallback(
        async tokenID => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.removeSupportedToken(tokenID)
                const receipt = await tx.wait()
                return receipt
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        [account, writeToContract],
    )

    const getSupportedTokens = useCallback(async () => {
        if (!account) {
            console.error('Account is not initialized')
            return
        }
        try {
            const supportedTokens = await readFromContract('account', 'getSupportedTokens')
            return supportedTokens
        } catch (error) {
            console.error(error)
            throw error
        }
    }, [account, readFromContract])

    return {
        transferERC20,
        checkWithDrawRole,
        grantWithDrawRole,
        withDraw,
        setServiceFee,
        setServiceRestrictedRate,
        setServiceCapabilities,
        addSupportedToken,
        removeSupportedToken,
        getSupportedTokens,
        CreateConfiguration,
        account,
        removeWantedServices,
        getOffChainPaymentSupported,
        setOffChainPaymentSupported,
        getWantedServices,
        addWantedServices,
        getSupportedServices,
        addServices,
        removeServices,
        getAllServices,
        isCMAccount,
        addMessengerBot,
        getListOfBots,
        removeMessengerBot,
    }
}
