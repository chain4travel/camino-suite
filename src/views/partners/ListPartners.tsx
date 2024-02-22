import { PartnerDataType, PartnersResponseType } from '../../@types/partners'

import { Box } from '@mui/material'
import PartnerCard from '../../components/Partners/PartnerCard'
import React from 'react'

interface ListPartnersProps {
    partners: PartnersResponseType
    setPartner: React.Dispatch<React.SetStateAction<PartnerDataType>>
}

const ListPartners: React.FC<ListPartnersProps> = ({ partners, setPartner }) => {
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
                        )
                            setPartner(partner)
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
