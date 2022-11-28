import * as React from 'react';
import { Divider, Grid } from '@mui/material';
import OutlinedContainer from 'app/components/OutlinedContainer';
import DetailsField from 'app/components/DetailsField';
import { InputOutputSection } from '../Address/InputOutputSection';
import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

function TransactionDetailView({ detailTr, inputs, outputs }) {
  return (
    <>
      {detailTr && (
        <OutlinedContainer>
          <Grid item container alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <DetailsField
                field="Status"
                value={
                  detailTr['status'] === 'accepted' ? (
                    <Icon
                      path={mdiCheckboxMarkedCircleOutline}
                      size={0.8}
                      color="#35E9AD"
                    />
                  ) : (
                    <Icon
                      path={mdiAlertCircleOutline}
                      size={0.8}
                      color="#C23F38"
                    />
                  )
                }
                type="string"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
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
                field="Timestamp"
                value={detailTr['timestamp'].toString()}
                type="timestamp"
                tooltip="date"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Fee"
                value={detailTr['fee']}
                type="ncam"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DetailsField
                field="Memo"
                value={detailTr['memo']}
                type="string"
                style={{ padding: '1rem' }}
              />
              <Divider variant="fullWidth" />
            </Grid>
            <Grid container item xs={12} spacing={2} sx={{ padding: '1rem' }}>
              <InputOutputSection inputs={inputs} outputs={outputs} />
            </Grid>
          </Grid>
        </OutlinedContainer>
      )}
    </>
  );
}

export default React.memo(TransactionDetailView);
