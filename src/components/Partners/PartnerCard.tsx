import { Box, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { PartnerDataType } from '../../@types/partners'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import useWallet from '../../hooks/useWallet'
import { selectValidators } from '../../redux/slices/app-config'
import { getActiveNetwork } from '../../redux/slices/network'
import PartnerBusinessFields from './PartnerBusinessFields'
import PartnerFlag from './PartnerFlag'
import PartnerLogo from './PartnerLogo'

interface PartnerCardProps {
    onClick: () => void
    clickable: boolean
    partner: PartnerDataType
    index: number
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, clickable, onClick }) => {
    useEffectOnce(() => {})
    const { getRegisteredNode } = useWallet()
    const [isValidator, setIsValidator] = useState(false)
    const validators = useAppSelector(selectValidators)
    const { getAddress } = useWallet()
    const activeNetwork = useAppSelector(getActiveNetwork)
    const chackValidatorStatus = async (address: string) => {
        try {
            if (!pChainAddress) setIsValidator(false)
            let nodeID = await getRegisteredNode(getAddress(address))
            setIsValidator(!!validators.find(v => v.nodeID === nodeID))
        } catch (e) {}
    }
    const {
        attributes: {
            companyName,
            companyShortDescription,
            business_fields,
            companyLogoColor,
            country_flag,
            logoBox,
            pChainAddress,
            pChainAddresses,
        },
    } = partner
    useEffect(() => {
        if (pChainAddresses) {
            let partnerAddresses = pChainAddresses.find(
                elem => elem.Network.toLowerCase() === activeNetwork?.name?.toLowerCase(),
            )
            if (partnerAddresses) chackValidatorStatus(partnerAddresses.pAddress)
        }
    }, [partner, validators])
    return (
        <Box
            onClick={onClick}
            sx={{
                minWidth: { xs: '100%', sm: '343px' },
                cursor: clickable ? 'pointer' : 'default',
                flex: '1 1 23%',
                maxWidth: { xs: '100%', md: '50%', xl: '25%' },
                background: theme => theme.palette.card.background,
                border: theme => `2px solid ${theme.palette.card.border}`,
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {!!companyLogoColor && !!companyName && (
                <PartnerLogo
                    colorLogo={companyLogoColor}
                    companyName={companyName}
                    logoBox={logoBox}
                />
            )}
            <Box sx={{ height: 'auto' }}>
                {!!companyName && <Typography variant="h5">{companyName}</Typography>}
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
            <Box
                sx={{
                    height: '65px',
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {!!companyShortDescription && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme => theme.palette.card.text,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                        }}
                    >
                        {companyShortDescription}
                    </Typography>
                )}
            </Box>
            {!!country_flag && !!country_flag.data?.attributes && (
                <PartnerFlag country={country_flag.data.attributes} />
            )}
            {!!business_fields && <PartnerBusinessFields business_fields={business_fields} />}
        </Box>
    )
}

export default React.memo(PartnerCard)
