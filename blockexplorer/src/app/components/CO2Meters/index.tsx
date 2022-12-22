import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BasicMeter from './BasicMeter';

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
                <Grid item md={6} xs={12}>
                    {networkDetails[0] != undefined ?
                        <BasicMeter
                            value={networkDetails[0].value}
                            title={"Network Emission (24h)"}
                            plotBands={[{
                                from: 0,
                                to: 5000,
                                color: '#55BF3B',
                                thickness: 20
                            }, {
                                from: 5000,
                                to: 10000,
                                color: '#DDDF0D',
                                thickness: 20
                            }, {
                                from: 10000,
                                to: 20000,
                                color: '#DF5353',
                                thickness: 20
                            }]}
                            maxValue={20000}
                        /> : null}
                </Grid>
                <Grid item md={6} xs={12}>
                    {transactionDetails[0] != undefined ?
                        <BasicMeter
                            value={transactionDetails[0].value}
                            title={"Network Emission by transactions (24h)"}
                            plotBands={[{
                                from: 0,
                                to: 200,
                                color: '#55BF3B',
                                thickness: 20
                            }, {
                                from: 200,
                                to: 500,
                                color: '#DDDF0D',
                                thickness: 20
                            }, {
                                from: 500,
                                to: 1000,
                                color: '#DF5353',
                                thickness: 20
                            }]}
                            maxValue={1000}
                        /> : null}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CO2Meters;