import {
    Box,
    Card,
    CardContent,
    Divider,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { ethers } from 'ethers'
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import MainButton from '../../components/MainButton'
import {
    actionTypes,
    reducer,
    usePartnerConfigurationContext,
} from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import { Configuration } from './Configuration'

function ServiceChangesPreview({ added, updated, removed }) {
    const [costDetails, setCostDetails] = useState(null)
    const [totalCost, setTotalCost] = useState(0n)

    async function fetchChangesAndEstimateCosts() {
        const gasPrice = (await provider.getFeeData()).gasPrice

        let total = 0n
        if (!added?.length && !updated?.length && !removed?.length) setCostDetails(null)
        if (added.length > 0) {
            const addCosts = await Promise.all(
                added.map(async service => {
                    const gasEst = BigInt(
                        await accountWriteContract.addService.estimateGas(
                            service.name,
                            ethers.parseEther(service.fee ? service.fee : '0'),
                            service.rackRates,
                            service.capabilities.filter(item => item !== ''),
                        ),
                    )
                    const adjustedGasEst = (gasEst * 98n) / 100n
                    const cost = adjustedGasEst * gasPrice
                    total += cost
                    return { name: service.name, cost }
                }),
            )
            setCostDetails(prevDetails => ({ ...prevDetails, addCosts }))
        }

        if (updated.length > 0) {
            const updateCosts = await Promise.all(
                updated.map(async updateItem => {
                    let totalGasEst = 0n
                    let changeDetails = []

                    if (updateItem.changes.includes('fee')) {
                        const feeGasEst = BigInt(
                            await accountWriteContract.setServiceFee.estimateGas(
                                updateItem.updated.name,
                                ethers.parseEther(
                                    updateItem.updated.fee ? updateItem.updated.fee : '0',
                                ),
                            ),
                        )
                        totalGasEst += feeGasEst
                        changeDetails.push({
                            type: 'fee',
                            gasEst: feeGasEst,
                            cost: feeGasEst * gasPrice,
                            oldValue: updateItem.original.fee,
                            newValue: updateItem.updated.fee,
                        })
                    }

                    if (updateItem.changes.includes('rackRates')) {
                        const rackRateGasEst = BigInt(
                            await accountWriteContract.setServiceRestrictedRate.estimateGas(
                                updateItem.updated.name,
                                updateItem.updated.rackRates,
                            ),
                        )
                        totalGasEst += rackRateGasEst
                        changeDetails.push({
                            type: 'rackRates',
                            gasEst: rackRateGasEst,
                            cost: rackRateGasEst * gasPrice,
                            oldValue: updateItem.original.rackRates,
                            newValue: updateItem.updated.rackRates,
                        })
                    }

                    if (updateItem.changes.includes('capabilities')) {
                        const capabilitiesGasEst = BigInt(
                            await accountWriteContract.setServiceCapabilities.estimateGas(
                                updateItem.updated.name,
                                updateItem.updated.capabilities.filter(item => item !== ''),
                            ),
                        )
                        totalGasEst += capabilitiesGasEst
                        changeDetails.push({
                            type: 'capabilities',
                            gasEst: capabilitiesGasEst,
                            cost: capabilitiesGasEst * gasPrice,
                            oldValue: updateItem.original.capabilities,
                            newValue: updateItem.updated.capabilities,
                        })
                    }

                    const totalCost = totalGasEst * gasPrice
                    total += totalCost
                    return {
                        name: updateItem.updated.name,
                        totalCost,
                        changeDetails,
                    }
                }),
            )
            setCostDetails(prevDetails => ({ ...prevDetails, updateCosts }))
        }

        if (removed.length > 0) {
            const removeCosts = await Promise.all(
                removed.map(async service => {
                    const gasEst = BigInt(
                        await accountWriteContract.removeService.estimateGas(service.name),
                    )
                    const adjustedGasEst = (gasEst * 98n) / 100n
                    const cost = adjustedGasEst * gasPrice
                    total += cost
                    return { name: service.name, cost }
                }),
            )
            setCostDetails(prevDetails => ({ ...prevDetails, removeCosts }))
        }
        setTotalCost(total)
    }
    const { contractCMAccountAddress, provider, accountWriteContract } = useSmartContract()
    useEffect(() => {
        fetchChangesAndEstimateCosts()
    }, [contractCMAccountAddress, accountWriteContract, added, removed, updated])

    const formatEther = wei => {
        return parseFloat(ethers.formatEther(wei)).toFixed(6)
    }

    if (!costDetails) return <></>

    const CostTable = ({ title, costs, isUpdate = false }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography variant="body2">{title}</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="caption">Service Name</Typography>
                                </TableCell>
                                {isUpdate && (
                                    <TableCell>
                                        <Typography variant="caption">Changes</Typography>
                                    </TableCell>
                                )}
                                {isUpdate && (
                                    <TableCell align="right">
                                        <Typography variant="caption">Change Cost (CAM)</Typography>
                                    </TableCell>
                                )}
                                <TableCell align="right">
                                    <Typography variant="caption">
                                        Total Estimated Cost (CAM)
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {costs.map(item => (
                                <TableRow key={item.name}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="overline"> {item.name}</Typography>
                                    </TableCell>
                                    {isUpdate && (
                                        <>
                                            <TableCell>
                                                <Typography variant="overline">
                                                    {item.changeDetails.map((change, index) => (
                                                        <div key={index}>
                                                            <strong>{change.type}:</strong>{' '}
                                                            {change.oldValue} → {change.newValue}
                                                        </div>
                                                    ))}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="overline">
                                                    {item.changeDetails.map((change, index) => (
                                                        <div key={index}>
                                                            {formatEther(change.cost)}
                                                        </div>
                                                    ))}
                                                </Typography>
                                            </TableCell>
                                        </>
                                    )}
                                    <TableCell align="right">
                                        <Typography variant="overline">
                                            {formatEther(isUpdate ? item.totalCost : item.cost)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        )
    }

    return (
        <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography variant="body1">Pending Changes and Estimated Costs</Typography>

                {costDetails?.addCosts?.length > 0 && (
                    <CostTable title="Services to Add" costs={costDetails.addCosts} />
                )}

                {costDetails?.updateCosts?.length > 0 && (
                    <CostTable
                        title="Services to Update"
                        costs={costDetails.updateCosts}
                        isUpdate={true}
                    />
                )}

                {costDetails?.removeCosts?.length > 0 && (
                    <CostTable title="Services to Remove" costs={costDetails.removeCosts} />
                )}

                <Typography variant="body2">
                    Total Estimated Cost: {formatEther(totalCost)} CAM
                </Typography>
            </CardContent>
        </Card>
    )
}

const isEqual = (a, b) => {
    return (
        a.name === b.name &&
        ethers.parseEther(a.fee || '0') === ethers.parseEther(b.fee || '0') &&
        a.rackRates === b.rackRates &&
        JSON.stringify(a.capabilities.filter(item => item !== '')) ===
            JSON.stringify(b.capabilities.filter(item => item !== ''))
    )
}

const ConfigurSupplier = () => {
    const { state, dispatch } = usePartnerConfigurationContext()
    const [supplierState, dispatchSupplierState] = useReducer(reducer, { ...state, step: 1 })
    const [editing, setEditing] = useState(false)
    const [added, setAdded] = useState([])
    const [removed, setRemoved] = useState([])
    const [updated, setUpdated] = useState([])
    const [loading, setLoading] = useState(false)
    const {
        removeServices,
        addServices,
        getSupportedServices,
        setServiceCapabilities,
        setServiceFee,
        setServiceRestrictedRate,
    } = usePartnerConfig()
    const handleChange = event => {
        addService(event.target.value)
    }
    const compareServices = useMemo(() => {
        const added = []
        const updated = []
        const removed = []

        // Check for removed and updated services
        state.stepsConfig[supplierState.step].services.forEach(origItem => {
            const updatedItem = supplierState.stepsConfig[supplierState.step].services.find(
                item => item.name === origItem.name,
            )

            if (!updatedItem) {
                removed.push(origItem)
            } else if (!isEqual(origItem, updatedItem)) {
                updated.push({
                    original: origItem,
                    updated: updatedItem,
                    changes: [],
                })

                if (origItem.fee !== updatedItem.fee)
                    updated[updated.length - 1].changes.push('fee')
                if (origItem.rackRates !== updatedItem.rackRates)
                    updated[updated.length - 1].changes.push('rackRates')
                if (
                    JSON.stringify(origItem.capabilities) !==
                    JSON.stringify(updatedItem.capabilities)
                ) {
                    updated[updated.length - 1].changes.push('capabilities')
                }
            }
        })

        // Check for new services
        supplierState.stepsConfig[supplierState.step].services.forEach(updatedItem => {
            const origItem = state.stepsConfig[supplierState.step].services.find(
                item => item.name === updatedItem.name,
            )
            if (!origItem) {
                added.push(updatedItem)
            }
        })

        return { added, updated, removed }
    }, [state, supplierState])

    const addService = service => {
        if (
            !supplierState.stepsConfig[supplierState.step].services.find(
                elem => elem.name === service,
            )
        )
            dispatchSupplierState({
                type: actionTypes.ADD_SERVICE,
                payload: {
                    step: supplierState.step,
                    newService: {
                        name: supplierState.registredServices.find(elem => elem === service),
                        fee: '0',
                        capabilities: [''],
                        rackRates: true,
                    },
                },
            })
    }
    useEffect(() => {
        const { added, updated, removed } = compareServices
        setAdded(added)
        setRemoved(removed)
        setUpdated(updated)
    }, [compareServices])

    const updateService = async service => {
        const { name, fee, rackRates, capabilities } = service.updated
        const changes = service.changes

        if (changes.includes('fee')) {
            await setServiceFee(name, ethers.parseEther(fee || '0'))
        }

        if (changes.includes('rackRates')) {
            await setServiceRestrictedRate(name, rackRates)
        }

        if (changes.includes('capabilities')) {
            await setServiceCapabilities(
                name,
                capabilities.filter(item => item !== ''),
            )
        }
    }
    async function confirmEditing() {
        setLoading(true)
        if (removed.length > 0) await removeServices(removed)
        if (added.length > 0) await addServices(added)
        for (const service of updated) {
            await updateService(service)
        }
        let res = await getSupportedServices()
        dispatch({
            type: actionTypes.UPDATE_SUPPORTED_SERVICES,
            payload: { services: res },
        })
        dispatchSupplierState({
            type: actionTypes.RESET_STATE,
            payload: { initialState: { ...state, step: 1 } },
        })
        setLoading(false)
        setEditing(false)
    }

    function cancelEditing() {
        dispatchSupplierState({
            type: actionTypes.RESET_STATE,
            payload: { initialState: { ...state, step: 1 } },
        })
        setEditing(false)
    }

    useEffect(() => {
        dispatchSupplierState({
            type: actionTypes.RESET_STATE,
            payload: { initialState: { ...state, step: 1 } },
        })
    }, [state])

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
                <Configuration.Title>Offered Services</Configuration.Title>
                {state.stepsConfig[1].paragraph && (
                    <Configuration.Paragraphe>
                        {state.stepsConfig[1].paragraph}
                    </Configuration.Paragraphe>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Typography variant="overline">services</Typography>
                        <FormControl>
                            <Select
                                disabled={!editing}
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
                                        border: theme => `solid 1px ${theme.palette.card.border}`,
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

                    <Configuration.Services
                        disabled={!editing}
                        state={supplierState}
                        dispatch={dispatchSupplierState}
                    />
                </Box>
                <Divider />
                <ServiceChangesPreview added={added} removed={removed} updated={updated} />
                <Configuration.Buttons>
                    {!editing ? (
                        <MainButton
                            variant="contained"
                            onClick={() => {
                                // const id = '0x0000000000000000000000000000000000000001'
                                // addSupportedToken(id)
                                setEditing(true)
                            }}
                        >
                            Edit configuration
                        </MainButton>
                    ) : (
                        <>
                            <MainButton
                                disabled={loading}
                                variant="outlined"
                                onClick={() => {
                                    cancelEditing()
                                }}
                            >
                                Cancel Editing
                            </MainButton>
                            <MainButton
                                loading={loading}
                                variant="contained"
                                onClick={() => {
                                    confirmEditing()
                                }}
                            >
                                Confirm Editing
                            </MainButton>
                        </>
                    )}
                </Configuration.Buttons>
            </Configuration>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Configuration.Infos
                    information="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address. Once the process is complete, your Camino Messenger address will appear on your partner detail page, allowing you to communicate directly with other Camino Messenger accounts."
                    rackRates="This Camino Messenger wizard will assist you in generating and activating your Camino Messenger address."
                ></Configuration.Infos>
            </Box>
        </Box>
    )
}

export default ConfigurSupplier
