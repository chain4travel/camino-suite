import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'
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
        accountReadContract,
    } = useSmartContract()

    const dispatch = useAppDispatch()

    async function CreateConfiguration(state) {
        if (!account) {
            console.error('Account is not initialized')
            return
        }
        try {
            let balance = ethers.parseEther(state.balance ? state.balance : '0')
            let services = state.stepsConfig[1].services.map(elem => {
                return {
                    ...elem,
                    fee: ethers.parseEther(elem.fee ? elem.fee : '0'),
                    capabilities: elem.capabilities.filter(item => item !== ''),
                }
            })
            let wantedServices = state.stepsConfig[2].services.map(elem => elem.name)
            let isOffChainPayement = state.stepsConfig[3].isOffChain
            let isCam = state.stepsConfig[3].isCam

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
            setContractCMAccountAddress(cmAccountAddress)
            await CMAccountCreated(
                { services, wantedServices, isOffChainPayement },
                cmAccountAddress,
            )
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
        isCMAccount()
    }, [wallet])

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

    const setOffChainPaymentSupported = useCallback(
        async value => {
            if (!account) {
                console.error('Account is not initialized')
                return
            }
            try {
                const tx = await accountWriteContract.setOffChainPaymentSupported(value)
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
                console.log({ receipt })
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
