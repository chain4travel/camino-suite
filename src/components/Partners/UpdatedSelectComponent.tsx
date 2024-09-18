import { Autocomplete, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

const UpdatedSelectComponent = React.memo(
    ({ editing = true, supplierState, dispatchSupplierState, actionTypes }) => {
        const handleChange = (event, newValue) => {
            if (newValue) {
                addService(newValue)
            }
        }

        const addService = service => {
            if (
                !supplierState.stepsConfig[supplierState.step].services.find(
                    elem => elem.name === service,
                )
            ) {
                dispatchSupplierState({
                    type: actionTypes.ADD_SERVICE,
                    payload: {
                        step: supplierState.step,
                        newService: {
                            name: service,
                            fee: '0',
                            capabilities: [''],
                            rackRates: true,
                        },
                    },
                })
            }
        }

        const availableServices = useMemo(() => {
            return supplierState.registredServices.filter(
                service =>
                    !supplierState.stepsConfig[supplierState.step].services.find(
                        elem => elem.name === service,
                    ),
            )
        }, [supplierState.registredServices, supplierState.stepsConfig, supplierState.step])

        return (
            <Autocomplete
                disabled={!editing}
                options={availableServices}
                renderInput={params => (
                    <TextField
                        {...params}
                        placeholder="Select a service"
                        InputProps={{
                            ...params.InputProps,
                            style: { height: '40px' },
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <li {...props}>
                        <Typography variant="caption">{option}</Typography>
                    </li>
                )}
                onChange={handleChange}
                filterOptions={(options, { inputValue }) =>
                    options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                }
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        height: '40px',
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        padding: '0 14px',
                        '& fieldset': {
                            borderColor: theme => theme.palette.card.border,
                            borderRadius: '12px',
                        },
                    },
                    '& .MuiAutocomplete-input': {
                        padding: '0 !important',
                        height: '40px',
                    },
                    '& .MuiAutocomplete-endAdornment': {
                        top: '50%',
                        transform: 'translateY(-50%)',
                    },
                    '& .MuiAutocomplete-option': {
                        padding: '6px 16px',
                    },
                }}
            />
        )
    },
)

UpdatedSelectComponent.propTypes = {
    editing: PropTypes.bool,
    supplierState: PropTypes.shape({
        registredServices: PropTypes.array.isRequired,
        stepsConfig: PropTypes.object.isRequired,
        step: PropTypes.number.isRequired,
    }).isRequired,
    dispatchSupplierState: PropTypes.func.isRequired,
    actionTypes: PropTypes.object.isRequired,
}

UpdatedSelectComponent.defaultProps = {
    editing: true,
}

UpdatedSelectComponent.displayName = 'UpdatedSelectComponent'

export default UpdatedSelectComponent
