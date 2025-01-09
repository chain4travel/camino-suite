import { Box, Checkbox, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
    handleBusinessFieldToggle,
    handleCategoryToggleHelper,
    handleResetAllFields,
} from '../../helpers/partnersReducer'
import { selectBusinessFields, updateBusinessField } from '../../redux/slices/partnersSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import Icon from '@mdi/react'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { mdiCloseCircleOutline } from '@mdi/js'

const BusinessFieldFilter = () => {
    const dispatch = useAppDispatch()
    const businessFields = useAppSelector(selectBusinessFields)
    const [selectedFields, setSelectedFields] = useState<string[]>([])

    // Toggle individual field
    const handleFieldToggle = (selectedField: string) => {
        setSelectedFields(prevSelectedFields => {
            const newSelectedFields = prevSelectedFields.includes(selectedField)
                ? prevSelectedFields.filter(field => field !== selectedField)
                : [...prevSelectedFields, selectedField]

            dispatch(updateBusinessField(handleBusinessFieldToggle(businessFields, selectedField)))
            return newSelectedFields
        })
    }

    // Toggle entire category (select/deselect all fields in category)
    const handleCategoryToggle = (category: string) => {
        // Find all fields in the category
        const categoryFields =
            businessFields.find(group => group.category === category)?.fields || []

        // Check if all fields in the category are already selected
        const allFieldsInCategorySelected = categoryFields.every(field =>
            selectedFields.includes(field.fullName),
        )

        // Update the `selectedFields` state:
        // - If all are selected, remove them
        // - Otherwise, add the ones not already selected
        const updatedSelectedFields = allFieldsInCategorySelected
            ? selectedFields.filter(field => !categoryFields.map(f => f.fullName).includes(field))
            : [
                  ...selectedFields,
                  ...categoryFields
                      .filter(field => !selectedFields.includes(field.fullName)) // Avoid duplicates
                      .map(field => field.fullName),
              ]

        setSelectedFields(updatedSelectedFields)
        dispatch(updateBusinessField(handleCategoryToggleHelper(businessFields, category)))
    }

    const resetAllFields = () => {
        setSelectedFields([]) // Clear selected fields from the state
        dispatch(updateBusinessField(handleResetAllFields(businessFields)))
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'relative',
            }}
        >
            <Select
                multiple
                value={['default']}
                onChange={() => {}}
                sx={{
                    flex: '1 1 auto',
                    padding: '0',
                    borderRadius: '12px',
                    paddingRight: '0px !important',
                    minWidth: '220px',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    '.MuiSelect-select ': {
                        boxSizing: 'border-box',
                        padding: '10px 10px 10px 10px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        border: theme => `solid 1px ${theme.palette.card.border}`,
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none !important',
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: '400px',
                            width: 'auto !important',
                            maxWidth: '400px !important',
                            '& .MuiMenuItem-root': {
                                width: '100%',
                            },
                        },
                    },
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                }}
                renderValue={() => (
                    <Typography variant="caption">
                        {selectedFields.length > 0
                            ? `Business fields (${selectedFields.length})`
                            : 'Business fields'}
                    </Typography>
                )}
            >
                {businessFields.map((group, groupIndex) => [
                    <MenuItem
                        key={`category-${groupIndex}`}
                        onClick={() => handleCategoryToggle(group.category)} // Toggle category
                        sx={{
                            backgroundColor: theme =>
                                theme.palette.mode === 'dark' ? '#0f182a' : theme.palette.grey[100],
                            py: 1,
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                >
                                    {group.category}
                                </Typography>
                            }
                        />
                        <Checkbox
                            checked={group.fields.every(field => field.active)} // All fields active
                            indeterminate={
                                group.fields.some(field => field.active) && // Some fields active
                                !group.fields.every(field => field.active) // Not all fields active
                            }
                            sx={{
                                padding: '0',
                                color: theme =>
                                    theme.palette.mode === 'dark' ? '#475569' : '#64748B',
                                '&.Mui-checked': {
                                    color: theme => theme.palette.secondary.main,
                                },
                                '&.MuiCheckbox-indeterminate': {
                                    color: theme => theme.palette.secondary.main,
                                },
                            }}
                        />
                    </MenuItem>,

                    ...group.fields.map((field, fieldIndex) => (
                        <MenuItem
                            key={`field-${groupIndex}-${fieldIndex}`}
                            value={field.fullName}
                            onClick={() => handleFieldToggle(field.fullName)} // Toggle individual field
                        >
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: field.active ? 600 : 500,
                                        }}
                                    >
                                        {field.name}
                                    </Typography>
                                }
                            />
                            <Checkbox
                                checked={field.active}
                                sx={{
                                    padding: '0',
                                    color: theme =>
                                        theme.palette.mode === 'dark' ? '#475569' : '#64748B',
                                    '&.Mui-checked': {
                                        color: theme => theme.palette.secondary.main,
                                    },
                                }}
                            />
                        </MenuItem>
                    )),
                ])}
            </Select>
            {selectedFields.length > 0 && (
                <button
                    onClick={resetAllFields}
                    style={{ position: 'absolute', top: '9px', right: '40px', zIndex: 1400 }}
                >
                    <Icon path={mdiCloseCircleOutline} size={1} />
                </button>
            )}
        </Box>
    )
}

export default BusinessFieldFilter
