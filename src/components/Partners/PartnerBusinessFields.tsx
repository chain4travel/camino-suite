import { Box, Chip } from '@mui/material'
import React from 'react'

type PartnerBusinessFieldsProps = { business_fields: any; isPartnerView?: boolean }

const PartnerBusinessFields = ({ business_fields, isPartnerView }: PartnerBusinessFieldsProps) => {
    const content =
        business_fields.data.length <= 2 || isPartnerView ? (
            business_fields.data.map((elem, key) => (
                <Chip
                    key={key}
                    sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        borderColor: theme => theme.palette.grey['700'],
                    }}
                    label={elem.attributes.BusinessField}
                />
            ))
        ) : (
            <>
                <Chip
                    sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        borderColor: theme => theme.palette.grey['700'],
                    }}
                    label={business_fields.data[0].attributes.BusinessField}
                />
                <Chip
                    sx={{
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        borderColor: theme => theme.palette.grey['700'],
                    }}
                    label={`+${business_fields.data.length - 1}`}
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
