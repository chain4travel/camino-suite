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

export const socialMediaLinks: { [key: string]: string } = {
    DISCORD,
    GITHUB,
    LINKEDIN,
    TELEGRAM_ANNOUNCEMENTS,
    TELEGRAM_CAMINO,
    X,
    YOUTUBE,
}

export const iconStyles = {
    color: (theme: any) => (theme.palette.mode === 'dark' ? 'white' : 'dark'),
    width: '1.5rem',
    height: '1.5rem',
}

export const socialMediaIcons: { [key: string]: JSX.Element } = {
    DiscordIcon: <DiscordIcon sx={iconStyles} />,
    GithubIcon: <GithubIcon sx={iconStyles} />,
    LinkedInIcon: <LinkedInIcon sx={iconStyles} />,
    TelegramAnouncementIcon: <TelegramAnouncementIcon sx={iconStyles} />,
    TelegramCaminoIcon: <TelegramCaminoIcon sx={iconStyles} />,
    XIcon: <XIcon sx={iconStyles} />,
    YoutubeIcon: <YoutubeIcon sx={iconStyles} />,
}

export const socialMediaIconBoxStyles = (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '.75rem',
    color: theme.palette.text.primary,
    padding: '.5rem',
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    },
})

export const footerButtonBoxStyles = (theme: any) => ({
    p: '.5rem 1rem',
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
    borderRadius: '.75rem',
    '&:hover': {
        borderWidth: '1px',
        color: theme.palette.grey[950],
        backgroundColor: theme.palette.mode === 'dark' ? '#FFF' : theme.palette.grey[300],
    },
})