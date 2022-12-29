import React, { Fragment, useState } from 'react';
// import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Status } from 'types';
import CircularProgress from '@mui/material/CircularProgress';
import LinearMeter from './LinearMeter';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareArrowUpRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useWidth from 'app/hooks/useWidth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Charts = ({ darkMode, titleText }) => {
  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2022/12/29'));
  const [endDate, setEndDate] = useState(new Date('2022/12/29'));

  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     dispatch(utilSlice());
  //   }, []);

  //   const dataStatistics: any = useAppSelector(sliceGetter);

  //   const loader = useAppSelector(sliceGetterLoader);

  const loader = Status.IDLE;

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
                <>
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
                </>
                <LinearMeter darkMode={darkMode} titleText={titleText} />
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

          <LinearMeter darkMode={darkMode} titleText={titleText} />
        </>
      )}
    </Fragment>
  );
};

export default Charts;
