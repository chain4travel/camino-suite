import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    InputAdornment,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import store from 'wallet/store'
import Alert from '../../components/Alert'
import Input from '../../components/Input'
import MainButton from '../../components/MainButton'
import {
    actionTypes,
    usePartnerConfigurationContext,
} from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import useWalletBalance from '../../helpers/useWalletBalance'
import MyMessenger from './MyMessenger'

const Content = () => {
    const { contractCMAccountAddress } = useSmartContract()
    const { state, dispatch } = usePartnerConfigurationContext()
    const [loading, setLoading] = useState(false)
    const partnerConfig = usePartnerConfig()
    async function submit() {
        setLoading(true)
        await partnerConfig.CreateConfiguration(state)
        setLoading(false)
    }
    const { balance } = useWalletBalance()
    if (contractCMAccountAddress) return <MyMessenger />
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
                        <Input />
                        {balance !== '' && parseFloat(balance) < 100 && (
                            <Alert variant="negative" content="Wallet has not sufficient funds." />
                        )}
                        {!store.getters['Accounts/kycStatus'] && (
                            <Alert variant="negative" content="Not KYC Verified" />
                        )}
                    </>
                )}
                <Divider />
                <Configuration.Buttons>
                    <MainButton loading={loading} variant="contained" onClick={submit}>
                        Create Configuration
                    </MainButton>
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

export function Configuration({ children, ...restProps }) {
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: '0 0 60%' }}
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

Configuration.Services = function Services({
    state,
    dispatch,
    disabled,
}: {
    state: any
    dispatch: any
    disabled?: boolean
}) {
    let { partnerID } = useParams()
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
        const newAmount = event.target.value
        if (newAmount === '' || /^\d*\.?\d*$/.test(newAmount)) {
            dispatch({
                type: actionTypes.UPDATE_FEE,
                payload: {
                    step: state.step,
                    serviceIndex: serviceIndex,
                    newValue: newAmount,
                },
            })
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            {state.stepsConfig[state.step].services.map((service, index) => (
                <Box
                    key={index}
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
                            gap: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Typography variant="body2">{service.name}</Typography>
                        {!!!partnerID && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '12px',
                                    alignItems: 'center',
                                    flexShrink: '0',
                                }}
                            >
                                {state.step === 1 && (
                                    <Button
                                        disabled={disabled}
                                        variant="outlined"
                                        onClick={() => addCapability(index)}
                                        sx={{
                                            padding: '6px 12px',
                                            gap: '6px',
                                            borderRadius: '8px',
                                            border: '1px solid #475569',
                                            backgroundColor: theme =>
                                                theme.palette.mode === 'dark'
                                                    ? '#020617'
                                                    : '#F1F5F9',
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
                                    disabled={disabled}
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
                        )}
                    </Box>
                    {state.step === 1 && (
                        <>
                            {!!partnerID && (
                                <FormControlLabel
                                    sx={{ mr: '0px !important' }}
                                    label={<Typography variant="caption">Rack Rates</Typography>}
                                    control={
                                        <Checkbox
                                            disabled={disabled}
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
                            )}
                            {!!!partnerID && (
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
                                        <OutlinedInput
                                            disabled={disabled}
                                            value={
                                                state.stepsConfig[state.step].services[index].fee
                                            }
                                            onChange={e => handleFeeChange(e, index)}
                                            inputProps={{
                                                inputMode: 'decimal',
                                                pattern: '[0-9]*',
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Box
                                                        sx={{
                                                            borderLeft: '1px solid',
                                                            borderColor: theme =>
                                                                theme.palette.card.border,
                                                            height: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            paddingLeft: '16px',
                                                            paddingRight: '16px',
                                                            color: theme =>
                                                                theme.palette.text.primary,
                                                        }}
                                                    >
                                                        CAM
                                                    </Box>
                                                </InputAdornment>
                                            }
                                            sx={theme => ({
                                                flex: '1',
                                                height: '40px',
                                                border: `solid 1px ${theme.palette.card.border}`,
                                                fontSize: '14px',
                                                lineHeight: '24px',
                                                fontWeight: 500,
                                                paddingRight: '0px',
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '& .MuiInputAdornment-root': {
                                                    height: '100%',
                                                    maxHeight: 'none',
                                                },
                                            })}
                                        />
                                        <FormControlLabel
                                            sx={{ mr: '0px !important' }}
                                            label={
                                                <Typography variant="caption">
                                                    Rack Rates
                                                </Typography>
                                            }
                                            control={
                                                <Checkbox
                                                    disabled={disabled}
                                                    sx={{
                                                        color: theme =>
                                                            theme.palette.secondary.main,
                                                        '&.Mui-checked': {
                                                            color: theme =>
                                                                theme.palette.secondary.main,
                                                        },
                                                        '&.MuiCheckbox-colorSecondary.Mui-checked':
                                                            {
                                                                color: theme =>
                                                                    theme.palette.secondary.main,
                                                            },
                                                    }}
                                                    checked={
                                                        state.stepsConfig[state.step].services[
                                                            index
                                                        ].rackRates
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
                            )}
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
                                            key={key}
                                        >
                                            <Typography sx={{ flex: '0 0 20%' }} variant="overline">
                                                Capabilities
                                            </Typography>
                                            <TextField
                                                disabled={disabled}
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

const Overreview = () => {
    return (
        <>
            <Content />
        </>
    )
}
export default Overreview
