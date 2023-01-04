import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Status } from 'types';
import CircularProgress from '@mui/material/CircularProgress';
import LinearMeter from './DailyTransactionsChart';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareArrowUpRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useWidth from 'app/hooks/useWidth';
import 'react-datepicker/dist/react-datepicker.css';
import DateRange from './DateRange';

const TransactionsCharts = ({
  darkMode,
  titleText,
  utilSlice,
  sliceGetter,
  sliceGetterLoader,
}) => {
  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {}, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(utilSlice());
  }, []);

  const dataStatistics: any = useAppSelector(sliceGetter);

  const loader = useAppSelector(sliceGetterLoader);

  return (
    <Fragment>
      {loader === Status.LOADING ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        </>
      ) : (
        <>
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
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                </div>
                <DateRange
                  initialStartDate={startDate}
                  InitianEndDate={endDate}
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                />
                {/* <>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </> */}
                {dataStatistics !== undefined && dataStatistics != null ? (
                  <LinearMeter
                    darkMode={darkMode}
                    titleText={titleText}
                    dataChart={dataStatistics}
                  />
                ) : null}
              </Fragment>
            </Box>
          </Modal>

          <div style={{ float: 'right' }}>
            <IconButton
              color="info"
              component="label"
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </IconButton>
          </div>

          {dataStatistics !== undefined && dataStatistics != null ? (
            <LinearMeter
              darkMode={darkMode}
              titleText={titleText}
              dataChart={dataStatistics}
            />
          ) : null}
        </>
      )}
    </Fragment>
  );
};

export default TransactionsCharts;
