import { PartnersResponseType } from '../../@types/partners'

import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import PartnerCard from '../../components/Partners/PartnerCard'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { getCurrentValidators } from '../../redux/slices/utils'

interface ListPartnersProps {
    partners: PartnersResponseType
}

const ListPartners: React.FC<ListPartnersProps> = ({ partners }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCurrentValidators())
    }, [])
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
                        navigate(partner.attributes.companyName)
                    }}
                    partner={partner}
                    key={partner.attributes.companyName}
                    clickable={true}
                    index={index}
                />
            ))}
        </Box>
    )
}

export default React.memo(ListPartners)
