import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Marker } from 'react-simple-maps';
import './styles/CircleMarker.css';
import Typography from '@mui/material/Typography';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

const CircleMarker = ({
  country,
  lng,
  lat,
  rValue,
  city,
  sValue,
  nodes
}: any) => {

  let cityNodes = nodes;
  const [changeColor, setChangeColor] = useState(false);
  const anchorEl = useRef(null); 
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
      <Marker ref={anchorEl} coordinates={[lng, lat]} aria-describedby={id}>
        <circle
          className="animated flash"
          fill={changeColor == true ? '#000000' : '#4782da'}
          stroke="#fff"
          fillOpacity="1"
          strokeWidth={sValue / 2}
          r={rValue / 2}
          strokeOpacity="0.4"
          cursor="pointer"
          onMouseOver={(e: any) => {
            setOpen(true);
            setChangeColor(true);
          }}
          onMouseOut={(e) => {
            setOpen(false);
            setChangeColor(false);
          }}
        />
      </Marker>

      <Popper open={open} anchorEl={anchorEl.current} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
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
                    <b>Nodes:</b>
                    <br />
                    {cityNodes.map((value, index) => <>
                      {index < 3 ? <>{value}
                        <br /></> : null}
                    </>)}
                    {cityNodes.length > 3 ? <>{cityNodes.length - 3} more validators</> : null}
                  </li>
                </div>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
};

export default CircleMarker;
