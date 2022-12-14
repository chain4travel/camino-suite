import React, { Fragment, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Marker } from 'react-simple-maps';
import './CircleMarker.css';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { selectAllValidators } from 'store/validatorsSlice';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Button } from '@mui/material';

const CircleMarker = ({
  country,
  lng,
  lat,
  rValue,
  city,
  sValue,
  nodes
}: any) => {

  {
    /*
    let cityNodes = [
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC",
    "NodeID-GyakeRf3JZURRPYakhrrxRG8fft3st2qC"];
    */
  }

  let cityNodes = nodes;

  const [changeColor, setChangeColor] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMoreValidators, setShowMoreValidators] = useState(false);

  const validators = useAppSelector(selectAllValidators);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
      <Tooltip title={country + ' - ' + city} style={{ pointerEvents: 'auto' }}>
        <Marker coordinates={[lng, lat]} aria-describedby={id}>
          <circle
            className="animated flash"
            fill={changeColor == true ? '#000000' : '#4782da'}
            stroke="#fff"
            fillOpacity="1"
            strokeWidth={sValue / 2}
            r={rValue / 2}
            strokeOpacity="0.4"
            cursor="pointer"
            onMouseOver={(e) => {
              setChangeColor(true);
            }}
            onMouseOut={() => {
              setChangeColor(false);
            }}
            onClick={(e: any) => {
              setAnchorEl(e.currentTarget);
            }}
          />
        </Marker>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        <Typography sx={{ p: 2 }}>
          <div>
            <li>
              <b>Country:</b>
              {country}
            </li>
            <li>
              <b>City:</b>
              {city}
            </li>
            <br />
            <li>
              <b>Nodes:</b>
              <br />

              {cityNodes.length >= 5 ? <>{showMoreValidators == true ? <>{cityNodes.map((value) => <>
                {value}
                <br />
              </>)}
              
              <a href="javascript:void(0)" onClick={() => {setShowMoreValidators(false)}}>Show Less</a>
              </> : <>
                {cityNodes.map((value, index) => <>
                  {index <= 5 ? <>{value}
                    <br /></> : null}
                </>)}
                <a href="javascript:void(0)" onClick={() => { setShowMoreValidators(true) }}>Show More</a>
              </>}</> : <>
                {cityNodes.map((value) => <>
                  {value}
                  <br />
                </>)}
              </>}
            </li>
          </div>
        </Typography>
      </Popover>
    </Fragment>
  );
};

export default CircleMarker;
