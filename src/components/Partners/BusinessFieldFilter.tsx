import React from 'react'

import { mdiCheckCircle } from '@mdi/js'
import Icon from '@mdi/react'
import { Typography } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ActionType, StatePartnersType, partnersActions } from '../../helpers/partnersReducer'
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
                flex: '1 1 400px',
                padding: '0',
                maxWidth: '400px',
                borderRadius: '12px',
                paddingRight: '0px !important',
                width: '50% !important',
                color: theme => theme.palette.text.primary,
                '.MuiSelect-select ': {
                    boxSizing: 'border-box',
                    height: '40px',
                    padding: '10px 16px 10px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    border: theme => `solid 2px ${theme.palette.card.border}`,
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
                        sx={[
                            {
                                color: !businessField.active ? '#CBD4E2' : '#ffffff',
                            },
                        ]}
                        primary={<Typography variant="caption">{businessField.name}</Typography>}
                    />
                    {businessField.active && <Icon path={mdiCheckCircle} size={1} />}
                </MenuItem>
            ))}
        </Select>
    )
}

export default BusinessFieldFilter
