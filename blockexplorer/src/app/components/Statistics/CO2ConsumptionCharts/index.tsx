import React, { useEffect, Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typesMeter } from '../../../pages/Statistics/ChartSelector';
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
import DateRange from '../DateRange/DateRange';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const CO2ConsumptionCharts = ({
  utilSlice, typeMeter, darkMode, sliceGetter, sliceGetterLoader
}) => {

  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
                backgroundColor: 'transparent',
                borderRadius: '7px',
                padding: '1.5rem',
                minWidth: isDesktop ? '1500px' : '0px',
              }}
            >

              <Card style={{ backgroundColor: darkMode ? "#060F24" : "white" }}>
                <CardHeader title={meterCO2.Name} action={<IconButton
                  color="info"
                  component="label"
                  onClick={() => setOpenModal(false)}
                  style={{ cursor: 'default' }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>} />
                <CardContent>
                  <Fragment>
                    <DateRange
                      initialStartDate={startDate}
                      InitianEndDate={endDate}
                      setEndDate={setEndDate}
                      setStartDate={setStartDate}
                      darkMode={darkMode}
                    />

                    {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
                    {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
                  </Fragment>
                </CardContent></Card>




            </Box>
          </Modal>

        </> : <>

          <Card style={{ backgroundColor: darkMode ? "#060F24" : "white" }}>
            <CardHeader title={meterCO2.Name} action={
              <IconButton
                color="info"
                component="label"
                onClick={() => setOpenModal(true)}
                style={{ cursor: 'default' }}
              >
                <FontAwesomeIcon icon={faSquareArrowUpRight} />
              </IconButton>
            } />
            <CardContent>
              {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
              {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.Value} titleText={meterCO2.Name} />}
            </CardContent>
          </Card>
        </>}
      </>}
    </Fragment>
  );
}

export default CO2ConsumptionCharts;