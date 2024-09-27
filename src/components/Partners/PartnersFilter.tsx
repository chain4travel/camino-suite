import { ActionType, StatePartnersType, partnersActions } from '../../helpers/partnersReducer'

import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React from 'react'
import { REGISTER_PARTNER_URL } from '../../constants/route-paths'
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
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
            }}
        >
            <SearchInput searchByName={searchByName} />
            <BusinessFieldFilter state={state} dispatchPartnersActions={dispatchPartnersActions} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                                    dispatchPartnersActions({
                                        type: partnersActions.TOGGLE_VALIDATORS,
                                    })
                                }
                            />
                        }
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <FormControlLabel
                        label={<Typography variant="body2">On Messenger</Typography>}
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
                                checked={state.onMessenger}
                                onChange={() =>
                                    dispatchPartnersActions({
                                        type: partnersActions.TOGGLE_ON_MESSENGER,
                                    })
                                }
                            />
                        }
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                }}
            >
                <Button
                    variant="contained"
                    component="a"
                    href={REGISTER_PARTNER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        whiteSpace: 'nowrap',
                        minWidth: 'max-content',
                    }}
                >
                    Register as Partner
                </Button>
            </Box>
        </Box>
    )
}

export default React.memo(PartnersFilter)
