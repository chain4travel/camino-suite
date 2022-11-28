import { DateTime, Duration } from 'luxon';
import { Timeframe } from 'types';

export interface Fund {
  address: string;
  value?: number;
  signature?: string;
}

export function getStartDate(endDate: DateTime, timeframe: string): DateTime {
  switch (timeframe) {
    case Timeframe.DAYS_7:
      return endDate.minus({ weeks: 1 });
    case Timeframe.HOURS_24:
      return endDate.minus({ days: 1 });
    case Timeframe.MONTHS_1:
      return endDate.minus({ months: 1 });
  }
  return endDate.minus({ weeks: 1 });
}
// Todo: Update the getRelativeTime function
export function getRelativeTime(timestamp: Date | number | string): string {
  const time = getTime(timestamp);
  if (!Number.isInteger(time)) {
    return 'Unknown';
  }
  const duration = Duration.fromMillis(new Date().getTime() - time, {
    locale: 'en-US',
  }).shiftTo('seconds');
  if (duration.seconds < 1) return '< 1 sec';
  else if (duration.seconds >= 1 && duration.seconds < 2) {
    return '1 sec';
  } else if (duration.seconds < 60) {
    return duration.seconds.toFixed(0) + ' secs';
  } else if (duration.seconds >= 60 && duration.seconds < 120) {
    return '1 min';
  } else if (duration.seconds < 3600) {
    return duration.shiftTo('minutes').minutes.toFixed(0) + ' mins';
  } else if (duration.seconds >= 3600 && duration.seconds < 7200) {
    return '1 hr';
  } else if (duration.seconds < 86400) {
    return duration.shiftTo('hours').hours.toFixed(0) + ' hrs';
  } else if (duration.seconds >= 86400 && duration.seconds < 172800) {
    return '1 day';
  } else {
    return duration.shiftTo('days').days.toFixed(0) + ' days';
  }
}

function getTime(timestamp: Date | number | string): number {
  if (timestamp instanceof Date) {
    return timestamp.getTime();
  }
  if (typeof timestamp === 'string') {
    return new Date(timestamp).getTime();
  }
  return timestamp;
}

export function displayLongString(val: string, maxLength = 12): string {
  if (!val) {
    return '';
  }
  if (val.length > maxLength) {
    const partSize = (maxLength - 5) / 2;
    const remainder = (maxLength - 5) % 2;
    const firstPartSize = partSize + remainder;
    return (
      val.substring(0, firstPartSize) +
      '&nbsp;&hellip; ' +
      val.substring(val.length + 1 - partSize, val.length)
    );
  } else {
    return val;
  }
}

export function displayFirstPartLongString(
  val: string,
  maxLength = 12,
): string {
  if (!val) {
    return '';
  }
  if (val.length > maxLength) {
    const partSize = (maxLength - 1) / 2;
    const remainder = (maxLength - 1) % 2;
    const firstPartSize = partSize + remainder;
    return val.substring(0, firstPartSize);
  } else {
    return val;
  }
}

export function displaySecondPartLongString(
  val: string,
  maxLength = 12,
): string {
  if (!val) {
    return '';
  }
  if (val.length > maxLength) {
    const partSize = (maxLength - 1) / 2;
    return val.substring(val.length + 1 - partSize, val.length);
  } else {
    return val;
  }
}

export function getStringOrFirstElement(
  param: string | number | string[],
): string {
  if (param instanceof Array) {
    return param[0];
  }
  return param.toString();
}

export function camelCaseToRegular(val: string) {
  return (
    val
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
}

export function getDisplayAddress(funds: Fund[]): string {
  if (!funds || funds.length === 0) {
    return '';
  }
  if (funds.length > 1) {
    return funds[0].address + ` (+ ${funds.length - 1} more)`;
  }
  return funds[0].address;
}

function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date): string {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}
