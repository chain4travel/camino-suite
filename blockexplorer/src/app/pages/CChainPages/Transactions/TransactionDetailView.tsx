import React, { FC } from 'react';
import { Divider, Grid } from '@mui/material';
import { CBLOCKS } from 'utils/route-paths';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';
import {
  TransactionInformations,
  TransactionCurrency,
} from 'types/transaction';

interface TxDetailsViewProps {
  detailTr?: TransactionInformations;
  detailCr?: TransactionCurrency;
}

const TransactionDetailView: FC<TxDetailsViewProps> = ({
  detailTr,
  detailCr,
}) => {
  return (
    <>
      {detailTr && (
        <OutlinedContainer>
          <Grid item container alignItems="center">
            <Grid item xs={12}>
              <DetailsField
                field="Type"
                value={detailTr['type']}
                type="ctxtype"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Block"
                value={detailTr['block']}
                type="string"
                detailsLink={`${CBLOCKS}/${detailTr.block}`}
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Timestamp"
                value={detailTr['createdAt'].toString()}
                type="timestamp"
                tooltip="date"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="From"
                value={detailTr['fromAddr']}
                type="hexdata"
                allowCopy={true}
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="To"
                value={detailTr['toAddr']}
                type="hexdata"
                allowCopy={true}
                style={{ padding: '1rem' }}
              />
            </Grid>
          </Grid>
        </OutlinedContainer>
      )}
      {detailCr && (
        <OutlinedContainer>
          <Grid item container alignItems="center">
            {detailCr['gasPrice'] ? (
              <Grid item xs={12}>
                <DetailsField
                  field="Gas Price"
                  value={detailCr['gasPrice']}
                  type="wei"
                  style={{ padding: '1rem' }}
                />
                <Divider variant="fullWidth" />
              </Grid>
            ) : null}
            {detailCr['maxFeePerGas'] && detailCr['maxPriorityFeePerGas'] ? (
              <>
                <Grid item xs={12}>
                  <DetailsField
                    field="Max fee per gas"
                    value={detailCr['maxFeePerGas']}
                    type="wei"
                    style={{ padding: '1rem' }}
                  />
                  <Divider variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                  <DetailsField
                    field="Max Priority fee per gas"
                    value={detailCr['maxPriorityFeePerGas']}
                    type="wei"
                    style={{ padding: '1rem' }}
                  />
                  <Divider variant="fullWidth" />
                </Grid>
              </>
            ) : null}
            <Grid item xs={12}>
              <DetailsField
                field="Gas Used"
                value={detailCr['gasUsed']}
                type="number"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Effective Gas Price"
                value={detailCr['effectiveGasPrice']}
                type="wei"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Transaction Value"
                value={detailCr['value'] ? detailCr['value'] : '0'}
                type="wei"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Transaction Cost"
                value={detailCr['transactionCost']}
                type="wei"
                style={{ padding: '1rem' }}
              />
            </Grid>
          </Grid>
        </OutlinedContainer>
      )}
    </>
  );
};

export default React.memo(TransactionDetailView);
