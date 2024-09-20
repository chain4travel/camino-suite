import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import PartnerCard from '../../components/Partners/PartnerCard'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { useListMatchingPartnersQuery } from '../../redux/services/partners'

const MatchingPartners = ({ state }) => {
    const value = usePartnerConfigurationContext()
    const {
        data: partners,
        isLoading,
        isFetching,
        error,
    } = useListMatchingPartnersQuery({
        ...state,
        supportedResult: value?.state?.stepsConfig[1]?.services,
        wantedResult: value?.state?.stepsConfig[2]?.services,
    })
    const navigate = useNavigate()
    if (isLoading || isFetching || error || !partners || partners?.data?.length === 0) return <></>
    return (
        <>
            <Typography variant="h5">Matching Partners</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    maxWidth: theme => theme.customWidth.layoutMaxWitdh,
                }}
            >
                {partners.data &&
                    partners.data.map((partner, index) => (
                        <PartnerCard
                            onClick={() => {
                                navigate(partner.attributes.companyName)
                            }}
                            partner={partner}
                            key={partner.attributes.companyName}
                            clickable={true}
                            index={index}
                        />
                    ))}
            </Box>
        </>
    )
}

export default MatchingPartners
