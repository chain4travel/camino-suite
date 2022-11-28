import { RootState } from './RootState';
export enum Timeframe {
  HOURS_24 = 'HOURS_24',
  DAYS_7 = 'DAYS_7',
  MONTHS_1 = 'MONTHS_1',
}

// 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export function getLabel(timeframe: Timeframe) {
  switch (timeframe) {
    case Timeframe.HOURS_24:
      return '24 Hours';
    case Timeframe.DAYS_7:
      return '7 Days';
    case Timeframe.MONTHS_1:
      return '1 Month';
    default:
      return 'UNKNOWN';
  }
}

export const timeOptions = [
  {
    value: Timeframe.HOURS_24,
    label: getLabel(Timeframe.HOURS_24),
    miniLabel: '24 H',
  },
  {
    value: Timeframe.DAYS_7,
    label: getLabel(Timeframe.DAYS_7),
    miniLabel: '7 D',
  },
  {
    value: Timeframe.MONTHS_1,
    label: getLabel(Timeframe.MONTHS_1),
    miniLabel: '1 M',
  },
];

export type { RootState };
