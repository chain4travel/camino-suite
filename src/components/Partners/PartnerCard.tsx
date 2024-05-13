import { Box, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { PartnerDataType } from '../../@types/partners'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import useWallet from '../../hooks/useWallet'
import { selectValidators } from '../../redux/slices/app-config'
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
    const chackValidatorStatus = async (address: string) => {
        if (!pChainAddress) setIsValidator(false)
        let nodeID = await getRegisteredNode(getAddress(address))
        setIsValidator(!!validators.find(v => v.nodeID === nodeID))
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
        },
    } = partner
    useEffect(() => {
        if (pChainAddress) chackValidatorStatus(pChainAddress)
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
            {!!isValidator && (
                <Box
                    sx={{
                        position: 'absolute',
                        background: theme => theme.palette.blue[50],
                        padding: '10px 14px 8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomLeftRadius: '8px',
                        right: '0',
                        top: '0',
                    }}
                >
                    <Typography sx={{ color: theme => theme.palette.grey[950] }} variant="overline">
                        Validator
                    </Typography>
                </Box>
            )}
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
