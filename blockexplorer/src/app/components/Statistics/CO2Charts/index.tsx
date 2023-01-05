import React, { useEffect, Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typeMeter as typesMeter } from '../../../pages/Statistics/typeMeter';
import BarMeter from './BarMeter';
import TimeSeriesMeter from './TimeSeriesMeter';
import { Status } from "types";
import MeterCO2Data from '../../../types/meterCO2data';
import CountriesBarMeter from './CountriesBarMeter';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useWidth from 'app/hooks/useWidth';

const CO2Charts = ({
  utilSlice, typeMeter, darkMode, sliceGetter, sliceGetterLoader
}) => {

  const [initialStartDate,setStartDate] = useState(new Date());
  const [InitianEndDate,setEndDate] = useState(new Date());

  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);

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
        {openModal == true ? <>
          <Modal
            open={openModal}
            onClose={e => {
              setOpenModal(false);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disableScrollLock={true}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '7px',
                padding: '1.5rem',
                minWidth: isDesktop ? '1300px' : '0px',
              }}
            >
              <Fragment>
                <div style={{ float: 'right' }}>
                  <IconButton
                    color="info"
                    component="label"
                    onClick={() => setOpenModal(false)}
                    style={{cursor: 'default'}}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                </div>
                {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
                {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
              </Fragment>
            </Box>
          </Modal>

        </> : <>

          <div style={{ float: 'right' }}>
            <IconButton
              color="info"
              component="label"
              onClick={() => setOpenModal(true)}
              style={{cursor: 'default'}}
            >
              <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </IconButton>
          </div>

          {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
          {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
        </>}
      </>}
    </Fragment>
  );
}

export default CO2Charts;