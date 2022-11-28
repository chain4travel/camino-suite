import * as React from 'react';
import { Grid, TableContainer, Divider } from '@mui/material';
import axios from 'axios';
import { convertMemo, getInputFunds, getOutputFunds } from 'utils/magellan';
import { MagellanXPTransaction } from 'types/magellan-types';
import { useLocation } from 'react-router-dom';
import { ChainType } from 'utils/types/chain-type';
import { AddressSection } from './AddressSection';
import { InputOutputSection } from './InputOutputSection';
import { getBaseUrl, getChainID } from 'api/utils';
import { xpTransactionApi } from 'utils/magellan-api-utils';

export function createTransaction(magellanTransaction: MagellanXPTransaction) {
  return {
    id: magellanTransaction.id,
    timestamp: new Date(Date.parse(magellanTransaction.timestamp)),
    type: magellanTransaction.type,
    from: getInputFunds(magellanTransaction),
    to: getOutputFunds(magellanTransaction),
    fee: magellanTransaction.txFee,
    inputTotals: magellanTransaction.inputTotals,
    outputTotals: magellanTransaction.outputTotals,
    status: 'accepted', //TODO: set dynamically when magellan delivers this information
    memo: convertMemo(magellanTransaction.memo),
  };
}

export async function loadBlocksAndTransactions({
  address,
  offset,
  limit,
  chainID,
}) {
  return await axios.get(
    `${getBaseUrl()}${xpTransactionApi}?chainID=${chainID}&offset=${offset}&limit=${limit}&sort=timestamp-desc&address=${address}`,
  );
}

export async function loadTransactions(offset) {
  let res = (await loadBlocksAndTransactions(offset)).data;
  if (res.transactions && res.transactions.length > 0) {
    let newItems = res.transactions.map(item => createTransaction(item));
    return newItems;
  }
  return [];
}

export default function XPAddressView({ chainType }: { chainType: ChainType }) {
  const tableEl = React.useRef<HTMLDivElement>(null);
  const [distanceBottom, setDistanceBottom] = React.useState(0);
  const [hasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const location = useLocation();

  const CHAIN_ID = getChainID(location.pathname.split('/')[3][0].toLowerCase());
  const loadMore = React.useCallback(() => {
    setLoading(true);
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);
  const loadItems = async () => {
    await new Promise<void>(resolve => {
      loadTransactions({
        address: location.pathname.split('/')[3],
        offset: rows.length,
        limit: 10,
        chainID: CHAIN_ID,
      }).then(res => {
        if (res.length > 0) setRows([...rows, ...res]);
        setLoading(false);
        resolve();
      });
    });
  };
  const scrollListener = React.useCallback(() => {
    if (tableEl && tableEl.current && tableEl.current) {
      let bottom =
        tableEl?.current?.scrollHeight - tableEl?.current?.clientHeight;
      if (!distanceBottom) {
        // calculate distanceBottom that works for you
        setDistanceBottom(Math.round((bottom / 100) * 20));
      }
      if (
        tableEl.current.scrollTop > bottom - distanceBottom &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    }
  }, [hasMore, loadMore, loading, distanceBottom]);
  React.useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef?.addEventListener('scroll', scrollListener);
    return () => {
      tableRef?.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);

  React.useEffect(() => {
    loadTransactions({
      address: location.pathname.split('/')[3],
      offset: 0,
      limit: 10,
      chainID: CHAIN_ID,
    }).then(res => {
      if (res.length > 0) setRows(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <TableContainer ref={tableEl} sx={{ height: '700px' }}>
      {rows.length > 0 &&
        rows.map(item => {
          return (
            <div key={item.id}>
              <Grid container spacing={2}>
                <Grid container item xs={12} md={4} spacing={2}>
                  <AddressSection
                    chainType={chainType}
                    id={item.id}
                    type={item.type}
                    timestamp={item.timestamp}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs
                  md={8}
                  spacing={2}
                  sx={{ maxWidth: 'unset' }}
                >
                  <InputOutputSection inputs={item.from} outputs={item.to} />
                </Grid>
              </Grid>
              <Divider
                variant="fullWidth"
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
              />
            </div>
          );
        })}
    </TableContainer>
  );
}
