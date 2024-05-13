import { ActionType, StatePartnersType, partnersActions } from '../../helpers/partnersReducer'

import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React from 'react'
import BusinessFieldFilter from './BusinessFieldFilter'
import SearchInput from './SearchInput'

interface PartnersFilterProps {
    state: StatePartnersType
    dispatchPartnersActions: React.Dispatch<ActionType>
}

const PartnersFilter: React.FC<PartnersFilterProps> = ({ state, dispatchPartnersActions }) => {
    const searchByName = param =>
        dispatchPartnersActions({ type: partnersActions.UPDATE_COMPANY_NAME, payload: param })
    return (
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchInput searchByName={searchByName} />
            <BusinessFieldFilter state={state} dispatchPartnersActions={dispatchPartnersActions} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <FormControlLabel
                    label={<Typography variant="body2">Only Validators</Typography>}
                    control={
                        <Checkbox
                            sx={{
                                color: theme => theme.palette.secondary.main,
                                '&.Mui-checked': {
                                    color: theme => theme.palette.secondary.main,
                                },
                                '&.MuiCheckbox-colorSecondary.Mui-checked': {
                                    color: theme => theme.palette.secondary.main,
                                },
                            }}
                            checked={state.validators}
                            onChange={() =>
                                dispatchPartnersActions({ type: partnersActions.TOGGLE_VALIDATORS })
                            }
                        />
                    }
                />
            </Box>
        </Box>
    )
}

export default React.memo(PartnersFilter)
