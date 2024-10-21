import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material'

import { mdiArrowLeft } from '@mdi/js'
import Icon from '@mdi/react'
import { ContentCopy } from '@mui/icons-material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import store from 'wallet/store'
import PartnerBusinessFields from '../../components/Partners/PartnerBusinessFields'
import PartnerFlag from '../../components/Partners/PartnerFlag'
import PartnerLogo from '../../components/Partners/PartnerLogo'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { usePartnerConfig } from '../../helpers/usePartnerConfig'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppSelector } from '../../hooks/reduxHooks'
import useWallet from '../../hooks/useWallet'
import { useFetchPartnerDataQuery, useIsPartnerQuery } from '../../redux/services/partners'
import { selectValidators } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import { displayFirstPartLongString, displaySecondPartLongString } from '../../utils/display-utils'

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

const getServiceType = service => {
    const parts = service.split('.')
    return parts[4]
}

function getServiceName(fullName: unknown): string {
    if (typeof fullName !== 'string') {
        console.error(`Expected string, but got ${typeof fullName}:`, fullName)
        return ''
    }
    const parts = fullName.split('.')
    return parts[parts.length - 1] || ''
}

const Widget = ({
    supportedServices,
    CMAccountAddress,
    wantedServices,
    supportedCurrencies,
    partner,
}) => {
    const { data, refetch } = useIsPartnerQuery({
        cChainAddress: store?.state?.activeWallet?.ethAddress
            ? '0x' + store?.state?.activeWallet?.ethAddress
            : '',
    })
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const value = useSmartContract()
    const navigate = useNavigate()
    const [match, setMatch] = useState(false)
    const wantedServiceTypes = useMemo(() => {
        return [
            ...new Set(
                wantedServices.map(elem => {
                    const serviceName = elem?.name ? elem.name : ''
                    const serviceType = getServiceType(serviceName)
                    return serviceType.endsWith('Service') ? serviceType.slice(0, -7) : serviceType
                }),
            ),
        ]
    }, [])
    const supportedServiceTypes = useMemo(() => {
        return [
            ...new Set(
                supportedServices.map(elem => {
                    const serviceName = elem?.name ? elem.name : ''
                    const serviceType = getServiceType(serviceName)
                    return serviceType.endsWith('Service')
                        ? serviceType.slice(0, -7) // Remove 'Service' from the end
                        : serviceType
                }),
            ),
        ]
    }, [])

    const activeNetwork = useAppSelector(getActiveNetwork)
    useEffect(() => {
        if (activeNetwork) refetch()
    }, [activeNetwork])
    const partnerConf = usePartnerConfig()

    function checkMatch(data): boolean {
        const supportedResult = new Set(data.supportedResult.map(getServiceName))
        const wantedResult = new Set(data.wantedResult.map(getServiceName))

        const wantedServices = new Set(
            data.wantedServices.map(service => getServiceName(service.name)),
        )
        const supportedServices = new Set(
            data.supportedServices.map(service => getServiceName(service.name)),
        )

        const match1 = Array.from(supportedResult).some(service => wantedServices.has(service))
        const match2 = Array.from(wantedResult).some(service => supportedServices.has(service))

        return match1 || match2
    }
    const matchingPartners = useCallback(async () => {
        if (
            partnerConf &&
            partnerConf.account &&
            CMAccountAddress.toLocaleLowerCase() !==
                value?.contractCMAccountAddress.toLocaleLowerCase()
        ) {
            const supportedResult = await partnerConf.getSupportedServices()
            const wantedResult = await partnerConf.getWantedServices()

            const result = checkMatch({
                supportedResult: supportedResult && supportedResult[0] ? supportedResult[0] : [],
                wantedResult,
                supportedServices,
                wantedServices,
            })
            if (result) setMatch(true)
            else setMatch(false)
        }
    }, [partnerConf, auth])

    const generateEmail = () => {
        let partnerWanetd = [
            ...new Set(
                partner.wantedServices.map(elem => {
                    const serviceName = elem?.name ? elem.name : ''
                    const serviceType = getServiceType(serviceName)
                    return serviceType.endsWith('Service') ? serviceType.slice(0, -7) : serviceType
                }),
            ),
        ].join(', ')
        let partnerSupported = [
            ...new Set(
                partner.supportedServices.map(elem => {
                    const serviceName = elem?.name ? elem.name : ''
                    const serviceType = getServiceType(serviceName)
                    return serviceType.endsWith('Service') ? serviceType.slice(0, -7) : serviceType
                }),
            ),
        ].join(', ')
        let otherPartnerAccept = []
        if (partner.supportedCurrencies && supportedCurrencies.isCam) otherPartnerAccept.push('CAM')
        if (partner.supportedCurrencies && supportedCurrencies.offChainPaymentSupported)
            otherPartnerAccept.push('offChainPaymentSupported')
        if (
            partner.supportedCurrencies &&
            supportedCurrencies.tokens &&
            supportedCurrencies.tokens.length > 0
        )
            otherPartnerAccept = [
                ...otherPartnerAccept,
                [...supportedCurrencies.tokens.filter(elem => elem.symbol)],
            ]
        let myPartnerAccept = []
        if (data.supportedCurrencies && data.supportedCurrencies.isCam) myPartnerAccept.push('CAM')
        if (data.supportedCurrencies && data.supportedCurrencies.offChainPaymentSupported)
            myPartnerAccept.push('offChainPaymentSupported')
        if (
            data.supportedCurrencies &&
            data.supportedCurrencies.tokens &&
            data.supportedCurrencies.tokens.length > 0
        ) {
            myPartnerAccept = [
                ...myPartnerAccept,
                ...data.supportedCurrencies.tokens.map(elem => elem.symbol),
            ]
        }
        const subject = 'Connect on Camino Messenger'
        let bodyEnding = match
            ? `

    Offered and/or wanted services by you combine with what we look for and offer on Camino Network: we can easily connect via the Messenger.
        
    Please get in touch at your convenience to discuss a connection on Camino Messenger.

    Best Regards`
            : `

    Please get in touch at your convenience to discuss a connection on Camino Messenger.

    Best Regards`
        const body =
            `
    Dear Sirs,
    
    we are both on Camino Messenger.
    
    You: ${partner.attributes.companyName}
    Offer: ${partnerSupported}
    Want: ${partnerWanetd}
    Accept: ${otherPartnerAccept.join(', ')}
    Messenger Address: ${partner.contractAddress}
    
    We: ${data.attributes.companyName}
    Offer: ${supportedServiceTypes}
    Want: ${wantedServiceTypes}
    Accept: ${myPartnerAccept}
    Messenger Address: ${value?.contractCMAccountAddress}` + bodyEnding

        const mailtoLink = `mailto:${
            partner.attributes.contactEmail
        }?cc=foundation@camino.network&subject=${encodeURIComponent(
            subject,
        )}&body=${encodeURIComponent(body)}`
        window.location.href = mailtoLink
    }
    useEffect(() => {
        matchingPartners()
    }, [])
    return (
        <>
            <Typography variant="h6" fontWeight={600}>
                Camino Messenger
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography fontSize={12} fontWeight={400} lineHeight={'16px'} color={'#B3DAFF'}>
                    Offered Services
                </Typography>
                {supportedServiceTypes.length > 0 ? (
                    <ul style={{ marginLeft: '16px' }}>
                        {supportedServiceTypes.map((type, index) => (
                            <li key={index} className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    {type}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul style={{ marginLeft: '16px' }}>
                        <li className="service-type-item">
                            <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                None.
                            </Typography>
                        </li>
                    </ul>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography fontSize={12} fontWeight={400} lineHeight={'16px'} color={'#B3DAFF'}>
                    Wanted Services
                </Typography>
                {wantedServiceTypes.length > 0 ? (
                    <ul style={{ marginLeft: '16px' }}>
                        {wantedServiceTypes.map((type, index) => (
                            <li key={index} className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    {type}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul style={{ marginLeft: '16px' }}>
                        <li className="service-type-item">
                            <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                None.
                            </Typography>
                        </li>
                    </ul>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography fontSize={12} fontWeight={400} lineHeight={'16px'} color={'#B3DAFF'}>
                    Supported Currencies
                </Typography>
                {supportedCurrencies ? (
                    <ul style={{ marginLeft: '16px' }}>
                        {supportedCurrencies?.isCam && (
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    CAM
                                </Typography>
                            </li>
                        )}
                        {supportedCurrencies?.offChainPaymentSupported && (
                            <li className="service-type-item">
                                <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                    OffChainPaymentSupported
                                </Typography>
                            </li>
                        )}
                        {supportedCurrencies?.tokens && supportedCurrencies?.tokens.length > 0 && (
                            <>
                                {supportedCurrencies?.tokens.map((elem, index) => {
                                    return (
                                        <li className="service-type-item" key={index}>
                                            <Typography
                                                fontSize={14}
                                                fontWeight={600}
                                                lineHeight={'20px'}
                                            >
                                                {elem.symbol}
                                            </Typography>
                                        </li>
                                    )
                                })}
                            </>
                        )}
                        {!supportedCurrencies?.offChainPaymentSupported &&
                            !supportedCurrencies?.isCam &&
                            supportedCurrencies.tokens?.length < 1 && (
                                <li className="service-type-item">
                                    <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                        None.
                                    </Typography>
                                </li>
                            )}
                    </ul>
                ) : (
                    <ul style={{ marginLeft: '16px' }}>
                        <li>
                            <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                                None.
                            </Typography>
                        </li>
                    </ul>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography fontSize={12} fontWeight={400} lineHeight={'16px'} color={'#B3DAFF'}>
                    Partner address
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography fontSize={14} fontWeight={600} lineHeight="20px" component="span">
                        {displayFirstPartLongString(CMAccountAddress, 28)}&hellip;
                        {displaySecondPartLongString(CMAccountAddress, 28)}
                    </Typography>
                    <IconButton
                        onClick={() => navigator.clipboard.writeText(CMAccountAddress)}
                        size="small"
                        sx={{
                            color: theme => `${theme.palette.text.primary} !important`,
                        }}
                    >
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            {match && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Divider />
                    <Typography variant="subtitle2">It’s a match</Typography>
                    <Typography variant="caption">
                        Offered and/or wanted services by this Partner combine with what you look
                        for and offer on Camino Network: you can easily connect with them via the
                        Messenger.
                    </Typography>
                </Box>
            )}
            {auth &&
                CMAccountAddress.toLocaleLowerCase() ===
                    value?.contractCMAccountAddress.toLocaleLowerCase() && (
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
                )}
            {auth &&
                CMAccountAddress.toLocaleLowerCase() !==
                    value?.contractCMAccountAddress.toLocaleLowerCase() && (
                    <Button
                        onClick={generateEmail}
                        sx={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            background: 'linear-gradient(90deg, #0085FF 0%, #B440FC 100%)',
                            backgroundColor: theme =>
                                theme.palette.mode === 'dark' ? '#020617' : '#F1F5F9',
                        }}
                    >
                        <Typography fontSize={14} fontWeight={600} lineHeight={'20px'}>
                            Contact
                        </Typography>
                    </Button>
                )}
        </>
    )
}

const Partner = () => {
    const auth = useAppSelector(state => state.appConfig.isAuth)
    let { partnerID } = useParams()

    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'
    const value = useSmartContract()
    const [isValidator, setIsValidator] = useState(false)
    const path = window.location.pathname
    const {
        data: partner,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useFetchPartnerDataQuery({
        companyName: partnerID,
        cChainAddress: !path.includes('partners/messenger-configuration')
            ? ''
            : value?.wallet?.address,
    })
    const navigate = useNavigate()
    const { getRegisteredNode, getAddress } = useWallet()
    const validators = useAppSelector(selectValidators)
    const { state, dispatch } = usePartnerConfigurationContext()

    const activeNetwork = useAppSelector(getActiveNetwork)
    useEffect(() => {
        if (activeNetwork) refetch()
    }, [activeNetwork])
    const chackValidatorStatus = async (address: string) => {
        if (!partner.attributes.pChainAddress) setIsValidator(false)
        let nodeID = await getRegisteredNode(getAddress(address))
        setIsValidator(!!validators.find(v => v.nodeID === nodeID))
    }

    useEffect(() => {
        if (partner?.attributes.pChainAddress)
            chackValidatorStatus(partner.attributes.pChainAddress)
    }, [partner, validators])

    if (error || (!partner && !isFetching && !isLoading)) {
        navigate('/partners')
        return null
    }

    const OwnBusinsessNotOnMessenger = (
        <>
            <Typography variant="h6" fontWeight={600}>
                Connect now and interact with Partners onchain.
            </Typography>
            <Typography variant="caption" fontWeight={400}>
                This starts the multi-step process to create and configure the Camino Messenger for
                this Partner.
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

    if (isLoading || isFetching || !partner) return <></>
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
                        Back to all Partners
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {!!isValidator && (
                            <Box
                                sx={{
                                    width: '96px',
                                    height: '20px',
                                    background: theme => theme.palette.blue[50],
                                    padding: '0px, 8px, 0px, 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    letterSpacing: '1.6px',
                                }}
                            >
                                <Typography
                                    sx={{ color: theme => theme.palette.grey[950] }}
                                    variant="overline"
                                >
                                    Validator
                                </Typography>
                            </Box>
                        )}
                        {partner.contractAddress && (
                            <Box
                                sx={{
                                    width: '129px',
                                    height: '20px',
                                    background: '#09DE6B33',
                                    padding: '0px, 8px, 0px, 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    letterSpacing: '1.6px',
                                }}
                            >
                                <Typography sx={{ color: '#18B728' }} variant="overline">
                                    On messenger
                                </Typography>
                            </Box>
                        )}
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
                    {auth && path.includes('partners/messenger-configuration') ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
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
                            {value?.contractCMAccountAddress ? (
                                <Widget
                                    wantedServices={state.stepsConfig[2].services}
                                    supportedServices={state.stepsConfig[1].services}
                                    CMAccountAddress={value?.contractCMAccountAddress}
                                    supportedCurrencies={partner.supportedCurrencies}
                                    partner={partner}
                                />
                            ) : (
                                OwnBusinsessNotOnMessenger
                            )}
                        </Box>
                    ) : (
                        partner.contractAddress && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
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
                                        background:
                                            'linear-gradient(135deg, #B440FC 0%, #35E9AD 100%)',
                                        WebkitMask:
                                            'linear-gradient(#fff 0 0) content-box, ' +
                                            'linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        maskComposite: 'exclude',
                                    },
                                }}
                            >
                                <Widget
                                    wantedServices={partner.wantedServices}
                                    supportedServices={partner.supportedServices}
                                    CMAccountAddress={partner.contractAddress}
                                    supportedCurrencies={partner.supportedCurrencies}
                                    partner={partner}
                                />
                            </Box>
                        )
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
