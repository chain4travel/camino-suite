import { ActionType, StatePartnersType, partnersActions } from '../../helpers/partnersReducer'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import Icon from '@mdi/react'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import { Typography } from '@mui/material'
import { mdiCheckCircle } from '@mdi/js'

interface BusinessFieldFilterProps {
    state: StatePartnersType
    dispatchPartnersActions: React.Dispatch<ActionType>
}

const BusinessFieldFilter: React.FC<BusinessFieldFilterProps> = ({
    state,
    dispatchPartnersActions,
}) => {
    const handleChange = (event: SelectChangeEvent<typeof state.businessField>) => {
        const {
            target: { value },
        } = event
        dispatchPartnersActions({ type: partnersActions.UPDATE_BUSINESS_FIELD, payload: value[1] })
    }

    return (
        <Select
            multiple
            value={['default']}
            onChange={handleChange}
            sx={{
                flex: '1 1 250px',
                padding: '0',
                borderRadius: '12px',
                paddingRight: '0px !important',
                maxWidth: { xs: '100%', sm: '50%', md: '250px' },
                color: theme => theme.palette.text.primary,
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
                    background: theme => theme.palette.grey[600],
                    boxSizing: 'border-box',
                    height: '40px',
                },
            }}
            renderValue={() => <Typography variant="caption">Business fields</Typography>}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: '400px',
                        overflow: 'auto',
                    },
                },
            }}
        >
            <MenuItem sx={{ display: 'none' }} value={'default'}>
                <Typography variant="caption">Business fields</Typography>
            </MenuItem>
            {state.businessField.map((businessField, index) => (
                <MenuItem key={index} value={businessField.name}>
                    <ListItemText
                        sx={{ color: !businessField.active ? '#CBD4E2' : '#ffffff' }}
                        primary={
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: !businessField.active ? 500 : 600 }}
                            >
                                {businessField.name}
                            </Typography>
                        }
                    />
                    {businessField.active && (
                        <Icon path={mdiCheckCircle} size={1} color="#B5E3FD" />
                    )}
                </MenuItem>
            ))}
        </Select>
    )
}

export default BusinessFieldFilter
