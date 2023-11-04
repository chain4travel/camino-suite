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
        name: 'Settings',
        subText: 'Manage your wallet settings.',
        url: '/settings',
        private: true,
        hidden: true,
    },
    {
        name: 'Foundation',
        subText: 'Lookup network activity and statistics.',
        url: '/foundation',
        private: true,
        hidden: true,
    },
]

export const TIMEOUT_DURATION = 60000 * 20 // in milliseconde

export const DRAWER_WIDTH = 300
