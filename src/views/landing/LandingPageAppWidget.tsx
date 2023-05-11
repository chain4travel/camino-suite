import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function LandingPageAppWidget({ name, description, onClick }) {
    const theme = useTheme()

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: `${theme.spacing(2)}`,
                borderRadius: '18px',
                height: '100%',
            }}
        >
            <Box mb={2}>
                <Typography variant={'h4'}>{name}</Typography>
                <Typography>{description}</Typography>
            </Box>

            <Button
                sx={{ marginTop: 'auto', textTransform: 'none' }}
                variant="contained"
                onClick={onClick}
            >
                <Typography variant="body1" color="white">
                    {`Go to ${name}`}
                </Typography>
            </Button>
        </Paper>
    )
}
