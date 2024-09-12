import { ethers } from 'ethers'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { usePartnerConfig } from './usePartnerConfig'
import { useSmartContract } from './useSmartContract'

// Initial state
const initialState = {
    stepsConfig: [
        {
            step: 0,
            title: 'Messenger configuration',
            services: [],
            paragraph:
                'This wizard will help you create and activate your Camino Messenger Account with Camino Messenger address. Once set up, your Camino Messenger address will be displayed on your partner detail page, enabling direct communication with other Camino Messenger users.',
            distributor: { isDistributor: true, services: [] },
        },
        {
            step: 1,
            title: 'Supplier configuration',
            type: 'supplier',
            paragraph:
                'Configure services, set fees, and add specific details. Customize your setup by selecting or removing services below.',
            isSupplier: false,
            services: [],
        },
        {
            step: 2,
            type: 'distributor',
            title: 'Distributor configuration',
            paragraph:
                'Configure wanted services. Customize your setup by selecting or removing services below.',
            services: [],
            isDistributor: false,
        },
        { step: 3, title: 'Accepted currencies', isOffChain: false, isCam: false },
        {
            step: 4,
            title: 'Review data',
            paragraph:
                'Please take a moment to review the data we got from you and check if everything is correct. If needed you can change them now or later in your Camino Messenger preferences',
        },
    ],
    balance: '0',
    step: 0,
    isAbleToCreateCMAccount: false,
    registredServices: [],
}

// Action types
export const actionTypes = {
    ADD_SERVICE: 'ADD_SERVICE',
    UPDATE_SUPPORTED_SERVICES: 'UPDATE_SUPPORTED_SERVICES',
    UPDATE_WANTED_SERVICES: 'UPDATE_WANTED_SERVICES',
    REMOVE_SERVICE: 'REMOVE_SERVICE',
    UPDATE_STEP: 'UPDATE_STEP',
    UPDATE_IS_SUPPLIER: 'UPDATE_IS_SUPPLIER',
    ADD_CAPABILITIES: 'ADD_CAPABILITIES',
    UPDATE_CAPABILITY: 'UPDATE_CAPABILITY',
    UPDATE_RACK_RATES: 'UPDATE_RACK_RATES',
    UPDATE_FEE: 'UPDATE_FEE',
    UPDATE_IS_OFF_CHAIN: 'UPDATE_IS_OFF_CHAIN',
    UPDATE_IS_CAM: 'UPDATE_IS_CAM',
    UPDATE_IS_ABLE_TO_CREATE_MESSENGER_ACCOUNT: 'UPDATE_IS_ABLE_TO_CREATE_MESSENGER_ACCOUNT',
    GET_ALL_REGISTRED_SERVICES: 'GET_ALL_REGISTRED_SERVICES',
    UPDATE_BALANCE: 'UPDATE_BALANCE',
    RESET_STATE: 'RESET_STATE',
}

// Reducer function
export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_SERVICE: {
            const { step, newService } = action.payload
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === step
                        ? {
                              ...item,
                              services: [...item.services, newService],
                          }
                        : item,
                ),
            }
        }
        case actionTypes.RESET_STATE:
            const { initialState } = action.payload
            return { ...state, ...initialState }
        case actionTypes.UPDATE_SUPPORTED_SERVICES: {
            const { services } = action.payload
            if (!services || services.length < 1) return state
            let parsedServices = services[0].map((service, index) => {
                return {
                    name: service,
                    fee: ethers.formatEther(services[1][index][0]),
                    rackRates: services[1][index][1],
                    capabilities: services[1][index][2],
                }
            })
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === 1
                        ? {
                              ...item,
                              isSupplier: parsedServices.length > 0 ? true : false,
                              services: parsedServices,
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_WANTED_SERVICES: {
            const { wantedServices } = action.payload
            if (!wantedServices || wantedServices.length < 1) return state
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === 2
                        ? {
                              ...item,
                              isDistributor: wantedServices.length > 0 ? true : false,
                              services: wantedServices.map(elem => {
                                  return { name: elem }
                              }),
                          }
                        : item,
                ),
            }
        }

        case actionTypes.REMOVE_SERVICE: {
            const { step, serviceIndex } = action.payload
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === step
                        ? {
                              ...item,
                              services: item.services.filter((_, index) => index !== serviceIndex),
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_IS_ABLE_TO_CREATE_MESSENGER_ACCOUNT: {
            const { isAbleToCreateCMAccount } = action.payload
            return {
                ...state,
                isAbleToCreateCMAccount,
            }
        }

        case actionTypes.UPDATE_STEP: {
            const { step } = action.payload
            return {
                ...state,
                step,
            }
        }

        case actionTypes.UPDATE_IS_OFF_CHAIN: {
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === state.step
                        ? {
                              ...item,
                              isOffChain: !state.stepsConfig[state.step].isOffChain,
                          }
                        : item,
                ),
            }
        }

        case actionTypes.GET_ALL_REGISTRED_SERVICES: {
            const { registredServices } = action.payload
            return {
                ...state,
                registredServices,
            }
        }

        case actionTypes.UPDATE_IS_CAM: {
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === state.step
                        ? {
                              ...item,
                              isCam: !state.stepsConfig[state.step].isCam,
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_IS_SUPPLIER: {
            if (state.step === 2) {
                return {
                    ...state,
                    stepsConfig: state.stepsConfig.map(item =>
                        item.step === state.step
                            ? {
                                  ...item,
                                  services: state.stepsConfig[state.step].isDistributor
                                      ? []
                                      : item.services,
                                  isDistributor: !state.stepsConfig[state.step].isDistributor,
                              }
                            : item,
                    ),
                }
            }
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === state.step
                        ? {
                              ...item,
                              services: state.stepsConfig[state.step].isSupplier
                                  ? []
                                  : item.services,
                              isSupplier: !state.stepsConfig[state.step].isSupplier,
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_RACK_RATES: {
            const { step, serviceIndex } = action.payload
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === state.step
                        ? {
                              ...item,
                              services: item.services.map((service, sIndex) =>
                                  sIndex === serviceIndex
                                      ? {
                                            ...service,
                                            rackRates:
                                                !state.stepsConfig[step].services[serviceIndex]
                                                    .rackRates,
                                        }
                                      : service,
                              ),
                          }
                        : item,
                ),
            }
        }

        case actionTypes.ADD_CAPABILITIES: {
            const { step, serviceIndex } = action.payload
            return {
                ...state,
                stepsConfig: state.stepsConfig.map((item, index) =>
                    index === step
                        ? {
                              ...item,
                              services: item.services.map((service, sIndex) =>
                                  sIndex === serviceIndex
                                      ? {
                                            ...service,
                                            capabilities: [...service.capabilities, ''],
                                        }
                                      : service,
                              ),
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_CAPABILITY: {
            const { step, serviceIndex, capabilityIndex, newValue } = action.payload
            return {
                ...state,
                stepsConfig: state.stepsConfig.map((item, itemIndex) =>
                    itemIndex === step
                        ? {
                              ...item,
                              services: item.services.map((service, sIndex) =>
                                  sIndex === serviceIndex
                                      ? {
                                            ...service,
                                            capabilities: service.capabilities.map(
                                                (capability, capIndex) =>
                                                    capIndex === capabilityIndex
                                                        ? newValue
                                                        : capability,
                                            ),
                                        }
                                      : service,
                              ),
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_FEE: {
            const { step, serviceIndex, newValue } = action.payload
            return {
                ...state,
                stepsConfig: state.stepsConfig.map((item, itemIndex) =>
                    itemIndex === step
                        ? {
                              ...item,
                              services: item.services.map((service, sIndex) =>
                                  sIndex === serviceIndex
                                      ? {
                                            ...service,
                                            fee: newValue,
                                        }
                                      : service,
                              ),
                          }
                        : item,
                ),
            }
        }
        case actionTypes.UPDATE_BALANCE: {
            const { newValue } = action.payload
            return {
                ...state,
                balance: newValue,
            }
        }

        default:
            return state
    }
}

// Create context
const PartnerConfigContext = createContext()

// Context provider component
export const PartnerConfigurationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const partnerConfig = usePartnerConfig()
    const { accountReadContract } = useSmartContract()

    useEffect(() => {
        if (partnerConfig.account) {
            partnerConfig.getAllServices().then(result => {
                dispatch({
                    type: actionTypes.GET_ALL_REGISTRED_SERVICES,
                    payload: {
                        registredServices: result,
                    },
                })
            })
        }
    }, [partnerConfig.account])

    useEffect(() => {
        if (accountReadContract) {
            partnerConfig.getSupportedServices().then(res => {
                dispatch({
                    type: actionTypes.UPDATE_SUPPORTED_SERVICES,
                    payload: { services: res },
                })
            })
            partnerConfig.getWantedServices().then(res => {
                dispatch({
                    type: actionTypes.UPDATE_WANTED_SERVICES,
                    payload: { wantedServices: res },
                })
            })
        }
    }, [accountReadContract])

    return (
        <PartnerConfigContext.Provider value={{ state, dispatch }}>
            {children}
        </PartnerConfigContext.Provider>
    )
}

// Custom hook to use the Messenger context
export const usePartnerConfigurationContext = () => {
    const context = useContext(PartnerConfigContext)
    if (context === undefined) {
        throw new Error('useMessengerContext must be used within a MessengerProvider')
    }
    return context
}
