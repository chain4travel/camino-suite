import { Box, Typography } from '@mui/material'
import React from 'react'
import { PartnerDataType } from '../../@types/partners'
import PartnerBusinessFields from './PartnerBusinessFields'
import PartnerFlag from './PartnerFlag'
import PartnerLogo from './PartnerLogo'

interface PartnerCardProps {
    onClick: () => void
    partner: PartnerDataType
    index: number
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onClick }) => {
    const {
        attributes: {
            isConsortiumMember,
            companyName,
            companyShortDescription,
            business_fields,
            companyLogoColor,
            country_flag,
            logoBox,
        },
    } = partner

    return (
        <Box
            onClick={onClick}
            sx={{
                minWidth: '300px',
                cursor: 'pointer',
                flex: '1 1 23%',
                maxWidth: '400px',
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
            {/*
            // this value is incorrect, it should be based on the pchain addres but its not yet added to the api
             {!!isConsortiumMember && (
                <Box
                    sx={{
                        position: 'absolute',
                        background: theme => theme.palette.background.gradient,
                        padding: '10px 14px 8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomLeftRadius: '8px',
                        right: '0',
                        top: '0',
                    }}
                >
                    <Typography sx={{ color: 'common.white' }}>Validator</Typography>
                </Box>
            )} */}
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

export default PartnerCard
