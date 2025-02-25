import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import {
    setCompanyNameFilter,
    toggleMessengerFilter,
    toggleValidatorsFilter,
} from '../../redux/slices/partnersSlice'

import { useDispatch } from 'react-redux'
import store from 'wallet/store'
import { REGISTER_PARTNER_URL } from '../../constants/route-paths'
import { useAppSelector } from '../../hooks/reduxHooks'
import { selectPartnerData } from '../../redux/selectors/partners'
import { getActiveNetwork } from '../../redux/slices/network'
import { isFeaturePartnerEnabled } from '../../utils/featureFlags/featureFlagUtils'
import BusinessFieldFilter from './BusinessFieldFilter'
import SearchInput from './SearchInput'

const PartnersFilter: React.FC = () => {
    const dispatch = useDispatch()

    // Get filters state from Redux
    const filters = useAppSelector(state => state.partners.filters)

    const handleCompanyNameChange = (value: string) => {
        dispatch(setCompanyNameFilter(value))
    }

    const handleMessengerToggle = () => {
        dispatch(toggleMessengerFilter())
    }

    const handleValidatorsToggle = () => {
        dispatch(toggleValidatorsFilter())
    }

    const activeNetwork = useAppSelector(getActiveNetwork)
    const partnerData = useAppSelector(rootState =>
        selectPartnerData(
            rootState,
            '',
            store?.state?.activeWallet?.ethAddress
                ? '0x' + store?.state?.activeWallet?.ethAddress
                : '',
        ),
    )

    const partnerCChainAddress = useMemo(() => {
        const cAddress = partnerData?.attributes?.cChainAddresses.find(
            elem => elem.Network?.toLowerCase() === activeNetwork?.name?.toLowerCase(),
        )
        return cAddress || ''
    }, [partnerData, activeNetwork?.name])

    const auth = useAppSelector(state => state.appConfig.isAuth)

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
            <SearchInput searchByName={handleCompanyNameChange} />
            <BusinessFieldFilter />
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
                                checked={filters.validators}
                                onChange={handleValidatorsToggle}
                            />
                        }
                    />
                </Box>
                {isFeaturePartnerEnabled(activeNetwork?.name?.toLowerCase()) && (
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
                                    checked={filters.onMessenger}
                                    onChange={handleMessengerToggle}
                                />
                            }
                        />
                    </Box>
                )}
            </Box>
            {(!auth || !partnerCChainAddress) && (
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
            )}
        </Box>
    )
}

export default React.memo(PartnersFilter)
