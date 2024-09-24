import { Autocomplete, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'

const UpdatedSelectComponent = React.memo(
    ({ editing = true, supplierState, dispatchSupplierState, actionTypes }) => {
        const [value, setValue] = useState(null)
        const [inputValue, setInputValue] = useState('')

        const handleChange = (event, newValue) => {
            if (newValue) {
                addService(newValue)
                setValue(null)
                setInputValue('')
            }
        }

        const handleInputChange = (event, newInputValue) => {
            setInputValue(newInputValue)
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

        const groupServices = services => {
            return services.reduce((acc, service) => {
                const parts = service.split('.')
                const type = parts[2] // The word before the version
                if (!acc[type]) {
                    acc[type] = []
                }
                acc[type].push(service)
                return acc
            }, {})
        }

        const availableServices = useMemo(() => {
            const filteredServices = supplierState.registredServices.filter(
                service =>
                    !supplierState.stepsConfig[supplierState.step].services.find(
                        elem => elem.name === service,
                    ),
            )
            return groupServices(filteredServices)
        }, [supplierState.registredServices, supplierState.stepsConfig, supplierState.step])

        const options = useMemo(() => {
            return Object.values(availableServices).flat()
        }, [availableServices])

        return (
            <Autocomplete
                disabled={!editing}
                options={options}
                value={value}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleChange}
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
                    <Typography key={option} variant="caption" component="li" {...props}>
                        {option}
                    </Typography>
                )}
                filterOptions={(options, { inputValue }) =>
                    options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                }
                groupBy={option => option.split('.')[2]}
                renderGroup={params => (
                    <li key={params.key}>
                        <Typography
                            variant="overline"
                            style={{ fontWeight: 'bold', padding: '8px 16px' }}
                        >
                            {params.group}
                        </Typography>
                        <ul style={{ padding: 0 }}>{params.children}</ul>
                    </li>
                )}
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
                        '& input': {
                            color: 'white',
                        },
                        '& input::placeholder': {
                            color: 'white',
                            opacity: 1,
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

export default UpdatedSelectComponent
