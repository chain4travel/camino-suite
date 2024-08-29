import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import Alert from '../../components/Alert'
import Input from '../../components/Input'
import MainButton from '../../components/MainButton'
import {
    actionTypes,
    PartnerConfigurationProvider,
    services,
    usePartnerConfigurationContext,
} from '../../helpers/partnerConfigurationContext'

const Content = () => {
    const { state, dispatch } = usePartnerConfigurationContext()

    const handleChange = event => {
        addService(event.target.value)
    }
    const nextStep = () => {
        console.log('click')
        if (state.step < state.stepsConfig.length - 1)
            dispatch({ type: actionTypes.UPDATE_STEP, payload: { step: state.step + 1 } })
    }
    const prevStep = () => {
        console.log('click')
        if (state.step > 0)
            dispatch({ type: actionTypes.UPDATE_STEP, payload: { step: state.step - 1 } })
    }

    const addService = service => {
        if (!state.stepsConfig[state.step].services.find(elem => elem.name === service))
            dispatch({
                type: actionTypes.ADD_SERVICE,
                payload: {
                    step: state.step,
                    newService: services.find(elem => elem.name === service),
                },
            })
    }

    function CreateConfiguration() {
        console.log({ state })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
            }}
        >
            <Configuration>
                <Configuration.SubTitle>Messenger setup</Configuration.SubTitle>
                <Configuration.Title>{state.stepsConfig[state.step].title}</Configuration.Title>
                {state.stepsConfig[state.step].paragraph && (
                    <Configuration.Paragraphe>
                        {state.stepsConfig[state.step].paragraph}
                    </Configuration.Paragraphe>
                )}
                {state.step === 0 && (
                    <>
                        <Input endIcon type="number" />
                        <Alert variant="negative" content="Wallet has not sufficient funds." />
                    </>
                )}
                {(state.step === 1 || state.step === 2) && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <FormControlLabel
                            label={
                                <Typography variant="body2">
                                    Are you a {state.stepsConfig[state.step].type}?
                                </Typography>
                            }
                            control={
                                <Checkbox
                                    sx={{
                                        color: theme => theme.palette.secondary.main,
                                        '&.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                    }}
                                    checked={
                                        state.step === 1
                                            ? state.stepsConfig[state.step].isSupplier
                                            : state.stepsConfig[state.step].isDistributor
                                    }
                                    onChange={() =>
                                        dispatch({ type: actionTypes.UPDATE_IS_SUPPLIER })
                                    }
                                />
                            }
                        />
                        {((state.step === 1 && state.stepsConfig[state.step].isSupplier) ||
                            (state.step === 2 && state.stepsConfig[state.step].isDistributor)) && (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <Typography variant="overline">services</Typography>
                                    <FormControl>
                                        <Select
                                            sx={{
                                                fontFamily: 'Inter',
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                lineHeight: '20px',
                                                textAlign: 'left',
                                                height: '40px',
                                                padding: '10px 16px',
                                                gap: '4px',
                                                borderRadius: '8px',
                                                border: '1px solid transparent',
                                                borderBottom: 'none',
                                                opacity: 1,
                                            }}
                                            value="service"
                                            onChange={handleChange}
                                        >
                                            <MenuItem sx={{ display: 'none' }} value={'service'}>
                                                Services
                                            </MenuItem>
                                            {services.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    sx={{
                                                        fontFamily: 'Inter',
                                                        fontSize: '14px',
                                                        fontWeight: 400,
                                                        lineHeight: '20px',
                                                        textAlign: 'left',
                                                        height: '40px',
                                                        padding: '10px 16px',
                                                        gap: '4px',
                                                        borderRadius: '8px',
                                                        border: '1px solid transparent',
                                                        borderBottom: 'none',
                                                        opacity: 1,
                                                    }}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Configuration.Services />
                            </>
                        )}
                    </Box>
                )}
                {state.step === 3 && (
                    <>
                        <FormControlLabel
                            label={<Typography variant="body2">Offchain</Typography>}
                            control={
                                <Checkbox
                                    sx={{
                                        color: theme => theme.palette.secondary.main,
                                        '&.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        p: '0 8px',
                                    }}
                                    checked={state.stepsConfig[state.step].isOffChain}
                                    onChange={() =>
                                        dispatch({ type: actionTypes.UPDATE_IS_OFF_CHAIN })
                                    }
                                />
                            }
                        />
                        <FormControlLabel
                            label={<Typography variant="body2">CAM</Typography>}
                            control={
                                <Checkbox
                                    sx={{
                                        color: theme => theme.palette.secondary.main,
                                        '&.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                            color: theme => theme.palette.secondary.main,
                                        },
                                        p: '0 8px',
                                    }}
                                    checked={state.stepsConfig[state.step].isCam}
                                    onChange={() => dispatch({ type: actionTypes.UPDATE_IS_CAM })}
                                />
                            }
                        />
                    </>
                )}
                {state.step === 4 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(state.stepsConfig[3].isOffChain || state.stepsConfig[3].isCam) && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <Typography variant="overline">Payment methods</Typography>
                                {state.stepsConfig[3].isOffChain && !state.stepsConfig[3].isCam && (
                                    <Typography variant="caption">Offchain</Typography>
                                )}
                                {!state.stepsConfig[3].isOffChain && state.stepsConfig[3].isCam && (
                                    <Typography variant="caption">CAM</Typography>
                                )}
                                {state.stepsConfig[3].isOffChain && state.stepsConfig[3].isCam && (
                                    <Typography variant="caption">Offchain, CAM</Typography>
                                )}
                            </Box>
                        )}
                        {state.stepsConfig[1].isSupplier && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <Typography variant="overline">Type</Typography>
                                    <Typography variant="caption">Supplier</Typography>
                                </Box>
                                {state.stepsConfig[1].services.map((elem, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '4px',
                                            }}
                                        >
                                            <Typography variant="overline">{elem.name}</Typography>
                                            <Typography variant="caption">
                                                Fee:{' '}
                                                {elem.fee +
                                                    (elem.rackRates ? ', Rack Rates' : null)}
                                                {/* {elem.rackRates && <>, Rack Rates</>} */}
                                            </Typography>
                                            {!elem.capabilities.filter(str => str.trim() !== '')
                                                .length ? (
                                                <Typography variant="caption">
                                                    Capabilities: No Capabilities
                                                </Typography>
                                            ) : (
                                                elem.capabilities
                                                    .filter(str => str.trim() !== '')
                                                    .map((capability, cp) => {
                                                        return capability ? (
                                                            <Typography key={cp} variant="caption">
                                                                Capability: {capability}
                                                            </Typography>
                                                        ) : null
                                                    })
                                            )}
                                        </Box>
                                    )
                                })}
                            </Box>
                        )}
                        {state.stepsConfig[2].isDistributor && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <Typography variant="overline">Type</Typography>
                                    <Typography variant="caption">Distributor</Typography>
                                </Box>
                                {state.stepsConfig[1].services.map((elem, index) => {
                                    return <Typography variant="overline">{elem.name}</Typography>
                                })}
                            </Box>
                        )}
                    </Box>
                )}
                <Divider />
                <Configuration.Buttons>
                    <MainButton variant="outlined" onClick={prevStep}>
                        Cancel
                    </MainButton>
                    {(state.step === 1 && !state.stepsConfig[state.step].isSupplier) ||
                    (state.step === 2 && !state.stepsConfig[state.step].isDistributor) ? (
                        <MainButton variant="contained" onClick={nextStep}>
                            Skip this step
                        </MainButton>
                    ) : state.step !== 4 ? (
                        <MainButton variant="contained" onClick={nextStep}>
                            Next Step
                        </MainButton>
                    ) : (
                        <MainButton variant="contained" onClick={CreateConfiguration}>
                            Create Configuration
                        </MainButton>
                    )}
                </Configuration.Buttons>
            </Configuration>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {state.step === 0 && (
                    <Alert
                        variant="info"
                        title="100 CAM is required"
                        content="To activate your Messenger address, a minimum deposit of 100 CAM is required. Before creating your Camino Messenger account, please ensure that your accessible wallet has sufficient funds."
                    />
                )}
                <Configuration.Infos
                    information="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address. Once the process is complete, your Camino Messenger address will appear on your partner detail page, allowing you to communicate directly with other Camino Messenger accounts."
                    rackRates="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address."
                ></Configuration.Infos>
            </Box>
        </Box>
    )
}

const Overreview = () => {
    return (
        <PartnerConfigurationProvider>
            <Content />
        </PartnerConfigurationProvider>
    )
}

function Configuration({ children, ...restProps }) {
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: '0 0 50%' }}
            {...restProps}
        >
            {children}
        </Box>
    )
}

Configuration.SubTitle = function SubTitle({ children }) {
    return (
        <Typography variant="overline" color="#35E9AD">
            {children}
        </Typography>
    )
}

Configuration.Title = function Title({ children }) {
    return (
        <Typography variant="h4" fontWeight={600}>
            {children}
        </Typography>
    )
}

Configuration.Paragraphe = function Paragraphe({ children }) {
    return <Typography variant="body2">{children}</Typography>
}

Configuration.Buttons = function Buttons({ children }) {
    return <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>{children}</Box>
}

// Configuration.Services = function Services() {
//     const { state, dispatch } = usePartnerConfigurationContext()
//     return (
//         <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
//             {state.stepsConfig[state.step].services.map((service, index) => (
//                 <Box sx={{ displat: 'flex', gap: '12px', flexDirection: 'column' }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <Typography>{service.name}</Typography>
//                         <Box sx={{ display: 'flex', gap: '12px' }}></Box>
//                     </Box>
//                     <Box></Box>
//                     <Box></Box>
//                 </Box>
//             ))}
//         </Box>
//     )
// }

Configuration.Services = function Services() {
    const { state, dispatch } = usePartnerConfigurationContext()

    const removeService = serviceIndex => {
        dispatch({
            type: actionTypes.REMOVE_SERVICE,
            payload: {
                step: state.step,
                serviceIndex,
            },
        })
    }

    const addCapability = serviceIndex => {
        dispatch({
            type: actionTypes.ADD_CAPABILITIES,
            payload: {
                step: state.step,
                serviceIndex,
            },
        })
    }

    const handleCapabilityChange = (event, serviceIndex, capabilityIndex) => {
        dispatch({
            type: actionTypes.UPDATE_CAPABILITY,
            payload: {
                step: state.step,
                serviceIndex: serviceIndex,
                capabilityIndex: capabilityIndex,
                newValue: event.target.value,
            },
        })
    }

    const handleFeeChange = (event, serviceIndex) => {
        dispatch({
            type: actionTypes.UPDATE_FEE,
            payload: {
                step: state.step,
                serviceIndex: serviceIndex,
                newValue: event.target.value,
            },
        })
    }

    useEffect(() => {
        console.log({ state })
    }, [state])

    return (
        <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            {state.stepsConfig[state.step].services.map((service, index) => (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '12px',
                        flexDirection: 'column',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #1E293B',
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body2">{service.name}</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            {state.step === 1 && (
                                <Button
                                    variant="outlined"
                                    onClick={() => addCapability(index)}
                                    sx={{
                                        padding: '6px 12px',
                                        gap: '6px',
                                        borderRadius: '8px',
                                        border: '1px solid #475569',
                                        backgroundColor: theme =>
                                            theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                                        borderWidth: '1px',
                                        '&:hover': {
                                            borderWidth: '1px',
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    <Typography variant="caption">Add capability</Typography>
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                sx={{
                                    padding: '6px 12px',
                                    gap: '6px',
                                    borderRadius: '8px',
                                    border: '1px solid #475569',
                                    backgroundColor: theme =>
                                        theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                                    borderWidth: '1px',
                                    '&:hover': {
                                        borderWidth: '1px',
                                        boxShadow: 'none',
                                    },
                                }}
                                onClick={() => removeService(index)}
                            >
                                <Typography variant="caption">Remove service</Typography>
                            </Button>
                        </Box>
                    </Box>
                    {state.step === 1 && (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography sx={{ flex: '0 0 20%' }} variant="overline">
                                    FEE
                                </Typography>
                                <Box sx={{ display: 'flex', gap: '8px', flex: '1' }}>
                                    <TextField
                                        value={state.stepsConfig[state.step].services[index].fee}
                                        onChange={e => handleFeeChange(e, index)}
                                        sx={{
                                            flex: '1',
                                            '& .MuiInputBase-root': {
                                                height: '40px',
                                            },
                                            '& input': {
                                                fontSize: '14px',
                                                height: '100%',
                                                padding: '8px 14px',
                                            },
                                        }}
                                        type="number"
                                        InputProps={{
                                            sx: {
                                                '& input': {
                                                    fontSize: '14px',
                                                },
                                            },
                                        }}
                                    />
                                    <FormControlLabel
                                        sx={{ mr: '0px !important' }}
                                        label={
                                            <Typography variant="caption">Rack Rates</Typography>
                                        }
                                        control={
                                            <Checkbox
                                                sx={{
                                                    color: theme => theme.palette.secondary.main,
                                                    '&.Mui-checked': {
                                                        color: theme =>
                                                            theme.palette.secondary.main,
                                                    },
                                                    '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                                        color: theme =>
                                                            theme.palette.secondary.main,
                                                    },
                                                }}
                                                checked={
                                                    state.stepsConfig[state.step].services[index]
                                                        .rackRates
                                                }
                                                onChange={() =>
                                                    dispatch({
                                                        type: actionTypes.UPDATE_RACK_RATES,
                                                        payload: {
                                                            step: state.step,
                                                            serviceIndex: index,
                                                        },
                                                    })
                                                }
                                            />
                                        }
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22ZM11 7H13V9H11V7ZM14 17H10V15H11V13H10V11H13V15H14V17Z"
                                            fill="#0085FF"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                            {state.stepsConfig[state.step].services[index].capabilities.map(
                                (elem, key) => {
                                    return (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: '8px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Typography sx={{ flex: '0 0 20%' }} variant="overline">
                                                Capabilities
                                            </Typography>
                                            <TextField
                                                value={
                                                    state.stepsConfig[state.step].services[index]
                                                        .capabilities[key]
                                                }
                                                onChange={e =>
                                                    handleCapabilityChange(e, index, key)
                                                }
                                                sx={{
                                                    flex: '1',
                                                    '& .MuiInputBase-root': {
                                                        height: '40px',
                                                    },
                                                    '& input': {
                                                        fontSize: '14px',
                                                        height: '100%',
                                                        padding: '8px 14px',
                                                    },
                                                }}
                                                type="string"
                                                InputProps={{
                                                    sx: {
                                                        '& input': {
                                                            fontSize: '14px',
                                                        },
                                                    },
                                                }}
                                                placeholder="Describe your capabilities..."
                                            />
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22ZM11 7H13V9H11V7ZM14 17H10V15H11V13H10V11H13V15H14V17Z"
                                                        fill="#0085FF"
                                                    />
                                                </svg>
                                            </Box>
                                        </Box>
                                    )
                                },
                            )}
                        </>
                    )}
                </Box>
            ))}
        </Box>
    )
}

Configuration.Infos = function Infos({ rackRates, information }) {
    return (
        <Box
            sx={{
                display: 'flex',
                padding: '16px',
                flexDirection: 'column',
                border: '1px solid',
                borderRadius: '16px',
                maxWidth: '350px',
                borderColor: '#334155',
                gap: '16px',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography variant="overline">information</Typography>
                <Typography variant="caption">{information}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography variant="overline">rack rates</Typography>
                <Typography variant="caption">{rackRates}</Typography>
            </Box>
        </Box>
    )
}

export default Overreview
