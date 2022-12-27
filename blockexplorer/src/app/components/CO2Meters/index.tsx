import React, { useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typeMeter as typesMeter } from '../../pages/Statistics/typeMeter';
import BarMeter from './BarMeter';
import TimeSeriesMeter from './TimeSeriesMeter';
import { Status } from "types";
import MeterCO2Data from '../../../types/meterCO2data';
import CountriesBarMeter from './CountriesBarMeter';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CO2Meters = ({
  utilSlice, typeMeter, darkMode, sliceGetter, sliceGetterLoader
}) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(utilSlice());
  }, []);

  const meterCO2: MeterCO2Data = useAppSelector(sliceGetter);

  const loader = useAppSelector(sliceGetterLoader);

  return (
    <Fragment>

      {loader == Status.LOADING ? <>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      </> : <>
        {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
        {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
      </>}
    </Fragment>
  );
}

export default CO2Meters;