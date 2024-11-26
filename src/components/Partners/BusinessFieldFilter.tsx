import { mdiCloseCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { Box, Checkbox, Divider, Typography } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, { useState } from 'react'
import { ActionType, partnersActions, StatePartnersType } from '../../helpers/partnersReducer'

interface BusinessFieldFilterProps {
    state: StatePartnersType
    dispatchPartnersActions: React.Dispatch<ActionType>
}

const BusinessFieldFilter: React.FC<BusinessFieldFilterProps> = ({
    state,
    dispatchPartnersActions,
}) => {
    const [selectedFields, setSelectedFields] = useState<string[]>([])

    // Toggle individual field
    const handleFieldToggle = (selectedField: string) => {
        const newSelectedFields = selectedFields.includes(selectedField)
            ? selectedFields.filter(field => field !== selectedField)
            : [...selectedFields, selectedField]

        setSelectedFields(newSelectedFields)

        dispatchPartnersActions({
            type: partnersActions.UPDATE_BUSINESS_FIELD,
            payload: selectedField,
        })
    }

    // Toggle entire category (select/deselect all fields in category)
    const handleCategoryToggle = (category: string) => {
        // Find all fields in the category
        const categoryFields =
            state.businessField.find(group => group.category === category)?.fields || []

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
        dispatchPartnersActions({
            type: partnersActions.TOGGLE_CATEGORY,
            payload: category,
        })
    }

    const resetAllFields = () => {
        setSelectedFields([]) // Clear selected fields from the state
        dispatchPartnersActions({
            type: partnersActions.RESET_ALL_BUSINESS_FIELDS,
        })
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'relative',
                width: '220px',
            }}
        >
            <Select
                multiple
                value={['default']} // Track selected fields dynamically
                onChange={() => {}} // No-op since we're handling state manually
                sx={{
                    flex: '1 1 220px',
                    padding: '0',
                    borderRadius: '12px',
                    paddingRight: '0px !important',
                    maxWidth: { xs: '100%', sm: '50%', md: '220px' },
                    overflow: 'hidden',
                    '.MuiSelect-select ': {
                        boxSizing: 'border-box',
                        padding: '10px 10px 10px 10px',
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
                }}
                renderValue={() => (
                    <Typography variant="caption">
                        {selectedFields.length > 0
                            ? `Business fields (${selectedFields.length})`
                            : 'Business fields'}
                    </Typography>
                )}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: '400px',
                            overflow: 'auto',
                        },
                    },
                }}
            >
                {state?.businessField?.map((group, groupIndex) => [
                    <MenuItem
                        key={`category-${groupIndex}`}
                        onClick={() => handleCategoryToggle(group.category)} // Toggle category
                        sx={{
                            backgroundColor: theme =>
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey[900]
                                    : theme.palette.grey[100],
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
                                color: theme => theme.palette.secondary.main,
                                '&.Mui-checked': {
                                    color: theme => theme.palette.secondary.main,
                                },
                                '&.MuiCheckbox-indeterminate': {
                                    color: theme => theme.palette.secondary.main, // Optional: Customize color for indeterminate state
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
                                    color: theme => theme.palette.secondary.main,
                                    '&.Mui-checked': {
                                        color: theme => theme.palette.secondary.main,
                                    },
                                }}
                            />
                        </MenuItem>
                    )),

                    groupIndex < state.businessField.length - 1 ? (
                        <Divider key={`divider-${groupIndex}`} sx={{ my: 1 }} />
                    ) : null,
                ])}
            </Select>
            {selectedFields.length > 0 && (
                <button
                    onClick={resetAllFields}
                    style={{ position: 'absolute', top: '10px', right: '40px', zIndex: 1400 }}
                >
                    <Icon path={mdiCloseCircleOutline} size={1} />
                </button>
            )}
        </Box>
    )
}

export default BusinessFieldFilter
