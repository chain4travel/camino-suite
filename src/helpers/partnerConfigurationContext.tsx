import React, { createContext, useContext, useReducer } from 'react'

export const services = [
    {
        name: 'Service #1',
        fee: 223,
        capabilities: [''],
        rackRates: false,
    },
    {
        name: 'Service #2',
        fee: 543,
        capabilities: [''],
        rackRates: false,
    },
    {
        name: 'Service #3',
        fee: 2763,
        capabilities: [''],
        rackRates: false,
    },
]
// Initial state
const initialState = {
    stepsConfig: [
        {
            step: 0,
            title: 'Messenger configuration',
            services: [],
            paragraph:
                'This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address. Once the process is complete, your Camino Messenger address will appear on your partner detail page, allowing you to communicate directly with other Camino Messenger accounts.',
            distributor: { isDistributor: true, services: [] },
        },
        {
            step: 1,
            title: 'Supplier configuration',
            type: 'supplier',
            paragraph:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo  ligula eget dolor. Aenean massa. Donec sociis natoque penatibus.',
            isSupplier: false,
            services: [],
        },
        {
            step: 2,
            type: 'distributor',
            title: 'Distributor configuration',
            paragraph:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo  ligula eget dolor. Aenean massa. Donec sociis natoque penatibus.',
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
    step: 0,
}

// Action types
export const actionTypes = {
    ADD_SERVICE: 'ADD_SERVICE',
    REMOVE_SERVICE: 'REMOVE_SERVICE',
    UPDATE_STEP: 'UPDATE_STEP',
    UPDATE_IS_SUPPLIER: 'UPDATE_IS_SUPPLIER',
    ADD_CAPABILITIES: 'ADD_CAPABILITIES',
    UPDATE_CAPABILITY: 'UPDATE_CAPABILITY',
    UPDATE_RACK_RATES: 'UPDATE_RACK_RATES',
    UPDATE_FEE: 'UPDATE_FEE',
    UPDATE_IS_OFF_CHAIN: 'UPDATE_IS_OFF_CHAIN',
    UPDATE_IS_CAM: 'UPDATE_IS_CAM',
}

// Reducer function
function reducer(state = initialState, action) {
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
            if (state.step === 2)
                return {
                    ...state,
                    stepsConfig: state.stepsConfig.map(item =>
                        item.step === state.step
                            ? {
                                  ...item,
                                  isDistributor: !state.stepsConfig[state.step].isDistributor,
                              }
                            : item,
                    ),
                }
            return {
                ...state,
                stepsConfig: state.stepsConfig.map(item =>
                    item.step === state.step
                        ? {
                              ...item,
                              isSupplier: !state.stepsConfig[state.step].isSupplier,
                          }
                        : item,
                ),
            }
        }

        case actionTypes.UPDATE_RACK_RATES: {
            const { step, serviceIndex } = action.payload
            console.log('dispatched')
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

        default:
            return state
    }
}

// Create context
const PartnerConfigContext = createContext()

// Context provider component
export const PartnerConfigurationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

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
