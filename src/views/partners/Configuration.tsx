import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import { useAppDispatch } from '../../hooks/reduxHooks'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import MyMessenger from './MyMessenger'

const Content = () => {
    const { contractCMAccountAddress, isNewImpl } = useSmartContract()
    const { state } = usePartnerConfigurationContext()
    const [loading, setLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState(isNewImpl ? 0 : 1)
    const [gasReserve, setGasReserve] = useState(0)
    const [gasReady, setGasReady] = useState(false)
    const partnerConfig = usePartnerConfig()
    const appDispatch = useAppDispatch()

    const processSteps = ['Approve Tokens', 'Create Account']

    useEffect(() => {
        let cancelled = false
        async function estimateGas() {
            try {
                const value = await partnerConfig.estimateCreateCost()
                if (!cancelled) {
                    setGasReserve(value > 0 ? value : 0.02)
                    setGasReady(true)
                }
            } catch (err) {
                console.warn('Failed to estimate gas, using fallback 0.02 CAM')
                if (!cancelled) {
                    setGasReserve(0.02)
                    setGasReady(true)
                }
            }
        }
        estimateGas()
        return () => {
            cancelled = true
        }
    }, [partnerConfig])

    async function handleCreateMessenger() {
        try {
            setLoading(true)
            if (isNewImpl) {
                if (!partnerConfig.allowance) {
                    setCurrentStep(1)

                    await partnerConfig.approveTokens()

                    appDispatch(
                        updateNotificationStatus({
                            message: 'Tokens approved successfully',
                            severity: 'success',
                        }),
                    )
                }
            }

            setCurrentStep(2)
            await partnerConfig.CreateConfiguration(state)

            appDispatch(
                updateNotificationStatus({
                    message: 'Messenger Account Created',
                    severity: 'success',
                }),
            )

            setCurrentStep(0)
            setLoading(false)
        } catch (error) {
            setCurrentStep(0)
            setLoading(false)
            appDispatch(
                updateNotificationStatus({
                    message: error.message || 'Operation failed. Please try again.',
                    severity: 'error',
                }),
            )
        }
    }

    const { balance, fetchBalance } = useWalletBalance()

    if (contractCMAccountAddress) return <MyMessenger />

    const isDisabled =
        (!store.getters['Accounts/kycStatus'] && !store.getters['Accounts/kybStatus']) ||
        !partnerConfig.hasEnoughTokens ||
        parseFloat(balance) < gasReserve ||
        !state.isBalanceValid

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
                    <>
                        <Typography variant="body2">
                            To create a Messenger Account you need to:
                        </Typography>
                        <ol style={{ marginLeft: '20px' }}>
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    Be KYC-verified and fund the C-Chain address of your connected
                                    Wallet with at least {partnerConfig.prefundAmount}{' '}
                                    {partnerConfig.sftSymbol}.
                                </Typography>
                            </li>
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    Create the Account in this page.
                                </Typography>
                            </li>
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    Configure Services that you offer to Partners.
                                </Typography>
                            </li>
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    Configure Services that you are looking for in Camino Network.
                                </Typography>
                            </li>
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    Manage the Bots associated to your Messenger Account.
                                </Typography>
                            </li>
                        </ol>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Typography variant="caption">Refresh Balance</Typography>
                            <IconButton onClick={fetchBalance} aria-label="refresh">
                                <RefreshIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </>
                )}
                {state.step === 0 && (
                    <>
                        <Box sx={{ mb: 2, width: '100%' }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                {!isNewImpl
                                    ? `Initial CAM funding (min ${partnerConfig.prefundAmount} CAM)`
                                    : 'Initial CAMs funding'}
                            </Typography>
                            <Input />
                        </Box>

                        {isNewImpl && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Token Amount for Approval
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    value={partnerConfig.prefundAmount}
                                    disabled
                                    inputProps={{
                                        readOnly: true,
                                    }}
                                    startAdornment={
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                width: 'fit-content',
                                                color: theme => theme.palette.text.primary,
                                            }}
                                        >
                                            <Typography variant="body2">Token Amount:</Typography>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {partnerConfig.hasEnoughTokens ? (
                                                <CheckCircleIcon
                                                    sx={{
                                                        color: theme => theme.palette.success.main,
                                                        fontSize: 20,
                                                    }}
                                                />
                                            ) : (
                                                <ErrorOutlineIcon
                                                    sx={{
                                                        color: theme => theme.palette.error.main,
                                                        fontSize: 20,
                                                    }}
                                                />
                                            )}
                                        </InputAdornment>
                                    }
                                    sx={{
                                        backgroundColor: theme =>
                                            partnerConfig.hasEnoughTokens
                                                ? theme.palette.mode === 'dark'
                                                    ? 'rgba(53, 233, 173, 0.05)'
                                                    : 'rgba(53, 233, 173, 0.1)'
                                                : theme.palette.mode === 'dark'
                                                ? 'rgba(239, 68, 68, 0.05)'
                                                : 'rgba(239, 68, 68, 0.1)',
                                        border: theme =>
                                            partnerConfig.hasEnoughTokens
                                                ? `1px solid ${theme.palette.success.main}`
                                                : `1px solid ${theme.palette.error.main}`,
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 0.5,
                                        display: 'block',
                                        color: partnerConfig.hasEnoughTokens
                                            ? 'text.secondary'
                                            : 'error.main',
                                    }}
                                >
                                    {partnerConfig.hasEnoughTokens
                                        ? `Fixed amount required for messenger account creation (${partnerConfig.prefundAmount} ${partnerConfig.sftSymbol})`
                                        : `Insufficient balance: you need at least ${partnerConfig.prefundAmount} ${partnerConfig.sftSymbol} to approve.`}
                                </Typography>
                            </Box>
                        )}
                        {loading && (
                            <Box sx={{ mb: 2 }}>
                                <Stepper activeStep={currentStep - 1} alternativeLabel>
                                    {processSteps.map((label, index) => (
                                        <Step key={label} completed={currentStep > index + 1}>
                                            <StepLabel>
                                                {label}
                                                {currentStep === index + 1 && (
                                                    <CircularProgress
                                                        size={16}
                                                        sx={{ ml: 1, display: 'inline-block' }}
                                                    />
                                                )}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        )}
                    </>
                )}
                <Divider />
                {!store.getters['Accounts/kycStatus'] && !store.getters['Accounts/kybStatus'] && (
                    <Alert variant="negative" content="KYC/KYB verification required" />
                )}
                {!partnerConfig.hasEnoughTokens && (
                    <Box sx={{ width: '100%' }}>
                        <Alert
                            sx={{ maxWidth: 'none', width: 'fit-content' }}
                            variant="negative"
                            content={`You need at least ${partnerConfig.prefundAmount} ${partnerConfig.sftSymbol} to create a CM Account, but your wallet only has ${partnerConfig.tokenBalance} ${partnerConfig.sftSymbol}.`}
                        />
                    </Box>
                )}
                {parseFloat(balance) < gasReserve && (
                    <Box sx={{ width: '100%' }}>
                        <Alert
                            sx={{ maxWidth: 'none', width: 'fit-content' }}
                            variant="negative"
                            content={`You need at least ${gasReserve.toFixed(
                                3,
                            )} CAM in your wallet to pay for transaction fees.`}
                        />
                    </Box>
                )}
                <Configuration.Buttons>
                    <MainButton
                        loading={loading}
                        variant="contained"
                        onClick={handleCreateMessenger}
                        disabled={isDisabled}
                    >
                        {loading
                            ? currentStep === 1
                                ? 'Approving...'
                                : 'Creating...'
                            : partnerConfig.allowance || !isNewImpl
                            ? 'Create Messenger Account'
                            : 'Approve & Create Account'}
                    </MainButton>
                </Configuration.Buttons>
            </Configuration>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {state.step === 0 && (
                    <Alert
                        variant="info"
                        title={`${partnerConfig.prefundAmount} ${partnerConfig.sftSymbol} required`}
                        content={`A minimum deposit of ${partnerConfig.prefundAmount} ${partnerConfig.sftSymbol} is required. Please ensure that your connected Wallet has sufficient ${partnerConfig.sftSymbol}.`}
                    />
                )}
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
    const { sftSymbol } = usePartnerConfig()
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
                                    <OutlinedInput
                                        disabled={disabled}
                                        value={state.stepsConfig[state.step].services[index].fee}
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
                                                        color: theme => theme.palette.text.primary,
                                                    }}
                                                >
                                                    {sftSymbol}
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
                                    {(state.stepsConfig[state.step].services[index].rackRates ||
                                        !partnerID) && (
                                        <FormControlLabel
                                            sx={{ mr: '0px !important' }}
                                            label={
                                                <Typography variant="caption">
                                                    Rack Rates
                                                </Typography>
                                            }
                                            disabled={disabled}
                                            control={
                                                <Checkbox
                                                    disabled={disabled}
                                                    sx={{
                                                        color: theme =>
                                                            disabled
                                                                ? theme.palette.action.disabled
                                                                : theme.palette.secondary.main,
                                                        '&.Mui-checked': {
                                                            color: theme =>
                                                                disabled
                                                                    ? theme.palette.action.disabled
                                                                    : theme.palette.secondary.main,
                                                        },
                                                        '&.MuiCheckbox-colorSecondary.Mui-checked':
                                                            {
                                                                color: theme =>
                                                                    disabled
                                                                        ? theme.palette.action
                                                                              .disabled
                                                                        : theme.palette.secondary
                                                                              .main,
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
                                    )}
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
                                        </Box>
                                    )
                                },
                            )}
                        </>
                    )}
                    {!!!partnerID && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                                flexShrink: '0',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {state.step === 1 && (
                                <Button
                                    disabled={disabled}
                                    variant="contained"
                                    onClick={() => addCapability(index)}
                                    sx={{
                                        padding: '6px 12px',
                                        gap: '6px',
                                        borderRadius: '8px',
                                        border: '1px solid #475569',
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
                                variant="contained"
                                sx={{
                                    padding: '6px 12px',
                                    gap: '6px',
                                    borderRadius: '8px',
                                    border: '1px solid #475569',
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
            ))}
        </Box>
    )
}

Configuration.Infos = function Infos({
    rackRates,
    information,
    infos,
    offred,
}: {
    rackRates?: string
    information?: string
    infos?: string[]
    offred?: boolean
}) {
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
            {offred && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Typography variant="overline">information</Typography>
                    <Typography variant="caption">For every service, you can:</Typography>
                    <ul style={{ marginLeft: '16px' }}>
                        <li>
                            <Typography variant="caption">
                                Flag when offering "rack" rates, or not. Rack rates are public,
                                not-negotiated rates on products available for any distributor to
                                consume on the Camino Network, without further contract negotiation.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="caption">
                                Add capabilities, as free text to describe the service in detail,
                                e.g. destination, rate types, etc.
                            </Typography>
                        </li>
                    </ul>
                </Box>
            )}
            {information && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Typography variant="overline">information</Typography>
                    <Typography variant="caption">{information}</Typography>
                </Box>
            )}

            {rackRates && (
                <>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Typography variant="overline">rack rates</Typography>
                        <Typography variant="caption">{rackRates}</Typography>
                    </Box>
                </>
            )}
            {infos &&
                infos.length > 0 &&
                infos.map((elem, index) => (
                    <Box key={index}>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                mt: '16px',
                            }}
                        >
                            <Typography variant="caption">{elem}</Typography>
                        </Box>
                    </Box>
                ))}
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
