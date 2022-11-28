import * as React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { Field } from 'app/components/DetailsField';
import { ValidatorType } from 'types/store';
import moment from 'utils/helpers/moment';

export const TableViewRow = ({ validator }: { validator: ValidatorType }) => {
  return (
    <TableRow>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '100px', lg: '80px' } }}
      >
        <Chip
          label={validator.status}
          sx={{
            borderRadius: '7px',
            color: 'grey.900',
            backgroundColor:
              validator.status === 'Connected' ? 'success.main' : 'error.main',
          }}
        />
      </TableCell>
      <TableCell
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
        align="center"
      >
        <Field type="string" value={validator.nodeID} />
      </TableCell>
      <TableCell align="center">
        {moment(validator.startTime).format('MMM D, YYYY')}
      </TableCell>
      <TableCell align="center">
        {moment(validator.endTime).format('MMM D, YYYY')}
      </TableCell>
      <TableCell align="center">
        {moment(validator.startTime).fromNow()}
      </TableCell>
      <TableCell align="center">
        <Field type="string" value={validator.uptime} />
      </TableCell>
      <TableCell
        sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }}
        align="center"
      >
        <Field type="string" value={validator.txID} />
      </TableCell>
    </TableRow>
  );
};
