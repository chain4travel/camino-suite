import { Box, Chip } from '@mui/material'

import React from 'react'
import { BusinessFieldsType } from '../../@types/partners'
import { groupedBusinessFields } from '../../redux/services/partners'

type PartnerBusinessFieldsProps = { business_fields: BusinessFieldsType; isPartnerView?: boolean }

const PartnerBusinessFields = ({ business_fields, isPartnerView }: PartnerBusinessFieldsProps) => {
    const flatFields = groupedBusinessFields(business_fields?.data).flatMap(
        category => category.fields,
    )

    const content =
        flatFields.length <= 2 || isPartnerView ? (
            flatFields.map((field, index) => (
                <Chip
                    key={index}
                    sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        fontSize: '12px',
                        borderColor: theme => theme.palette.grey['700'],
                    }}
                    label={field.name}
                />
            ))
        ) : (
            <>
                <Chip
                    sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        fontSize: '12px',
                        borderColor: theme => theme.palette.grey['700'],
                    }}
                    label={flatFields[0].name}
                />
                <Chip
                    sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        borderColor: theme => theme.palette.grey['700'],
                        fontSize: '12px',
                    }}
                    label={`+${flatFields.length - 1}`}
                />
            </>
        )

    return (
        <Box
            sx={{
                whiteSpace: 'wrap',
                width: '100%',
                display: 'flex',
                gap: '0.4rem',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            {content}
        </Box>
    )
}

export default PartnerBusinessFields
