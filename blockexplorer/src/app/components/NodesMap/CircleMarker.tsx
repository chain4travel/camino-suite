import React, { Fragment, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Marker } from 'react-simple-maps';
import './CircleMarker.css';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const CircleMarker = ({
  country,
  lng,
  lat,
  rValue,
  city,
  nodeIdentity,
}: any) => {
  const [changeColor, setChangeColor] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

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
            strokeWidth={7 / 2}
            r={rValue / 2}
            strokeOpacity="0.4"
            cursor="pointer"
            onMouseOver={() => {
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
            <li>
              <b>Node Identity:</b>
              {nodeIdentity}
            </li>
          </div>
        </Typography>
      </Popover>
    </Fragment>
  );
};

export default CircleMarker;
