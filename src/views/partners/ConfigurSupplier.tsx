import { Box, Divider, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import MainButton from '../../components/MainButton'
import {
    actionTypes,
    reducer,
    usePartnerConfigurationContext,
} from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { Configuration } from './Configuration'

const ConfigurSupplier = () => {
    const { state, dispatch } = usePartnerConfigurationContext()
    const [supplierState, dispatchSupplierState] = useReducer(reducer, { ...state, step: 1 })
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const { removeServices, addServices, getSupportedServices } = usePartnerConfig()
    const handleChange = event => {
        addService(event.target.value)
    }
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
    const isEqual = (a, b) => {
        return (
            a.name === b.name &&
            a.fee === b.fee &&
            a.rackRates === b.rackRates &&
            JSON.stringify(a.capabilities) === JSON.stringify(b.capabilities)
        )
    }
    async function confirmEditing() {
        setLoading(true)
        const removed = state.stepsConfig[supplierState.step].services.filter(
            origItem =>
                !supplierState.stepsConfig[supplierState.step].services.some(updatedItem =>
                    isEqual(origItem, updatedItem),
                ),
        )

        const added = supplierState.stepsConfig[supplierState.step].services.filter(
            updatedItem =>
                !state.stepsConfig[supplierState.step].services.some(origItem =>
                    isEqual(origItem, updatedItem),
                ),
        )
        await removeServices(removed)
        await addServices(added)
        let res = await getSupportedServices()
        dispatch({
            type: actionTypes.UPDATE_SUPPORTED_SERVICES,
            payload: { services: res },
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
                <Configuration.Buttons>
                    {!editing ? (
                        <MainButton
                            variant="contained"
                            onClick={() => {
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
