import React from 'react';
import { Typography, Box, Grid, Tooltip, Button, Chip } from '@mui/material';
import { mdiOpenInNew } from '@mdi/js';
import { Link } from 'react-router-dom';
import { CamAmount } from 'app/components/CamAmount';
import CopyToClipboardButton from 'app/components/CopyToClipboardButton';
import useWidth from 'app/hooks/useWidth';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Icon from '@mdi/react';
import moment from 'utils/helpers/moment';

export default function DetailsField({
  field,
  value,
  type,
  icon,
  tooltip,
  detailsLink,
  allowCopy,
  style,
}: {
  field: string;
  value: string | number | object | Element | undefined;
  type: string;
  icon?: React.ReactElement;
  tooltip?: string;
  detailsLink?: string;
  allowCopy?: boolean;
  style?: React.CSSProperties;
}) {
  const getTooltip = (field: string): string | undefined => {
    if (Object.keys(tooltips).includes(field?.toLowerCase())) {
      return tooltips[field];
    }
    return undefined;
  };
  const { isMobile } = useWidth();
  return (
    <Grid container alignItems="center" spacing={1} sx={{ ...style }}>
      <Grid
        container
        item
        xs={6}
        md={4}
        lg={4}
        xl={3}
        justifyItems="center"
        alignItems="center"
        order={1}
        sx={{ minWidth: '110px' }}
      >
        {!isMobile && (
          <>
            {tooltip?.toLowerCase() || getTooltip(field?.toLowerCase()) ? (
              <Grid item xs={2}>
                <Tooltip title={getTooltip(field?.toLowerCase()) as string}>
                  {icon || (
                    <HelpOutlineOutlinedIcon style={{ width: '20px' }} />
                  )}
                </Tooltip>
              </Grid>
            ) : (
              <Grid item xs={2}>
                {icon}
              </Grid>
            )}
          </>
        )}
        <Typography
          variant="body2"
          component="span"
          fontWeight="fontWeightBold"
          noWrap={true}
          sx={{ textTransform: 'capitalize', pl: '5px' }}
        >
          {field}
        </Typography>
      </Grid>
      <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
        <Field type={type} value={value} />
      </Grid>
      <>
        {(detailsLink || allowCopy) &&
          value !== undefined &&
          value !== '' &&
          parseInt(value as string) !== 0 && (
            <Grid
              container
              item
              xs={6}
              md={3}
              lg={2}
              order={{ xs: 2, md: 3 }}
              alignItems="center"
              sx={{ justifyContent: 'flex-end', gap: '10px' }}
            >
              {detailsLink && (
                <Link style={{ textDecoration: 'none' }} to={detailsLink}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<Icon path={mdiOpenInNew} size={0.7} />}
                    sx={{ p: '.3rem .7rem .3rem .7rem', borderRadius: '7px' }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: 'primary.contrastText',
                        textTransform: 'capitalize',
                      }}
                    >
                      Open
                    </Typography>
                  </Button>
                </Link>
              )}
              {allowCopy && value && (
                <Box
                  sx={{
                    marginLeft: !detailsLink ? 'auto' : '',
                    width: 'min-content',
                  }}
                >
                  <CopyToClipboardButton value={value.toString()} />
                </Box>
              )}
            </Grid>
          )}
      </>
    </Grid>
  );
}

export const Field = ({
  type,
  value,
  fontWeight = 'fontWeightRegular',
}: {
  type: string;
  value: string | number | object | undefined;
  fontWeight?: string;
}) => {
  const { isMobile } = useWidth();
  if (type === 'string' || type === 'number' || type === 'monospace') {
    return (
      <Typography
        variant="body2"
        component="span"
        noWrap={true}
        fontWeight={fontWeight}
        sx={{ width: '100%', display: 'block' }}
      >
        {value as string}
      </Typography>
    );
  } else if (type === 'ctxtype') {
    return (
      <Chip
        label={value === 0 ? 'Legacy' : 'EIP1559'}
        size="small"
        style={{ minWidth: '61px', height: 'min-content' }}
      />
    );
  } else if (type === 'timestamp') {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Typography variant="body2" component="span">
          {moment(value as number).fromNow()}
        </Typography>
        <Typography variant="body2" component="span" noWrap={true}>
          {moment(value as number).format('MMM D, YYYY, h:mm:ss A ([GMT] ZZ)')}
        </Typography>
      </Box>
    );
  } else if (type === 'hexdata') {
    return (
      <Typography
        variant="body2"
        component="span"
        noWrap={true}
        sx={{ width: '100%', display: 'block' }}
      >
        {value as string}
      </Typography>
    );
  } else if (type === 'gwei') {
    return <CamAmount amount={Number(value)} />;
  } else if (type === 'wei') {
    return <CamAmount amount={Number(value)} />;
  } else if (type === 'ncam') {
    return <CamAmount currency="ncam" amount={Number(value)} />;
  } else return <></>;
};

const tooltips: { [key: string]: string } = {
  // Contracts
  type: 'Defines a transaction type that is an envelope for current and future transaction types',
  block: 'The number of the block in which the transaction was recorded',
  date: 'The date and time at which a transaction is validated',
  'gas price':
    'Cost per unit of gas specified for the transaction, in Cam and nCam (nano cam) and aCam (atto cam). The higher the gas price the higher chance of getting included in a block',
  'max fee per gas':
    'The maximum fee per gas that the transaction is willing to pay in total',
  'max priority fee per gas':
    'The maximum fee per gas to give miners to incentivize them to include the transaction (Priority fee)',
  'gas limit': 'The maximum gas allowed in this transaction',
  value: 'The value being transacted',
  from: 'The sending party of the transaction',
  to: 'The receiving party of the transaction',
  'gas used': 'The  gas used in this transaction',
  'contract address': 'The address of the contract that was created',
  'transaction cost':
    "The cost of the transaction, calculated using ('Effective Gas Price' * 'Gas Limit')",
  'effective gas price': 'The gas price that the transaction is willing to pay',
  //C-BLOCKS
  number: 'The block number',
  'parent hash': 'The Hash of the parent block',
  'base gas fee':
    'The minimum gas fee required for a transaction to be included in a block',
  fees: 'The total transaction fees for this block. This is calculated by adding up all the transaction costs.',
  timestamp: 'The date and time at which a transaction is validated',
  'transaction count': 'The amount of transactions in this block',
  'extra data': 'Additional data in this block',
  //C-BLOCKS
  status: 'The transaction status',
  fee: 'The fee of the transaction',
  memo: 'The memo that was added to the transaction',
  signature: 'The signature of the input',
  'mined by': 'The miner who successfully added the block onto the blockchain',
  difficulty:
    'The length of time it takes to mine a new block. The difficulty algorithm may change over time.',
  'sha3 uncles': "Ethereum Javascript RLP's approach encrypts an empty string.",
  'state root': 'The state root of the block',
  nonce:
    'A block nonce is a value used  to indicate proof of work for a block during mining.',
  'transaction value': 'The value being transacted in camino.',
};
