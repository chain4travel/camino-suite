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

const ConfigurDistrubitor = () => {
    const { removeWantedServices, addWantedServices, getWantedServices } = usePartnerConfig()
    const { state, dispatch } = usePartnerConfigurationContext()
    const [distrubitorState, dispatchDistrubitorState] = useReducer(reducer, { ...state, step: 2 })
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = event => {
        addService(event.target.value)
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

    async function confirmEditing() {
        setLoading(true)
        const originalNames = new Set(state.stepsConfig[2].services.map(item => item.name))
        const updatedNames = new Set(
            distrubitorState.stepsConfig[2].services.map(item => item.name),
        )

        const removed = state.stepsConfig[2].services.filter(item => !updatedNames.has(item.name))
        const added = distrubitorState.stepsConfig[2].services.filter(
            item => !originalNames.has(item.name),
        )
        await removeWantedServices(removed.map(elem => elem.name))
        await addWantedServices(added.map(elem => elem.name))
        let res = await getWantedServices()
        dispatch({
            type: actionTypes.UPDATE_WANTED_SERVICES,
            payload: { wantedServices: res },
        })
        setLoading(false)
        setEditing(false)
        console.log({
            removed,
            added,
        })
    }

    function cancelEditing() {
        dispatchDistrubitorState({
            type: actionTypes.RESET_STATE,
            payload: { initialState: { ...state, step: 2 } },
        })
        console.log({ state: distrubitorState.stepsConfig[2].services })
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
                        state={distrubitorState}
                        dispatch={dispatchDistrubitorState}
                        disabled={!editing}
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

export default ConfigurDistrubitor
