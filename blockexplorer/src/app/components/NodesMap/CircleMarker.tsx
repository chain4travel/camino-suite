import React, { Fragment, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Marker } from 'react-simple-maps';
import './CircleMarker.css';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { selectAllValidators } from 'store/validatorsSlice';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import moment from 'moment';

const CircleMarker = ({
  country,
  lng,
  lat,
  rValue,
  city,
  nodeIdentity,
  sValue
}: any) => {

  const [changeColor, setChangeColor] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const validators = useAppSelector(selectAllValidators);
  console.log("validatorsNode", validators);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getValidatorData = (nodeIdentity: string, startTime: boolean) => {
    try
    {
      let nodeData = validators.find((vali) => vali.nodeID == nodeIdentity);

      if(nodeData != undefined && nodeData != null)
      {
        if(startTime == false)
        {
          return moment(nodeData.endTime).format("DD/MM/YYYY");
        }
        else
        {
          return moment(nodeData.startTime).format("DD/MM/YYYY");
        }
      }
      else
      {
        return "";
      }
    }
    catch(e)
    {
      return "";
    }
  }

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
              //setAnchorEl(e.currentTarget);
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
            {open ? <>
              <li>
              <b>Start Time:</b>
              {getValidatorData(nodeIdentity, true)}
            </li>
            <li>
              <b>End Time:</b>
              {getValidatorData(nodeIdentity, false)}
            </li>
            </> : null}
          </div>
        </Typography>
      </Popover>
    </Fragment>
  );
};

export default CircleMarker;
