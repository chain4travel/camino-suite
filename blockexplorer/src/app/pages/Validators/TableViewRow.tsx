import * as React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { Field } from 'app/components/DetailsField';
import { ValidatorType } from 'types/store';
import moment from 'utils/helpers/moment';
import Tooltip from '@mui/material/Tooltip';

export const TableViewRow = ({ validator }: { validator: ValidatorType }) => {
  return (
    <TableRow>
      <TableCell
        align="left"
        sx={{ maxWidth: { xs: '10px', md: '100px', lg: '80px' } }}
      >
        <Chip
          label={validator.status}
          style={{ width: 100, maxWidth: 100 }}
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
        <Tooltip title={"Days since validator start:"+ moment(validator.startTime).fromNow().replace(" ago","")}>
          <span style={{cursor:'pointer'}}>
            {moment(validator.startTime).format('MMM D, YYYY')}
          </span>
        </Tooltip>
      </TableCell>
      <TableCell align="center">
      <Tooltip title={"Days until validator stops:"+ moment(validator.endTime).fromNow().replace("in ","")}>
          <span style={{cursor:'pointer'}}>
            {moment(validator.endTime).format('MMM D, YYYY')}
          </span>
        </Tooltip>
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
