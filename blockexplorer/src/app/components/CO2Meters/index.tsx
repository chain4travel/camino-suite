import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicMeter from './BasicMeter';

import BarMeter from '../../components/CO2Meters/BarMeter';


const CO2Meters = ({
    carbonIntensityFactorDetails,
    holdingDetails,
    hybridDetails,
    networkDetails,
    transactionDetails
}) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <BarMeter />
                </Grid>
            </Grid>
        </Box>
    );
}

export default CO2Meters;