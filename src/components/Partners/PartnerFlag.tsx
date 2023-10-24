import React from 'react'
import { Box, Typography } from '@mui/material'
import { CircleFlag } from 'react-circle-flags'
import { CountryFlagAttributesType } from '../../@types/partners'

interface PartnerFlagProps {
    country: CountryFlagAttributesType
}

const PartnerFlag: React.FC<PartnerFlagProps> = ({
    country: { countryName, countryIdentifier },
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CircleFlag countryCode={countryIdentifier.toLowerCase()} height="20" />
            <Typography variant="body1">{countryName}</Typography>
        </Box>
    )
}
export default React.memo(PartnerFlag)
