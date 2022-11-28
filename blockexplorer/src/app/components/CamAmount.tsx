import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { ReactComponent as GasStationOutline } from './assets/gas-station-outline.svg';
import { ReactComponent as ACamIcon } from './assets/a-cam.svg';
import { ReactComponent as NCamIcon } from './assets/n-cam.svg';
import { ReactComponent as CamIcon } from './assets/cam.svg';
import {
  getDisplayAmount,
  getACamAmount,
  abbreviateNumber,
} from '../../utils/currency-utils';

export function AmountIcon({ currency }) {
  return (
    <div
      style={{
        width: '26px',
        height: '26px',
        marginLeft: '6px',
        marginRight: '6px',
      }}
    >
      {currency === 'nCam' ? (
        <NCamIcon />
      ) : currency === 'aCAM' ? (
        <ACamIcon />
      ) : (
        <CamIcon />
      )}
    </div>
  );
}

export function CamAmount({
  amount,
  currency = 'aCam',
  style,
  abbreviate = false,
}: {
  amount: number;
  currency?: string;
  style?: React.CSSProperties;
  abbreviate?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: 'min-content',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      {abbreviate ? (
        <Typography variant="subtitle2">
          {abbreviateNumber(
            getDisplayAmount(getACamAmount(amount, currency)).value,
          )}
        </Typography>
      ) : (
        <Typography variant="subtitle1">
          {getDisplayAmount(
            getACamAmount(amount, currency),
          ).value.toLocaleString('en-US')}
        </Typography>
      )}
      <AmountIcon
        currency={getDisplayAmount(getACamAmount(amount, currency)).currency}
      />
      <Typography
        variant="caption"
        sx={{ fontSize: '11px', minWidth: '32px', textAlign: 'left' }}
      >
        {getDisplayAmount(getACamAmount(amount, currency)).currency}
      </Typography>
    </Box>
  );
}

export function GasAmount({ amount }: { amount: number }) {
  return (
    <>
      <Typography variant="body1">
        {getDisplayAmount(amount).value.toLocaleString('en-US')}
      </Typography>
      <GasStationOutline
        style={{
          width: '26px',
          height: '26px',
          marginLeft: '5px',
        }}
      />
    </>
  );
}
