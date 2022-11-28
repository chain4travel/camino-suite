import React, { useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { Status, Timeframe, timeOptions } from 'types';
import { changetimeFrame, getCchainOverreview } from 'store/cchainSlice';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  loadNumberOfTransactions,
  loadTotalGasFess,
} from 'store/cchainSlice/utils';
import useWidth from 'app/hooks/useWidth';
import { useLocation } from 'react-router-dom';
import {
  changetimeFramePchain,
  changetimeFrameXchain,
  getPchainOverreview,
  getXchainOverreview,
} from 'store/xchainSlice';
import {
  loadNumberOfPXTransactions,
  loadTotalPXGasFess,
} from 'store/xchainSlice/utils';
import { getChainID } from 'api/utils';
import { ChainType } from 'utils/types/chain-type';

export default function RowRadioButtonsGroup({
  chainType,
  timeFrame,
  style,
}: {
  chainType?: string;
  timeFrame: string;
  style?: React.CSSProperties;
}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(timeFrame);

  useEffect(() => {
    if (location.pathname.split('/')[1] === ChainType.C_CHAIN)
      dispatch(changetimeFrame(value));
    else if (location.pathname.split('/')[1] === ChainType.X_CHAIN)
      dispatch(changetimeFrameXchain(value));
    else dispatch(changetimeFramePchain(value));
  }, [value]); // eslint-disable-line

  const {
    gasFeesLoading: cGasFeesLoading,
    transactionsLoading: cTransactionsLoading,
  } = useAppSelector(getCchainOverreview);
  const {
    gasFeesLoading: pGasFeesLoading,
    transactionsLoading: pTransactionsLoading,
  } = useAppSelector(getPchainOverreview);
  const {
    gasFeesLoading: xGasFeesLoading,
    transactionsLoading: xTransactionsLoading,
  } = useAppSelector(getXchainOverreview);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (location.pathname.split('/')[1] === ChainType.C_CHAIN &&
        event.target.value !== Timeframe.MONTHS_1 &&
        cGasFeesLoading !== Status.LOADING &&
        cTransactionsLoading !== Status.LOADING) ||
      (location.pathname.split('/')[1] === ChainType.X_CHAIN &&
        xGasFeesLoading !== Status.LOADING &&
        xTransactionsLoading !== Status.LOADING) ||
      (location.pathname.split('/')[1] === ChainType.P_CHAIN &&
        pGasFeesLoading !== Status.LOADING &&
        pTransactionsLoading !== Status.LOADING)
    ) {
      setValue((event.target as HTMLInputElement).value);
    }
  };

  useEffect(() => {
    if (location.pathname.split('/')[1] === ChainType.C_CHAIN) {
      dispatch(loadNumberOfTransactions(timeFrame));
      dispatch(loadTotalGasFess(timeFrame));
    } else {
      dispatch(
        loadNumberOfPXTransactions({
          timeframe: timeFrame,
          chainId: getChainID(location.pathname.split('/')[1][0]),
          chainAlias: location.pathname.split('/')[1][0],
        }),
      );
      dispatch(
        loadTotalPXGasFess({
          timeframe: timeFrame,
          chainId: getChainID(location.pathname.split('/')[1][0]),
          chainAlias: location.pathname.split('/')[1][0],
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFrame]);

  const { isMobile } = useWidth();

  return (
    <FormControl sx={{ ...style }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {timeOptions.map(({ value, label, miniLabel }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                sx={{
                  '&.Mui-checked': {
                    color: 'secondary.main',
                  },
                }}
              />
            }
            label={isMobile ? miniLabel : label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
