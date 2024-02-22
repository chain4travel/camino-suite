import { Box, Typography } from '@mui/material'

import { CircleFlag } from 'react-circle-flags'
import { CountryFlagAttributesType } from '../../@types/partners'
import React from 'react'

interface PartnerFlagProps {
    country: CountryFlagAttributesType
}

const PartnerFlag: React.FC<PartnerFlagProps> = ({
    country: { countryName, countryIdentifier },
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CircleFlag countryCode={countryIdentifier.toLowerCase()} height="20" />
            <Typography variant="caption" sx={{ color: theme => theme.palette.card.text }}>
                {countryName}
            </Typography>
        </Box>
    )
}
export default React.memo(PartnerFlag)
