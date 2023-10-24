import { Box } from '@mui/material'
import React from 'react'
import { CompanyLogoColorType } from '../../@types/partners'
import { CAMINO_STRAPI } from '../../constants/route-paths'

interface PartnerLogoProps {
    companyName: string
    colorLogo: CompanyLogoColorType
    logoBox: string
}

const partners = [
    {
        partner: '51 nodes',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'A3M Global Monitoring',
        logoBox: 'noLogoBox',
    },
    {
        partner: 'AERTiCKET',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Algoteque',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Alpitour',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Andersen Group',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Asian Trails',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'AVRA Tours',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Axis Data',
    },
    {
        partner: 'Bentour',
    },
    {
        partner: 'Beereal',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Berge & Meer Touristik',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Beyond Bookings',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Biztribution',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Blaize',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'bloXmove',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Brickken',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Buk Technology',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Busy Rooms',
    },
    {
        partner: 'BytePitch - Software Labs',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Camino Network Foundation',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'CENAPro',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'CFM Media',
    },
    {
        partner: 'Clairvoyant Lab',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Codora',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Coherent',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'CompecTA',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'DataArt',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Dfns',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Disruptive Elements',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Dreamtime Travel',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Dtravel',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Econfirm',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Ekoios',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Embarking on Voyage',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Ennea',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Enwoke',
    },
    {
        partner: 'Eurowings',
    },
    {
        partner: 'Eurowings Holidays',
    },
    {
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Feratel',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Fireblocks',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Fitbooktravel',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Fraport',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Freshcells',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'FTI',
        logoBox: 'noLogoBox',
    },
    {
        partner: 'GIATA',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'GP Solutions',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Halfmage',
        missingInformation: '',
    },
    {
        partner: 'Hexens',
    },
    {
        partner: 'Hiberus',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'hlx',
    },
    {
        partner: 'Holiday Pirates',
    },
    {
        partner: 'Startseite',
    },
    {
        partner: 'Huerzeler',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Immutable Insight',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'InfoComm Management sarl',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Invia',
    },
    {
        partner: 'IT Kompass',
    },
    {
        partner: 'ITsquare',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Joonze',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Juniper Travel Technology',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Lufthansa',
    },
    {
        partner: 'Lufthansa City Center',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Lufthansa Holidays',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'MC2 Ventures',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'meinReisebüro24',
    },
    {
        partner: 'Midoco Group',
    },
    {
        partner: 'Miles & More',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'MTS',
        logoBox: '',
    },
    {
        partner: 'Netactica',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Nevermined',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'OH.TEC Tourism Expert Consulting',
    },
    {
        partner: 'Orchestra',
    },
    {
        partner: 'PRODYNA',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Riversoft Inc.',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Saltours',
    },
    {
        partner: 'Schauinsland Reisen',
    },
    {
        partner: 'Schmetterling',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'SH Financial',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Sixt',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Stripe',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Studio 5',
    },
    {
        partner: 'Sugartrends',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Sunweb',
    },
    {
        partner: 'TenetX',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Traffics',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'TraSo',
        logoBox: 'noLogoBox',
    },
    {
        partner: 'Travel Ledger',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Triend',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Turismoi',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Unicsoft',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Universal Beach Hotels',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Universal Mallorca Ferien',
    },
    {
        partner: 'Ventura Travel',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Vibe',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Videvago',
    },
    {
        partner: 'Vidma Security',
        logoBox: 'darkBgLogoBox',
    },
    {
        partner: 'Vivin Software Private Limited',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Whispers',
        logoBox: 'brightBgLogoBox',
    },
    {
        partner: 'Xeni',
    },
]
const determineBackground = (logoBox: string, companyName: string) => {
    let partner = partners.find(partner => partner.partner === companyName)
    let logoBoxBg = partner?.logoBox ? partner.logoBox : logoBox
    switch (logoBoxBg) {
        case 'darkBgLogoBox':
            return 'black'
        case 'noLogoBox':
            return 'transparent'
        case 'brightBgLogoBox':
            return 'white'
        default:
            return 'transparent'
    }
}
const PartnerLogo: React.FC<PartnerLogoProps> = ({ companyName, colorLogo, logoBox }) => {
    return (
        <Box
            sx={{
                width: '128px',
                height: '64px',
                display: 'flex',
                borderRadius: '8px',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                background: determineBackground(logoBox, companyName),
            }}
        >
            {colorLogo?.data?.attributes?.url && (
                <img
                    style={{ maxHeight: '50px', maxWidth: '100px' }}
                    src={`${CAMINO_STRAPI}${colorLogo.data.attributes.url}`}
                    alt={`${companyName} - Logo`}
                />
            )}
        </Box>
    )
}

export default React.memo(PartnerLogo)
