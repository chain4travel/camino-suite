import { Box } from '@mui/material'
import React from 'react'
import { ActionType, StatePartnersType, partnersActions } from '../../helpers/partnersReducer'
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
            {/*
            disabled for now because we don't have the pchain address for the partner in strapi 
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <FormControlLabel
                    label="Only Validators"
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
            </Box> */}
        </Box>
    )
}

export default React.memo(PartnersFilter)
