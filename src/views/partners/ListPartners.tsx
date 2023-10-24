import { Box } from '@mui/material'
import React from 'react'
import { PartnerDataType, PartnersResponseType } from '../../@types/partners'
import PartnerCard from '../../components/Partners/PartnerCard'

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
                            partner.attributes.companyName &&
                            partner.attributes.companyLongDescription &&
                            partner.attributes.companyWebsite &&
                            partner.attributes.contactEmail &&
                            partner.attributes.contactFirstname &&
                            partner.attributes.contactLastname &&
                            partner.attributes.contactPhone
                        )
                            setPartner(partner)
                    }}
                    partner={partner}
                    key={index}
                    index={index}
                />
            ))}
        </Box>
    )
}

export default React.memo(ListPartners)
