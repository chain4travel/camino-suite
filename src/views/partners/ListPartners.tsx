import { PartnersResponseType } from '../../@types/partners'

import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import PartnerCard from '../../components/Partners/PartnerCard'
import { useAppSelector } from '../../hooks/reduxHooks'
import { selectValidators } from '../../redux/slices/app-config'

interface ListPartnersProps {
    partners: PartnersResponseType
}

const ListPartners: React.FC<ListPartnersProps> = ({ partners }) => {
    const navigate = useNavigate()
    const validators = useAppSelector(selectValidators)
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                maxWidth: theme => theme.customWidth.layoutMaxWitdh,
            }}
        >
            {partners.data.map((partner, index) => (
                <PartnerCard
                    validators={validators}
                    onClick={() => {
                        if (
                            !!(
                                partner.attributes.companyName &&
                                partner.attributes.companyLongDescription &&
                                partner.attributes.companyWebsite &&
                                partner.attributes.contactEmail &&
                                partner.attributes.contactFirstname &&
                                partner.attributes.contactLastname &&
                                partner.attributes.contactPhone
                            )
                        ) {
                            navigate(partner.attributes.companyName)
                        }
                    }}
                    partner={partner}
                    key={index}
                    clickable={
                        !!(
                            partner.attributes.companyName &&
                            partner.attributes.companyLongDescription &&
                            partner.attributes.companyWebsite &&
                            partner.attributes.contactEmail &&
                            partner.attributes.contactFirstname &&
                            partner.attributes.contactLastname &&
                            partner.attributes.contactPhone
                        )
                    }
                    index={index}
                />
            ))}
        </Box>
    )
}

export default React.memo(ListPartners)
