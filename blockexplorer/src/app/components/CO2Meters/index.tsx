import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'store/configureStore';

import BarMeter from '../../components/CO2Meters/BarMeter';


const CO2Meters = ({
    utilSlice, typeMeter, darkMode, sliceGeter
}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(utilSlice());
      }, []);

      const data = useAppSelector(sliceGeter)
      console.log(data)

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