import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
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
import 'react-datepicker/dist/react-datepicker.css';
import DateRange from '../DateRange/DateRange';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const BlockchainCharts = ({ darkMode, titleText, utilSlice, sliceGetter, sliceGetterLoader, typeStatistic }) => {
  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => { }, []);

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
                backgroundColor: 'transparent',
                borderRadius: '7px',
                padding: '1.5rem',
                minWidth: isDesktop ? '1500px' : '0px',
              }}
            >
              <Card style={{ backgroundColor: darkMode ? "#060F24" : "white" }}>
                <CardHeader title={titleText} action={<IconButton
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

                    {dataStatistics != undefined && dataStatistics != null ?
                      <>
                        <LinearMeter darkMode={darkMode}
                          titleText={titleText}
                          data={dataStatistics}
                          typeStatistic={typeStatistic} />
                      </>
                      : null}
                  </Fragment>
                </CardContent></Card>
            </Box>
          </Modal>

          <Card style={{ backgroundColor: darkMode ? "#060F24" : "white" }}>
            <CardHeader title={titleText} action={
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
              {dataStatistics != undefined && dataStatistics != null ? <>
                <LinearMeter darkMode={darkMode}
                  titleText={titleText}
                  data={dataStatistics}
                  typeStatistic={typeStatistic} />
              </> : null}
            </CardContent>
          </Card>
        </>
      )}
    </Fragment>
  );
};

export default BlockchainCharts;
