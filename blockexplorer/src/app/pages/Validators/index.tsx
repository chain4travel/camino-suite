import React, { FC } from 'react';
import {
  Grid,
  Paper,
  Box,
  TableContainer,
  TableCellProps,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { selectAllValidators } from 'store/validatorsSlice';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import { TableViewRow } from './/TableViewRow';
import { GridViewItem } from './GridViewItem';
import { To } from 'react-router-dom';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import TableView from 'app/components/Table/TableView';
import useWidth from 'app/hooks/useWidth';

const Validators: FC = () => {
  const { isDesktop, isWidescreen } = useWidth();
  const validators = useAppSelector(selectAllValidators);
  const dispatch = useAppDispatch();
  useEffectOnce(() => {
    dispatch(loadValidators());
  });

  return (
    <PageContainer pageTitle="Validators" metaContent="validators">
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '544px',
          width: 1,
          backgroundColor: 'card.background',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <SubPageTitle
          title="Validators"
          backToLink={-1 as To}
          style={{ marginBottom: '20px' }}
        />
        <TableContainer sx={{ minHeight: '400px' }}>
          {isWidescreen || isDesktop ? (
            <TableView columns={columns}>
              {validators?.map(validator => (
                <TableViewRow key={validator.nodeID} validator={validator} />
              ))}
            </TableView>
          ) : (
            <Grid item container alignItems="center">
              {validators.map(validator => (
                <GridViewItem key={validator.nodeID} validator={validator} />
              ))}
            </Grid>
          )}
        </TableContainer>
        <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
          <BackButton backToLink={-1 as To} />
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default Validators;

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  align: TableCellProps['align'];
}

const columns: ColumnType[] = [
  {
    name: 'Status',
    label: 'Status',
    field: 'Status',
    align: 'center',
  },
  {
    name: 'NodeID',
    label: 'NodeID',
    field: 'NodeID',
    align: 'center',
  },
  {
    name: 'StartTime',
    label: 'StartTime',
    field: 'StartTime',
    align: 'center',
  },
  {
    name: 'EndTime',
    label: 'EndTime',
    field: 'EndTime',
    align: 'center',
  },
  {
    name: 'Duration',
    label: 'Duration',
    field: 'Duration',
    align: 'center',
  },
  {
    name: 'UpTime',
    label: 'UpTime',
    field: 'UpTime',
    align: 'center',
  },
  {
    name: 'txID',
    label: 'txID',
    field: 'txID',
    align: 'center',
  },
];
