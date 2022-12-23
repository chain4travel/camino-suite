import React, { useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typeMeter as typesMeter } from '../../pages/Statistics/typeMeter';
import BarMeter from './BarMeter';
import TimeSeriesMeter from './TimeSeriesMeter';
import { Status } from "types";
import MeterCO2Data from '../../../types/meterCO2data';

const CO2Meters = ({
  utilSlice, typeMeter, darkMode, sliceGetter, sliceGetterLoader
}) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(utilSlice());
  }, []);

  const meterCO2 : MeterCO2Data = useAppSelector(sliceGetter);
  const loader = useAppSelector(sliceGetterLoader);

  return (
    <Fragment>
      {loader == Status.LOADING ? <>
      </> : <>
        {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.data} titleText={meterCO2.name} />}
        {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.data} titleText={meterCO2.name} />}
      </>}
    </Fragment>
  );
}

export default CO2Meters;