import { RefreshOutlined } from '@mui/icons-material'
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import { useAppDispatch } from '../../hooks/reduxHooks'

import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { ethers } from 'ethers'
import store from 'wallet/store'
import DialogAnimate from '../../components/Animate/DialogAnimate'
import CamWithdraw from '../../components/CamWithdraw'
import { ERC20_BALANCE_ABI } from '../../constants/apps-consts'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import useWalletBalance from '../../helpers/useWalletBalance'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import { Configuration } from './Configuration'

export const Balances = () => {
    const [open, setOpen] = useState(false)
    const [selectedToken, setSelectedToken] = useState(null)
    const [isOffChainPaymentSupported, setIsOffChainPaymentSupported] = useState(false)
    const [isCAMSupported, setCAMSupported] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [tempOffChainPaymentSupported, setTempOffChainPaymentSupported] = useState(false)
    const [tempSupportedTokens, setTempSupportedTokens] = useState([])
    const [supportedTokens, setSupportedTokens] = useState([])
    const [tempCAMSupported, setTempCAMSupported] = useState(false)
    const { balanceOfAnAddress, getBalanceOfAnAddress } = useWalletBalance()
    const [isLoading, setIsLoading] = useState(false)
    const [tokens, setTokens] = useState([])
    const { contractCMAccountAddress, provider } = useSmartContract()
    const {
        sftAddress,
        sftSymbol,
        sftDecimal,
        sftName,
        getSupportedTokens,
        getOffChainPaymentSupported,
        setOffChainPaymentSupported,
        addSupportedToken,
        removeSupportedToken,
    } = usePartnerConfig()

    const appDispatch = useAppDispatch()
    const handleOpenModal = token => {
        setOpen(true)
    }
    async function checkIfOffChainPaymentSupported() {
        let res = await getOffChainPaymentSupported()
        setIsOffChainPaymentSupported(res)
    }

    const handleCloseModal = () => {
        setSelectedToken(null)
        setOpen(false)
    }

    const handleEditClick = () => {
        const supportedLower = supportedTokens.map(addr => addr.toLowerCase())
        const initialTempTokens = tokens.map(token => ({
            ...token,
            supported: supportedLower.includes(token.address.toLowerCase()),
        }))
        setTempSupportedTokens(initialTempTokens)
        setTempOffChainPaymentSupported(isOffChainPaymentSupported)
        setTempCAMSupported(isCAMSupported)
        setIsEditMode(true)
    }

    const handleCancelEdit = () => {
        setIsEditMode(false)
    }

    const handleConfirmEdit = async () => {
        setIsLoading(true)
        try {
            if (tempOffChainPaymentSupported !== isOffChainPaymentSupported) {
                await setOffChainPaymentSupported(tempOffChainPaymentSupported)
            }
            if (tempCAMSupported !== isCAMSupported) {
                if (tempCAMSupported) {
                    await addSupportedToken(ethers.ZeroAddress)
                } else {
                    await removeSupportedToken(ethers.ZeroAddress)
                }
            }
            if (tempSupportedTokens?.length) {
                const previouslySupported = new Set(supportedTokens.map(addr => addr.toLowerCase()))

                for (const token of tempSupportedTokens) {
                    const addr = token.address.toLowerCase()
                    const wasSupported = previouslySupported.has(addr)
                    const isNowSupported = token.supported

                    try {
                        if (!wasSupported && isNowSupported) {
                            await addSupportedToken(token.address)
                        } else if (wasSupported && !isNowSupported) {
                            await removeSupportedToken(token.address)
                        }
                    } catch (err) {
                        console.error(`Error updating token ${token.address}:`, err)
                    }
                }
            }
            appDispatch(
                updateNotificationStatus({
                    message: 'Accepted currencies updated successfully',
                    severity: 'success',
                }),
            )
            await checkIfOffChainPaymentSupported()
            await fetchSupportedTokens()
            setIsEditMode(false)
        } catch (error) {
            console.error('Error saving configuration:', error)
            appDispatch(
                updateNotificationStatus({
                    message: 'Failed to update accepted currencies',
                    severity: 'error',
                }),
            )
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchSupportedTokens() {
        const res = await getSupportedTokens()
        setCAMSupported(!!res.find(elem => elem === ethers.ZeroAddress))
        setSupportedTokens(res)
    }

    const fetchTokenBalances = async () => {
        await store.dispatch('updateBalances')
        const networkErc20Tokens = store.getters['Assets/networkErc20Tokens'] || []

        const moneriumAddress = '0xF39203dBdc1964B5214207C51E1245184Bec38b5'.toLowerCase()
        const sft = sftAddress?.toLowerCase()
        const predefinedSft = sft
            ? [
                  {
                      contract: { _address: sft },
                      data: {
                          name: sftName,
                          symbol: sftSymbol,
                          decimal: sftDecimal,
                      },
                  },
              ]
            : []
        const uniqueTokens = [
            ...predefinedSft,
            ...networkErc20Tokens.filter(
                token => token.contract._address.toLowerCase() !== sft.toLowerCase(),
            ),
        ]

        const fetchedTokens = await Promise.all(
            uniqueTokens.map(async elem => {
                try {
                    const contract = new ethers.Contract(
                        elem.contract._address,
                        ERC20_BALANCE_ABI,
                        provider,
                    )
                    const balance = await contract.balanceOf(contractCMAccountAddress)

                    return {
                        address: elem.contract._address,
                        balance: ethers.formatUnits(balance, elem.data.decimal),
                        name: elem.data.name,
                        symbol: elem.data.symbol,
                        decimal: elem.data.decimal,
                        supported: supportedTokens
                            .map(a => a.toLowerCase())
                            .includes(elem.contract._address.toLowerCase()),
                    }
                } catch (err) {
                    console.error(`Error fetching balance for ${elem.data.symbol}`, err)
                    return null
                }
            }),
        )

        const sortedTokens = fetchedTokens.filter(Boolean).sort((a, b) => {
            const aAddr = a.address.toLowerCase()
            const bAddr = b.address.toLowerCase()
            const getPriority = addr => {
                if (addr === sft) return 1
                if (addr === moneriumAddress) return 2
                return 3
            }

            return getPriority(aAddr) - getPriority(bAddr)
        })

        setTokens(sortedTokens)
    }

    useEffect(() => {
        if (!contractCMAccountAddress || !sftAddress || !sftName) return
        fetchTokenBalances()
    }, [contractCMAccountAddress, supportedTokens, sftAddress, sftName])

    useEffect(() => {
        getBalanceOfAnAddress(contractCMAccountAddress)
    }, [contractCMAccountAddress])

    useEffect(() => {
        if (!contractCMAccountAddress || !sftAddress || !sftName) return
        fetchSupportedTokens().then(fetchTokenBalances)
    }, [contractCMAccountAddress, sftAddress, sftName])

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
                <Configuration.Title>Balances</Configuration.Title>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        width: 'fit-content',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body2">Accepted Currencies</Typography>
                        <RefreshOutlined
                            onClick={() => {
                                getBalanceOfAnAddress(contractCMAccountAddress)
                                fetchTokenBalances()
                            }}
                            sx={{
                                cursor: 'pointer',
                                color: theme => `${theme.palette.text.primary} !important`,
                            }}
                        />
                    </Box>
                    <FormControlLabel
                        disabled={!isEditMode}
                        label={<Typography variant="body2">Fiat: off-chain</Typography>}
                        control={
                            <Checkbox
                                sx={{
                                    m: '0 8px 0 0',
                                    color: theme =>
                                        !isEditMode
                                            ? theme.palette.action.disabled
                                            : theme.palette.secondary.main,
                                    '&.Mui-checked': {
                                        color: theme =>
                                            !isEditMode
                                                ? theme.palette.action.disabled
                                                : theme.palette.secondary.main,
                                    },
                                    '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                        color: theme =>
                                            !isEditMode
                                                ? theme.palette.action.disabled
                                                : theme.palette.secondary.main,
                                    },
                                }}
                                checked={
                                    isEditMode
                                        ? tempOffChainPaymentSupported
                                        : isOffChainPaymentSupported
                                }
                                onChange={e => setTempOffChainPaymentSupported(e.target.checked)}
                            />
                        }
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <FormControlLabel
                            disabled={!isEditMode}
                            label={
                                <Typography variant="body2">CAM: {balanceOfAnAddress}</Typography>
                            }
                            control={
                                <Checkbox
                                    sx={{
                                        m: '0 8px 0 0',
                                        color: theme =>
                                            !isEditMode
                                                ? theme.palette.action.disabled
                                                : theme.palette.secondary.main,
                                        '&.Mui-checked': {
                                            color: theme =>
                                                !isEditMode
                                                    ? theme.palette.action.disabled
                                                    : theme.palette.secondary.main,
                                        },
                                        '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                            color: theme =>
                                                !isEditMode
                                                    ? theme.palette.action.disabled
                                                    : theme.palette.secondary.main,
                                        },
                                    }}
                                    checked={isEditMode ? tempCAMSupported : isCAMSupported}
                                    onChange={e => setTempCAMSupported(e.target.checked)}
                                />
                            }
                        />
                        {!isEditMode && (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setSelectedToken(null)
                                    handleOpenModal({
                                        symbol: 'CAM',
                                    })
                                }}
                            >
                                Withdraw
                            </Button>
                        )}
                    </Box>
                    {tokens.length > 0 &&
                        tokens.map((elem, index) => {
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        justifyContent: 'space-between',
                                    }}
                                    key={index}
                                >
                                    <Tooltip
                                        title={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.75rem',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'visible',
                                                    display: 'inline-block',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '4px',
                                                    padding: '2px 6px',
                                                    backgroundColor: theme =>
                                                        theme.palette.mode === 'dark'
                                                            ? '#0F172A'
                                                            : '#F8FAFC',
                                                    color: theme =>
                                                        theme.palette.mode === 'dark'
                                                            ? '#F8FAFC'
                                                            : '#1E293B',
                                                }}
                                            >
                                                {elem.address}
                                            </Typography>
                                        }
                                        placement="right"
                                        arrow
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    backgroundColor: theme =>
                                                        theme.palette.mode === 'dark'
                                                            ? '#1E293B'
                                                            : '#E2E8F0',
                                                    color: theme =>
                                                        theme.palette.mode === 'dark'
                                                            ? '#F8FAFC'
                                                            : '#1E293B',
                                                    borderRadius: 1,
                                                    p: 1,
                                                    overflow: 'visible',
                                                    maxWidth: 'none',
                                                },
                                            },
                                        }}
                                    >
                                        <FormControlLabel
                                            disabled={!isEditMode}
                                            label={
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                    }}
                                                >
                                                    <Blockies
                                                        seed={elem.address.toLowerCase()}
                                                        size={8}
                                                        scale={3}
                                                        className="token-icon"
                                                        style={{
                                                            borderRadius: 8,
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                    <Typography variant="body2">
                                                        {elem.name}: {elem.balance} {elem.symbol}
                                                    </Typography>
                                                </Box>
                                            }
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        m: '0 8px 0 0',
                                                        color: theme =>
                                                            !isEditMode
                                                                ? theme.palette.action.disabled
                                                                : theme.palette.secondary.main,
                                                        '&.Mui-checked': {
                                                            color: theme =>
                                                                !isEditMode
                                                                    ? theme.palette.action.disabled
                                                                    : theme.palette.secondary.main,
                                                        },
                                                    }}
                                                    checked={
                                                        isEditMode && tempSupportedTokens
                                                            ? tempSupportedTokens[index]?.supported
                                                            : elem?.supported
                                                    }
                                                    onChange={e => {
                                                        let newArray = [...tempSupportedTokens]
                                                        newArray[index].supported = e.target.checked
                                                        setTempSupportedTokens(newArray)
                                                    }}
                                                />
                                            }
                                        />
                                    </Tooltip>
                                    {!isEditMode && (
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setSelectedToken(elem)
                                                handleOpenModal(elem)
                                            }}
                                        >
                                            Withdraw
                                        </Button>
                                    )}
                                </Box>
                            )
                        })}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {!isEditMode ? (
                            <Button variant="contained" onClick={handleEditClick}>
                                Configure Currencies
                            </Button>
                        ) : (
                            <>
                                <Button
                                    disabled={isLoading}
                                    variant="outlined"
                                    onClick={handleCancelEdit}
                                    sx={{ mr: '8px' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    variant="contained"
                                    onClick={handleConfirmEdit}
                                >
                                    {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Save Changes'
                                    )}
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Configuration>
            <DialogAnimate open={open} onClose={handleCloseModal}>
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        width: '768px',
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                    }}
                >
                    <Typography variant="body1" component="span">
                        Withdraw {selectedToken ? selectedToken.symbol : 'CAM'}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 15,
                            cursor: 'pointer',
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <Icon path={mdiClose} size={1} />
                    </IconButton>
                </DialogTitle>

                <Divider sx={{ borderWidth: '1.5px' }} />
                <DialogContent
                    sx={{
                        backgroundColor: theme =>
                            theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                    }}
                >
                    <CamWithdraw
                        setOpen={setOpen}
                        token={selectedToken}
                        fetchTokenBalances={fetchTokenBalances}
                    />
                </DialogContent>
            </DialogAnimate>
        </Box>
    )
}

export default Balances
