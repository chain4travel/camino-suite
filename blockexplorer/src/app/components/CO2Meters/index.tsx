import React, { useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import testData from './testData.json';
import testData2 from './testData2.json';
import { typeMeter as typesMeter } from '../../pages/Statistics/typeMeter';

import BarMeter from './BarMeter';
import TimeSeriesMeter from './TimeSeriesMeter';

const CO2Meters = ({
  utilSlice, typeMeter, darkMode, sliceGeter
}) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(utilSlice());
  }, []);

  //const data = useAppSelector(sliceGeter);
  const data = testData;
  const data2 = testData2;

  return (
    <Fragment>
      {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={data} />}
      {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={data2} />}
    </Fragment>
  );
}

export default CO2Meters;