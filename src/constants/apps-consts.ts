export const APPS_CONSTS = [
    {
        name: 'Network',
        subText: 'Camino network',
        url: '/',
        private: false,
        hidden: true,
    },
    {
        name: 'Wallet',
        subText: 'Secure, non-custodial wallet for Camino Assets.',
        url: '/wallet',
        private: false,
    },
    {
        name: 'Explorer',
        subText: 'Lookup network activity and statistics.',
        url: '/explorer',
        private: false,
    },
    {
        name: 'Foundation',
        subText: 'Tools for foundation members.',
        url: '/foundation',
        private: true,
        hidden: true,
    },
    {
        name: 'Partners',
        subText: 'Partners of the Camino Network.',
        url: '/partners',
        private: false,
    },
    {
        name: 'Settings',
        subText: 'Manage your wallet settings.',
        url: '/settings',
        private: true,
        hidden: true,
    },
]

export const TIMEOUT_DURATION = 60000 * 20 // in milliseconde

export const DRAWER_WIDTH = 300

export const BUSINESS_FIELDS = [
    'Aerospace',
    'Customer Engagement',
    'Loyalty',
    'Transportation',
    'Reviews',
    'Consulting',
    'Data Insights',
    'Distribution',
    'Finance',
    'Hospitality',
    'Software Development',
    'Travel Technology',
    'E-Mobility',
    'Security',
    'Software as a Service',
    'Metaverse',
    'Climate Technology',
]

export const ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
]

export const CONTRACTCMACCOUNTMANAGERADDRESSCOLUMBUS = '0xE5B2f76C778D082b07BDd7D51FFe83E3E055B47F'

export const CONTRACTCMACCOUNTMANAGERADDRESSCAMINO = '0xf9FE1eaAB73a2902136FE7A83E0703338D3b9F1e'
