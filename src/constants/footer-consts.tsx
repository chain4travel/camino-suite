import {
    DISCORD,
    GITHUB,
    LINKEDIN,
    TELEGRAM_ANNOUNCEMENTS,
    TELEGRAM_CAMINO,
    X,
    YOUTUBE,
} from './route-paths'
import {
    DiscordIcon,
    GithubIcon,
    LinkedInIcon,
    TelegramAnouncementIcon,
    TelegramCaminoIcon,
    XIcon,
    YoutubeIcon,
} from '../assets'

import React from 'react'

export const SocialMediaLinks = [
    {
        name: 'X',
        url: X,
        icon: (
            <XIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
    {
        name: 'LinkedIn',
        url: LINKEDIN,
        icon: (
            <LinkedInIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
    {
        name: 'Discord',
        url: DISCORD,
        icon: (
            <DiscordIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
    {
        name: 'Youtube',
        url: YOUTUBE,
        icon: (
            <YoutubeIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
    {
        name: 'Github',
        url: GITHUB,
        icon: (
            <GithubIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
    {
        name: 'Telegram Camino Network',
        url: TELEGRAM_CAMINO,
        icon: (
            <TelegramCaminoIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
    {
        name: 'Telegram Announcements',
        url: TELEGRAM_ANNOUNCEMENTS,
        icon: (
            <TelegramAnouncementIcon
                sx={{
                    color: theme => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            />
        ),
    },
]

export const FooterButtons = [
    {
        name: 'Camino Website',
        url: 'https://camino.network/',
    },
    {
        name: 'Documentation',
        url: 'https://docs.camino.network/',
    },
    {
        name: 'Whitepaper',
        url: 'https://camino.network/static/docs/Camino_Network_Whitepaper.pdf#view=fit',
    },
]

export const FooterLinks = [
    {
        name: 'Camino Network',
        links: [
            {
                text: 'Ecosystem',
                url: 'https://camino.network/ecosystem/',
            },
            {
                text: 'Travel',
                url: 'https://camino.network/travel/',
            },
            {
                text: 'Validators',
                url: 'https://camino.network/validators/',
            },
            {
                text: 'Developers',
                url: 'https://camino.network/developer/',
            },
            {
                text: 'Community',
                url: 'https://camino.network/community/',
            },
            {
                text: 'Blog',
                url: 'https://camino.network/blog/',
            },
        ],
    },
    {
        name: 'Organizational',
        links: [
            {
                text: 'Foundation',
                url: 'https://foundation.camino.network/',
            },
            {
                text: 'Imprint',
                url: 'https://camino.network/imprint/',
            },
            {
                text: 'Privacy Policy',
                url: 'https://camino.network/privacy-policy/',
            },
            {
                text: 'Terms of Use',
                url: 'https://camino.network/terms/',
            },
            {
                text: 'Code of Conduct',
                url: 'https://camino.network/code-of-conduct/',
            },
            {
                text: 'Branding',
                url: 'https://camino.network/branding/',
            },
        ],
    },
    {
        name: 'Public Sale',
        links: [
            {
                text: 'Get CAM',
                url: 'https://camino.network/public-sale/',
            },
            {
                text: 'Disclaimer',
                url: 'https://camino.network/public-sale-disclaimer/',
            },
            {
                text: 'Terms & Conditions',
                url: 'https://camino.network/static/docs/Terms_and_Conditions_of_Use_Public_Sale_2024.pdf',
            },
        ],
    },
]
