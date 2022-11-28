import { Amount } from './types/currency-type';

const conversionACamPerCam = 1000000000000000000;

const conversionACamPerNCam = 1000000000;

export const ACAM_CAM_CONVERSION_THRESHHOLD = 1000000000000000;

export const ACAM_NCAM_CONVERSION_THRESHHOLD = 1000000;

export function aCamToCam(aCam: number) {
  return aCam / conversionACamPerCam;
}

export function aCamToNCam(aCam: number) {
  return aCam / conversionACamPerNCam;
}

export function nCamToACam(nCam: number) {
  return nCam * conversionACamPerNCam;
}

export function getDisplayValueForGewi(nCamVal: number): string {
  return getDisplayValue(nCamVal * conversionACamPerNCam);
}

export function getDisplayValue(aCam: number): string {
  const amount = getDisplayAmount(aCam);
  return formatAmount(amount.value, amount.currency);
}

export function getACamAmount(value: number, currency: string): number {
  if (currency.toLowerCase() === 'cam') {
    return value * conversionACamPerCam;
  } else if (currency.toLowerCase() === 'ncam') {
    return value * conversionACamPerNCam;
  } else {
    return value;
  }
}

export function getDisplayAmount(aCam: number): Amount {
  if (aCam === 0 || aCam >= ACAM_CAM_CONVERSION_THRESHHOLD) {
    return {
      value: aCamToCam(aCam),
      currency: 'CAM',
      currencyIcon: 'img:/images/camino-coin-logo.png',
    };
  }
  if (aCam >= ACAM_NCAM_CONVERSION_THRESHHOLD) {
    return {
      value: aCamToNCam(aCam),
      currency: 'nCAM',
      currencyIcon: 'img:/images/camino-ncam-coin-logo.png',
    };
  }
  return {
    value: aCam,
    currency: 'aCAM',
    currencyIcon: 'img:/images/camino-acam-coin-logo.png',
  };
}

export function formatAmount(value: number, currency: string): string {
  return `${value.toLocaleString()} ${currency}`;
}

// ToDo: Update this function
export function abbreviateNumber(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
}

export const currencyFields = [
  'baseFeePerGas',
  'gasLimit',
  'gasUsed',
  'cumulativeGasUsed',
  'gasUsed',
  'effectiveGasPrice',
  'value',
  'gasPrice',
  'gas',
];
