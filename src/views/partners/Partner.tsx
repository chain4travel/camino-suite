import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material'

import { mdiArrowLeft } from '@mdi/js'
import Icon from '@mdi/react'
import { ContentCopy } from '@mui/icons-material'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PartnerBusinessFields from '../../components/Partners/PartnerBusinessFields'
import PartnerFlag from '../../components/Partners/PartnerFlag'
import PartnerLogo from '../../components/Partners/PartnerLogo'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useFetchPartnerDataQuery } from '../../redux/services/partners'
import {
    displayFirstPartLongString,
    displaySecondPartLongString,
    transformServiceNames,
} from '../../utils/display-utils'

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

const Partner = () => {
    const auth = useAppSelector(state => state.appConfig.isAuth)
    let { partnerID } = useParams()
    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    const value = useSmartContract()
    const path = window.location.pathname
    const {
        data: partner,
        isLoading,
        isFetching,
        error,
    } = useFetchPartnerDataQuery({
        companyName: partnerID,
        cChainAddress: !path.includes('partners/messenger-configuration')
            ? ''
            : value?.wallet?.address,
    })
    const navigate = useNavigate()
    const { state, dispatch } = usePartnerConfigurationContext()
    if (error || (!partner && !isFetching && !isLoading)) {
        navigate('/partners')
        return null
    }

    const OwnBusinsessNotOnMessenger = (
        <>
            <Typography variant="h6" fontWeight={600}>
                Connect now and interact with other partners
            </Typography>
            <Typography variant="caption" fontWeight={400}>
                For the MVP, the C-Chain address of the person which will be operating need to be
                stored in Strapi prior, then this button appears.
            </Typography>
            <Button
                onClick={() => navigate('/partners/messenger-configuration/mymessenger')}
                sx={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg, #0085FF 0%, #B440FC 100%)',
                }}
            >
                Create Messenger account
            </Button>
        </>
    )

    const OwnBusinessOnMessensger = (
        <>
            <Typography variant="h6" fontWeight={600}>
                Camino Messenger
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography fontSize={12} fontWeight={400} lineHeight={'16px'} color={'#B3DAFF'}>
                    Wanted Services
                </Typography>
                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                    {transformServiceNames(state.stepsConfig[2].services)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography fontSize={12} fontWeight={400} lineHeight={'16px'} color={'#B3DAFF'}>
                    Offered Services
                </Typography>
                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                    {transformServiceNames(state.stepsConfig[1].services)}
                </Typography>
            </Box>
            {value?.wallet?.address && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Typography
                        fontSize={12}
                        fontWeight={400}
                        lineHeight={'16px'}
                        color={'#B3DAFF'}
                    >
                        Partner address
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography
                            fontSize={14}
                            fontWeight={600}
                            lineHeight="20px"
                            component="span"
                        >
                            {displayFirstPartLongString(value?.wallet?.address, 28)}&hellip;
                            {displaySecondPartLongString(value?.wallet?.address, 28)}
                        </Typography>
                        <IconButton
                            onClick={() => navigator.clipboard.writeText(value.wallet.address)}
                            size="small"
                            sx={{
                                color: theme => `${theme.palette.text.primary} !important`,
                            }}
                        >
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            )}
            <Button
                onClick={() => navigate('/partners/messenger-configuration/mymessenger')}
                sx={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    backgroundColor: theme =>
                        theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                }}
            >
                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                    Configure Messenger
                </Typography>
            </Button>
        </>
    )
    if (isLoading || isFetching) return <></>
    return (
        <Box sx={{ height: '100%', mb: '2rem' }}>
            {!path.includes('partners/messenger-configuration') && (
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
                        onClick={() => navigate('/partners')}
                    >
                        Back to all companies
                    </Button>
                </Box>
            )}
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
                        <Typography variant="h3">{partner.attributes.companyName}</Typography>
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
                    <Typography variant="caption">
                        {partner.attributes.companyShortDescription}
                    </Typography>
                    <Box>
                        <PartnerBusinessFields
                            business_fields={partner.attributes.business_fields}
                            isPartnerView={true}
                        />
                    </Box>
                    <Box sx={{ paddingBottom: '1.5rem' }}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">
                            {partner.attributes.companyLongDescription}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        flex: '0 1 30%',
                        maxWidth: { xs: '100%', md: '350px' },
                        minWidth: { xs: '100%', md: '300px' },
                    }}
                >
                    {auth && path.includes('partners/messenger-configuration') && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: value.contractCMAccountAddress ? '16px' : '8px',
                                padding: '20px',
                                borderRadius: '12px',
                                position: 'relative',
                                backgroundColor: theme =>
                                    theme.palette.mode === 'dark' ? '#0F182A' : '#F1F5F9',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: '12px',
                                    padding: '2px',
                                    background: 'linear-gradient(135deg, #B440FC 0%, #35E9AD 100%)',
                                    WebkitMask:
                                        'linear-gradient(#fff 0 0) content-box, ' +
                                        'linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                },
                            }}
                        >
                            {value?.contractCMAccountAddress
                                ? OwnBusinessOnMessensger
                                : OwnBusinsessNotOnMessenger}
                        </Box>
                    )}
                    <Box
                        sx={[
                            {
                                width: '100%',
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
                                colorLogo={partner.attributes.companyLogoColor}
                                companyName={partner.attributes.companyName}
                                logoBox={partner.attributes.logoBox}
                            />
                        </Box>
                        <Divider />
                        <ContentField label="company country">
                            {partner.attributes.country_flag &&
                                partner.attributes.country_flag.data?.attributes && (
                                    <PartnerFlag
                                        country={partner.attributes.country_flag.data.attributes}
                                    />
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
                                {partner.attributes.contactFirstname +
                                    ' ' +
                                    partner.attributes.contactLastname}
                            </Typography>
                        </ContentField>
                        <Divider />
                        <ContentField label="Contact Email">
                            <Link
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                                to={'mailto:' + partner.attributes.contactEmail}
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
                                    {partner.attributes.contactEmail}
                                </Typography>
                            </Link>
                        </ContentField>
                        <Divider />
                        <ContentField label="Contact Phone">
                            <Link
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                                to={'tel:' + partner.attributes.contactPhone}
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
                                    {partner.attributes.contactPhone}
                                </Typography>
                            </Link>
                        </ContentField>
                        <Divider />
                        <ContentField label="Website">
                            <Link
                                rel="noopener noreferrer"
                                target="_blank"
                                style={{ textDecoration: 'none' }}
                                to={partner.attributes.companyWebsite}
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
                                    {partner.attributes.companyWebsite}
                                </Typography>
                            </Link>
                        </ContentField>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Partner
