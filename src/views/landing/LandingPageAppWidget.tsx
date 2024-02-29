import { Box, Button, Paper, Typography, useTheme } from '@mui/material'

import React from 'react'

export default function LandingPageAppWidget({ name, description, onClick }) {
    const theme = useTheme()

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: `${theme.spacing(3)}`,
                borderRadius: '18px',
                height: '100%',
            }}
        >
            <Box mb={2}>
                <Typography variant={'h5'}>{name}</Typography>
                <Typography>{description}</Typography>
            </Box>

            <Button
                sx={{
                    marginTop: 'auto',
                    textTransform: 'none',
                    borderWidth: 2,
                    borderRadius: '12px',
                    py: 1,
                    '&:hover': { borderWidth: 2 },
                }}
                variant="outlined"
                onClick={onClick}
                data-cy={`go-to-${name}`}
            >
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                    {`Go to ${name}`}
                </Typography>
            </Button>
        </Paper>
    )
}
