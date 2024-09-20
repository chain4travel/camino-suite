import { Box, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import PartnerCard from '../../components/Partners/PartnerCard'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { useSmartContract } from '../../helpers/useSmartContract'
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
    const sc = useSmartContract()
    const matchingPartnersFiltred = useMemo(() => {
        return partners?.data
            ? partners?.data?.filter(elem => elem.attributes.cChainAddress != sc?.wallet?.address)
            : []
    }, [partners])
    const navigate = useNavigate()
    if (
        isLoading ||
        isFetching ||
        error ||
        !matchingPartnersFiltred ||
        matchingPartnersFiltred?.data?.length === 0
    )
        return <></>
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
                {matchingPartnersFiltred &&
                    matchingPartnersFiltred.map((partner, index) => (
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
