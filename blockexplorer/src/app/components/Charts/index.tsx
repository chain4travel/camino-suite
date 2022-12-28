import React, { useEffect, Fragment } from 'react';
// import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typeMeter as typesMeter } from '../../pages/Statistics/typeMeter';
import { Status } from "types";
import CircularProgress from '@mui/material/CircularProgress';
import LinearMeter from './LinearMeter';

const Charts = ({
  darkMode, titleText
}) => {

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(utilSlice());
//   }, []);

//   const dataStatistics: any = useAppSelector(sliceGetter);

//   const loader = useAppSelector(sliceGetterLoader);
  const loader = Status.IDLE;

  return (
    <Fragment>

      {loader == Status.LOADING ? <>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      </> : <> <LinearMeter darkMode={darkMode} titleText={titleText} />
      </>}
    </Fragment>
  );
}

export default Charts;