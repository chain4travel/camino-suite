import { mdiArrowLeft } from '@mdi/js'
import Icon from '@mdi/react'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { PartnerDataType } from '../../@types/partners'
import PartnerBusinessFields from '../../components/Partners/PartnerBusinessFields'
import PartnerFlag from '../../components/Partners/PartnerFlag'
import PartnerLogo from '../../components/Partners/PartnerLogo'

interface PartnerProps {
    partner: PartnerDataType
    setPartner: React.Dispatch<React.SetStateAction<PartnerDataType>>
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
        <Box sx={{ height: '100%' }}>
            <Box sx={{ mb: '2rem' }}>
                <Button
                    sx={{
                        height: '40px',
                        padding: theme => theme.customPadding.defaultPadding,
                        borderRadius: theme => theme.customShape.borderRadiusSm,
                        border: theme => `2px solid ${theme.palette.grey[700]}`,
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
                        <Typography variant="h1">{companyName}</Typography>
                        {!!isConsortiumMember && (
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
                        )}
                    </Box>
                    <Typography variant="body1">{companyShortDescription}</Typography>
                    <Box>
                        <PartnerBusinessFields
                            business_fields={business_fields}
                            isPartnerView={true}
                        />
                    </Box>
                    <Box sx={{ paddingBottom: '1.5rem' }}>
                        <Typography variant="h3">Description</Typography>
                        <Typography variant="body1">{companyLongDescription}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={[
                        {
                            flex: '0 1 30%',
                            maxWidth: '350px',
                            minWidth: '300px',
                            border: theme => `2px solid ${theme.palette.blue[50]}`,
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem 1.5rem' }}>
                        <Typography
                            sx={{
                                mb: '.5rem',
                                color: theme => theme.palette.text.primary,
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            company country
                        </Typography>
                        {country_flag && country_flag.data?.attributes && (
                            <PartnerFlag country={country_flag.data.attributes} />
                        )}
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem 1.5rem' }}>
                        <Typography
                            sx={{
                                mb: '.5rem',
                                color: theme => theme.palette.text.primary,
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Direct Contact
                        </Typography>
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
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem 1.5rem' }}>
                        <Typography
                            sx={{
                                mb: '.5rem',
                                color: theme => theme.palette.text.primary,
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Contact Email
                        </Typography>
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
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem 1.5rem' }}>
                        <Typography
                            sx={{
                                mb: '.5rem',
                                color: theme => theme.palette.text.primary,
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Contact Phone
                        </Typography>
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
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem 1.5rem' }}>
                        <Typography
                            sx={{
                                mb: '.5rem',
                                color: theme => theme.palette.text.primary,
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Website
                        </Typography>
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Partner
