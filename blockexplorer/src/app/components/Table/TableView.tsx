import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Field } from '../DetailsField';

export default function TableView({
  children,
  columns,
}: {
  columns: any[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                sx={{ backgroundColor: 'primary.dark', wrap: 'nowrap' }}
                key={column.name}
                align={column.align}
              >
                <Field
                  type="string"
                  value={column.label}
                  fontWeight="fontWeightBold"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </>
  );
}
