import { ContentCopy, RefreshOutlined } from '@mui/icons-material'
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
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

const Content = () => {
    const { contractCMAccountAddress } = useSmartContract()
    const { state, dispatch } = usePartnerConfigurationContext()
    const [loading, setLoading] = useState(false)
    const handleChange = event => {
        addService(event.target.value)
    }
    const partnerConfig = usePartnerConfig()
    const nextStep = () => {
        if (state.step < state.stepsConfig.length - 1)
            dispatch({ type: actionTypes.UPDATE_STEP, payload: { step: state.step + 1 } })
    }
    const prevStep = () => {
        if (state.step > 0)
            dispatch({ type: actionTypes.UPDATE_STEP, payload: { step: state.step - 1 } })
    }
    const addService = service => {
        if (!state.stepsConfig[state.step].services.find(elem => elem.name === service))
            dispatch({
                type: actionTypes.ADD_SERVICE,
                payload: {
                    step: state.step,
                    newService: {
                        name: state.registredServices.find(elem => elem === service),
                        fee: '0',
                        capabilities: [''],
                        rackRates: true,
                    },
                },
            })
    }

    async function submit() {
        setLoading(true)
        await partnerConfig.CreateConfiguration(state)
        setLoading(false)
    }

    const { balance, getBalanceOfAnAddress, balanceOfAnAddress } = useWalletBalance()
    useEffect(() => {
        if (contractCMAccountAddress) getBalanceOfAnAddress(contractCMAccountAddress)
    }, [contractCMAccountAddress])
    if (contractCMAccountAddress)
        return (
            <>
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
                        <Configuration.Title>Add funds to CM address</Configuration.Title>
                        <Configuration.Paragraphe>
                            First you need to top up the CM Account with CAM, EURSH or USDC to work
                            properly. Transfer it to the newly generated CM address below.
                        </Configuration.Paragraphe>
                        <TextField
                            disabled
                            value={contractCMAccountAddress as string}
                            InputProps={{
                                sx: {
                                    '& input': {
                                        fontSize: '16px',
                                    },
                                    '& input.Mui-disabled': {
                                        color: theme => theme.palette.text.primary,
                                        WebkitTextFillColor: theme => theme.palette.text.primary,
                                    },
                                },
                                endAdornment: (
                                    <MainButton
                                        endIcon={
                                            <ContentCopy
                                                sx={{
                                                    color: theme =>
                                                        `${theme.palette.text.primary} !important`,
                                                }}
                                            />
                                        }
                                        variant="outlined"
                                        onClick={() => {
                                            navigator.clipboard.writeText(contractCMAccountAddress)
                                        }}
                                    >
                                        Copy
                                    </MainButton>
                                ),
                            }}
                        />
                        <Configuration.Paragraphe>
                            When the necessary balance has arrived you can continue to the next
                            step.
                        </Configuration.Paragraphe>

                        <TextField
                            disabled
                            value={balanceOfAnAddress}
                            InputProps={{
                                sx: {
                                    '& input': {
                                        fontSize: '16px',
                                    },
                                    '& input.Mui-disabled': {
                                        color: theme => theme.palette.text.primary,
                                        WebkitTextFillColor: theme => theme.palette.text.primary,
                                    },
                                },
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            width: 'fit-content',
                                            color: theme => theme.palette.text.primary,
                                        }}
                                    >
                                        <Typography variant="body2">CM Balance:</Typography>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        {balanceOfAnAddress < 100 ? (
                                            <InputAdornment
                                                position="end"
                                                sx={{ width: 'fit-contnet' }}
                                            >
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                                                        fill="#E5431F"
                                                    />
                                                </svg>
                                            </InputAdornment>
                                        ) : (
                                            <InputAdornment
                                                position="end"
                                                sx={{ width: 'fit-contnet' }}
                                            >
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                                                        fill="#18B728"
                                                    />
                                                </svg>
                                            </InputAdornment>
                                        )}
                                        <MainButton
                                            endIcon={
                                                <RefreshOutlined
                                                    sx={{
                                                        color: theme =>
                                                            `${theme.palette.text.primary} !important`,
                                                    }}
                                                />
                                            }
                                            variant="outlined"
                                            onClick={() => {
                                                getBalanceOfAnAddress(contractCMAccountAddress)
                                            }}
                                        >
                                            Refresh
                                        </MainButton>
                                    </Box>
                                ),
                            }}
                        />
                        {balanceOfAnAddress !== '' && parseFloat(balanceOfAnAddress) < 100 && (
                            <Alert variant="negative" content="Wallet has not sufficient funds." />
                        )}
                        <Typography color="#E5A21F" variant="overline">
                            Min. 100 CAM / 50 EURSH / 100.30 USDC
                        </Typography>
                    </Configuration>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Configuration.Infos
                            information="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address. Once the process is complete, your Camino Messenger address will appear on your partner detail page, allowing you to communicate directly with other Camino Messenger accounts."
                            rackRates="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address."
                        ></Configuration.Infos>
                    </Box>
                </Box>
            </>
        )
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
                                                gap: '4px',
                                                borderRadius: '8px',
                                                border: '1px solid transparent',
                                                borderBottom: 'none',
                                                opacity: 1,
                                                paddingRight: '0px !important',
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                '.MuiSelect-select ': {
                                                    boxSizing: 'border-box',
                                                    height: '40px',
                                                    padding: '10px 16px 10px 16px',
                                                    borderRadius: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    border: theme =>
                                                        `solid 1px ${theme.palette.card.border}`,
                                                },
                                                '& .MuiPopover-paper ul': {
                                                    paddingRight: 'unset !important',
                                                    width: '100% !important',
                                                },
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none !important',
                                                },
                                                '& [aria-expanded=true]': {
                                                    boxSizing: 'border-box',
                                                    height: '40px',
                                                },
                                            }}
                                            value="service"
                                            onChange={handleChange}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: '120px',
                                                        overflow: 'auto',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem sx={{ display: 'none' }} value={'service'}>
                                                Services
                                            </MenuItem>
                                            {state.registredServices.map((item, index) => (
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
                                                    value={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Configuration.Services state={state} dispatch={dispatch} />
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
                        <FormControlLabel
                            label={<Typography variant="body2">USDC* (coming soon) </Typography>}
                            disabled
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
                        <FormControlLabel
                            disabled
                            label={<Typography variant="body2">EURC* (coming soon)</Typography>}
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
                                                Fee:
                                                {elem.fee + (elem.rackRates ? ', Rack Rates' : '')}
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
                                {state.stepsConfig[2].services.map((elem, index) => {
                                    return (
                                        <Typography variant="overline" key={index}>
                                            {elem.name}
                                        </Typography>
                                    )
                                })}
                            </Box>
                        )}
                    </Box>
                )}
                <Divider />
                <Configuration.Buttons>
                    <MainButton
                        disabled={state.step === 0 || loading}
                        variant="outlined"
                        onClick={prevStep}
                    >
                        Previous Step
                    </MainButton>
                    {(state.step === 1 && !state.stepsConfig[state.step].isSupplier) ||
                    (state.step === 2 && !state.stepsConfig[state.step].isDistributor) ? (
                        <MainButton variant="contained" onClick={nextStep}>
                            Skip this step
                        </MainButton>
                    ) : state.step !== 4 ? (
                        <MainButton
                            disabled={
                                !!!state.balance ||
                                parseFloat(state.balance) < 100 ||
                                parseFloat(balance) < 100 ||
                                !store.getters['Accounts/kycStatus']
                            }
                            variant="contained"
                            onClick={nextStep}
                        >
                            Next Step
                        </MainButton>
                    ) : (
                        <MainButton loading={loading} variant="contained" onClick={submit}>
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

export function Configuration({ children, ...restProps }) {
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

Configuration.Services = function Services({
    state,
    dispatch,
    disabled,
}: {
    state: any
    dispatch: any
    disabled?: boolean
}) {
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
                                        disabled={disabled}
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
                                                disabled={disabled}
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
