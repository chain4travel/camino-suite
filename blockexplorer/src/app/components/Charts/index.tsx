import React, { useEffect, Fragment, useState } from 'react';
// import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typeMeter as typesMeter } from '../../pages/Statistics/typeMeter';
import { Status } from "types";
import CircularProgress from '@mui/material/CircularProgress';
import LinearMeter from './LinearMeter';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useWidth from 'app/hooks/useWidth';

const Charts = ({
  darkMode, titleText
}) => {

  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);

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
      </> : <>

        <Modal
          open={openModal}
          onClose={(e) => {
            setOpenModal(false);
          }}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          disableScrollLock={true}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "7px",
              padding: "1.5rem",
              minWidth: isDesktop ? '1300px' : '0px'
            }}
          >
            <Fragment>
              <div style={{ float: 'right' }}>
                <IconButton color="info" component="label" onClick={() => setOpenModal(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
              </div>
              <LinearMeter darkMode={darkMode} titleText={titleText} />
            </Fragment>
          </Box>
        </Modal>

        <div style={{ float: 'right' }}>
          <IconButton color="info" component="label" onClick={() => setOpenModal(true)}>
            <FontAwesomeIcon icon={faSquareArrowUpRight} />
          </IconButton>
        </div>

        <LinearMeter darkMode={darkMode} titleText={titleText} />
      </>}
    </Fragment>
  );
}

export default Charts;