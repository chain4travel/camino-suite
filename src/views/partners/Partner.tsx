import { Box, Button, Divider, Typography, useTheme } from '@mui/material'

import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import PartnerBusinessFields from '../../components/Partners/PartnerBusinessFields'
import { PartnerDataType } from '../../@types/partners'
import PartnerFlag from '../../components/Partners/PartnerFlag'
import PartnerLogo from '../../components/Partners/PartnerLogo'
import React from 'react'
import { mdiArrowLeft } from '@mdi/js'

interface PartnerProps {
    partner: PartnerDataType
    setPartner: React.Dispatch<React.SetStateAction<PartnerDataType>>
}

const ContentField = ({ label, children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                p: { xs: '0.5rem 0.75rem', md: '1rem 1.5rem' },
                justifyContent: { xs: 'space-between', md: 'center' },
                flexWrap: 'wrap',
                alignItems: { xs: 'center', md: 'inherit' },
                gap: '.5rem',
            }}
        >
            <Typography
                sx={{
                    color: theme => theme.palette.text.primary,
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: '20px',
                    textTransform: 'uppercase',
                }}
            >
                {label}
            </Typography>
            {children}
        </Box>
    )
}

const Partner: React.FC<PartnerProps> = ({ partner, setPartner }) => {
    const {
        attributes: {
            isConsortiumMember,
            companyName,
            companyShortDescription,
            companyLongDescription,
            business_fields,
            companyLogoColor,
            country_flag,
            contactEmail,
            companyWebsite,
            contactPhone,
            contactFirstname,
            contactLastname,
            logoBox,
        },
    } = partner
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    return (
        <Box sx={{ height: '100%', mb: '2rem' }}>
            <Box sx={{ mb: '2rem' }}>
                <Button
                    sx={{
                        height: '40px',
                        width: { xs: '100%', sm: 'fit-content' },
                        padding: theme => theme.customPadding.defaultPadding,
                        borderRadius: theme => theme.customShape.borderRadiusSm + ' !important',
                        border: theme => `1px solid ${theme.palette.grey[700]}`,
                    }}
                    startIcon={<Icon path={mdiArrowLeft} size={0.8} />}
                    onClick={() => setPartner(null)}
                >
                    Back to all companies
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { md: 'row', xs: 'column-reverse' },
                    gap: '1rem',
                }}
            >
                <Box
                    sx={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Typography variant="h3">{companyName}</Typography>
                        {/* the badge validator will be added when the api support getting p-chain
                        address */}
                        {/* {!!isConsortiumMember && (
                            <Box
                                sx={{
                                    background: theme => theme.palette.background.gradient,
                                    padding: '10px 14px 8px 12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: theme => theme.shape.borderRadius,
                                    width: 'fit-content',
                                }}
                            >
                                <Typography sx={{ color: 'common.white' }}>Validator</Typography>
                            </Box>
                        )} */}
                    </Box>
                    <Typography variant="caption">{companyShortDescription}</Typography>
                    <Box>
                        <PartnerBusinessFields
                            business_fields={business_fields}
                            isPartnerView={true}
                        />
                    </Box>
                    <Box sx={{ paddingBottom: '1.5rem' }}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">{companyLongDescription}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={[
                        {
                            flex: '0 1 30%',
                            maxWidth: { xs: '100%', md: '350px' },
                            minWidth: { xs: '100%', md: '300px' },
                            border: {
                                md: '2px solid #B5E3FD !important',
                                xs: 'none',
                            },

                            borderRadius: '16px',
                        },
                        !isDark && { backgroundColor: theme => theme.palette.background.paper },
                    ]}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: '1rem 1.5rem',
                        }}
                    >
                        <PartnerLogo
                            colorLogo={companyLogoColor}
                            companyName={companyName}
                            logoBox={logoBox}
                        />
                    </Box>
                    <Divider />
                    <ContentField label="company country">
                        {country_flag && country_flag.data?.attributes && (
                            <PartnerFlag country={country_flag.data.attributes} />
                        )}
                    </ContentField>
                    <Divider />
                    <ContentField label="Direct Contact">
                        <Typography
                            sx={{
                                color: theme => theme.palette.card.text,
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '150%',
                            }}
                        >
                            {contactFirstname + ' ' + contactLastname}
                        </Typography>
                    </ContentField>
                    <Divider />
                    <ContentField label="Contact Email">
                        <Link
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                            to={'mailto:' + contactEmail}
                        >
                            <Typography
                                sx={{
                                    color: theme => theme.palette.card.text,
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '150%',
                                }}
                            >
                                {contactEmail}
                            </Typography>
                        </Link>
                    </ContentField>
                    <Divider />
                    <ContentField label="Contact Phone">
                        <Link
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                            to={'tel:' + contactPhone}
                        >
                            <Typography
                                sx={{
                                    color: theme => theme.palette.card.text,
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '150%',
                                }}
                            >
                                {contactPhone}
                            </Typography>
                        </Link>
                    </ContentField>
                    <Divider />
                    <ContentField label="Website">
                        <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                            to={companyWebsite}
                        >
                            <Typography
                                sx={{
                                    color: theme => theme.palette.card.text,
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '150%',
                                }}
                            >
                                {companyWebsite}
                            </Typography>
                        </Link>
                    </ContentField>
                </Box>
            </Box>
        </Box>
    )
}

export default Partner
