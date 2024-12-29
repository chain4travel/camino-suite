import {
    Box,
    Card,
    CardContent,
    Divider,
    FormControl,
    Paper,
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
import { useNavigate, useParams } from 'react-router'
import MainButton from '../../components/MainButton'
import UpdatedSelectComponent from '../../components/Partners/UpdatedSelectComponent'
import {
    actionTypes,
    reducer,
    usePartnerConfigurationContext,
} from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useFetchPartnerDataQuery } from '../../redux/services/partners'
import { updateNotificationStatus } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import { Configuration } from './Configuration'

function ServiceChangesPreview({ added, removed }) {
    const [costDetails, setCostDetails] = useState(null)
    const [totalCost, setTotalCost] = useState(0n)
    const { contractCMAccountAddress, provider, accountWriteContract } = useSmartContract()

    async function fetchChangesAndEstimateCosts() {
        const gasPrice = (await provider.getFeeData()).gasPrice
        let total = 0n

        if (removed.length > 0) {
            const removedServices = removed.map(service => service.name)
            if (removedServices.length > 0) {
                const gasEst = BigInt(
                    await accountWriteContract.removeWantedServices.estimateGas(removedServices),
                )
                const adjustedGasEst = (gasEst * 98n) / 100n
                const cost = adjustedGasEst * gasPrice
                total += cost
                setCostDetails(prevDetails => ({
                    ...prevDetails,
                    removeCosts: { services: removedServices, totalCost: cost },
                }))
            }
        }

        if (added.length > 0) {
            const addedServices = added.map(service => service.name)
            if (addedServices.length > 0) {
                const gasEst = BigInt(
                    await accountWriteContract.addWantedServices.estimateGas(addedServices),
                )
                const adjustedGasEst = (gasEst * 98n) / 100n
                const cost = adjustedGasEst * gasPrice
                total += cost
                setCostDetails(prevDetails => ({
                    ...prevDetails,
                    addCosts: { services: addedServices, totalCost: cost },
                }))
            }
        }
        setTotalCost(total)
    }

    useEffect(() => {
        fetchChangesAndEstimateCosts()
    }, [contractCMAccountAddress, accountWriteContract, added, removed])

    const formatEther = wei => {
        return parseFloat(ethers.formatEther(wei)).toFixed(6)
    }

    if (added.length === 0 && removed.length === 0) {
        return null
    }

    if (!costDetails) return <></>

    const CostTable = ({ title, costs }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography variant="body2">{title}</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="caption">Services</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="caption">Estimated Cost (CAM)</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="overline">
                                        {costs.services.join(', ')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="overline">
                                        {formatEther(costs.totalCost)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
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

                {costDetails?.addCosts && (
                    <CostTable title="Services to Add" costs={costDetails.addCosts} />
                )}

                {costDetails?.removeCosts && (
                    <CostTable title="Services to Remove" costs={costDetails.removeCosts} />
                )}

                <Typography variant="body2">
                    Total Estimated Cost: {formatEther(totalCost)} CAM
                </Typography>
            </CardContent>
        </Card>
    )
}

export const BasicWantedServices = () => {
    const { partnerID } = useParams()
    const { state, dispatch } = usePartnerConfigurationContext()
    const [distrubitorState, dispatchDistrubitorState] = useReducer(reducer, { ...state, step: 2 })
    const { data: partner, refetch } = useFetchPartnerDataQuery({
        companyName: partnerID,
    })
    const activeNetwork = useAppSelector(getActiveNetwork)
    useEffect(() => {
        if (activeNetwork) refetch()
    }, [activeNetwork])

    const navigate = useNavigate()
    useEffect(() => {
        if (partner)
            dispatchDistrubitorState({
                type: actionTypes.UPDATE_WANTED_SERVICES,
                payload: { wantedServices: partner.wantedServices, reset: true },
            })
    }, [partner])
    if (!partner) return <></>

    if (partner && !partner.contractAddress) navigate('/partners')
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
                <Configuration.Title>Wanted Services</Configuration.Title>
                <Configuration.Paragraphe>
                    This page lists all Wanted Services by this partner. A Wanted Service is a
                    service this partner is looking to buy.
                    {/* <br /> */}
                    {/* {supplierState.stepsConfig[1].services.length === 0 && (
                        <> No bot addresses are currently registered with this Messenger Account.</>
                    )} */}
                </Configuration.Paragraphe>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Configuration.Services
                        state={distrubitorState}
                        dispatch={dispatchDistrubitorState}
                        disabled={true}
                    />
                </Box>
            </Configuration>
        </Box>
    )
}

const ConfigurDistrubitor = () => {
    const { removeWantedServices, addWantedServices, getWantedServices } = usePartnerConfig()
    const { state, dispatch } = usePartnerConfigurationContext()
    const [distrubitorState, dispatchDistrubitorState] = useReducer(reducer, { ...state, step: 2 })
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState([])
    const [removed, setRemoved] = useState([])

    const handleChange = (event, newValue) => {
        if (newValue) {
            addService(newValue)
        }
    }

    const addService = service => {
        if (
            !distrubitorState.stepsConfig[distrubitorState.step].services.find(
                elem => elem.name === service,
            )
        )
            dispatchDistrubitorState({
                type: actionTypes.ADD_SERVICE,
                payload: {
                    step: distrubitorState.step,
                    newService: {
                        name: distrubitorState.registredServices.find(elem => elem === service),
                        fee: '0',
                        capabilities: [''],
                        rackRates: true,
                    },
                },
            })
    }

    const compareServices = useMemo(() => {
        const added = []
        const removed = []

        const originalNames = new Set(state.stepsConfig[2].services.map(item => item.name))
        const updatedNames = new Set(
            distrubitorState.stepsConfig[2].services.map(item => item.name),
        )

        removed.push(...state.stepsConfig[2].services.filter(item => !updatedNames.has(item.name)))
        added.push(
            ...distrubitorState.stepsConfig[2].services.filter(
                item => !originalNames.has(item.name),
            ),
        )

        return { added, removed }
    }, [state, distrubitorState])

    useEffect(() => {
        const { added, removed } = compareServices
        setAdded(added)
        setRemoved(removed)
    }, [compareServices])

    const appDispatch = useAppDispatch()
    async function confirmEditing() {
        setLoading(true)
        await removeWantedServices(removed.map(elem => elem.name))
        await addWantedServices(added.map(elem => elem.name))
        let res = await getWantedServices()
        dispatch({
            type: actionTypes.UPDATE_WANTED_SERVICES,
            payload: { wantedServices: res },
        })
        appDispatch(
            updateNotificationStatus({
                message: 'Services configured successfully',
                severity: 'success',
            }),
        )
        setAdded([])
        setRemoved([])
        setLoading(false)
        setEditing(false)
    }

    function cancelEditing() {
        dispatchDistrubitorState({
            type: actionTypes.RESET_STATE,
            payload: { initialState: { ...state, step: 2 } },
        })

        setEditing(false)
    }

    useEffect(() => {
        dispatchDistrubitorState({
            type: actionTypes.RESET_STATE,
            payload: { initialState: { ...state, step: 2 } },
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
                <Configuration.Title>Wanted Services</Configuration.Title>
                {state.stepsConfig[2].paragraph && (
                    <Configuration.Paragraphe>
                        {state.stepsConfig[2].paragraph}
                    </Configuration.Paragraphe>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Typography variant="overline">services</Typography>
                        <FormControl>
                            <UpdatedSelectComponent
                                editing={editing}
                                supplierState={distrubitorState}
                                dispatchSupplierState={dispatchDistrubitorState}
                                actionTypes={actionTypes}
                            />
                        </FormControl>
                    </Box>

                    <Configuration.Services
                        state={distrubitorState}
                        dispatch={dispatchDistrubitorState}
                        disabled={!editing}
                    />
                </Box>
                <Divider />
                {editing && (added.length > 0 || removed.length > 0) && (
                    <ServiceChangesPreview added={added} removed={removed} />
                )}

                <Configuration.Buttons>
                    {!editing ? (
                        <MainButton
                            variant="contained"
                            onClick={() => {
                                setEditing(true)
                            }}
                        >
                            Configure Services
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
                                Cancel
                            </MainButton>
                            <MainButton
                                loading={loading}
                                variant="contained"
                                onClick={() => {
                                    confirmEditing()
                                }}
                            >
                                Save Changes
                            </MainButton>
                        </>
                    )}
                </Configuration.Buttons>
            </Configuration>
        </Box>
    )
}

export default ConfigurDistrubitor
