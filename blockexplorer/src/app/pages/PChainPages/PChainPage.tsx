import * as React from 'react';
import { ChainType } from 'utils/types/chain-type';
import { fetchXPTransactions } from 'store/xchainSlice/utils';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import {
  selectAllPTransactions,
  getXPchainStatus,
  getPchainOverreview,
} from 'store/xchainSlice';
import PageContainer from 'app/components/PageContainer';
import OverviewCards from '../../components/OverviewCards';
import XPTransactionList from 'app/components/XChainPageComponents/XPTransactionList';
import XPTransactionItem from 'app/components/XChainPageComponents/XPTransactionItem';
import XPItemDivider from 'app/components/XChainPageComponents/XPItemDivider';
import DataControllers from 'app/components/DataControllers';
import LoadingWrapper from 'app/components/LoadingWrapper';
import {
  getValidatorsOverreview,
  getValidatorsStatus,
} from 'store/validatorsSlice';
import { PTRANSACTIONS } from 'utils/route-paths';
import { getChainID } from 'api/utils';

export default function PChainPage() {
  const dispatch = useAppDispatch();
  const CHAIN_ID = getChainID('p');
  const transactions = useAppSelector(selectAllPTransactions);
  const status = useAppSelector(getXPchainStatus);
  const {
    numberOfTransactions,
    totalGasFees,
    gasFeesLoading,
    transactionsLoading,
  } = useAppSelector(getPchainOverreview);
  const validatorsLoading = useAppSelector(getValidatorsStatus);
  const {
    percentageOfActiveValidators,
    numberOfValidators,
    numberOfActiveValidators,
  } = useAppSelector(getValidatorsOverreview);
  useEffectOnce(() => {
    dispatch(fetchXPTransactions({ chainID: CHAIN_ID, chainType: 'p' }));
  });

  return (
    <PageContainer pageTitle="P chain" metaContent="chain-overview p-chain">
      <DataControllers />
      <OverviewCards
        numberOfTransactions={numberOfTransactions}
        totalGasFees={totalGasFees}
        numberOfActiveValidators={numberOfActiveValidators}
        numberOfValidators={numberOfValidators}
        percentageOfActiveValidators={percentageOfActiveValidators}
        gasFeesLoading={gasFeesLoading}
        transactionsLoading={transactionsLoading}
        validatorsLoading={validatorsLoading}
      />
      <XPTransactionList ShowAllLink={PTRANSACTIONS}>
        <LoadingWrapper
          loading={status}
          failedLoadingMsg="Failed to load transactions"
        >
          {transactions?.map((transaction, index) => (
            <XPItemDivider
              index={index}
              max={transactions.length - 1}
              key={index}
            >
              <XPTransactionItem
                chainType={ChainType.P_CHAIN}
                data={transaction}
              />
            </XPItemDivider>
          ))}
        </LoadingWrapper>
      </XPTransactionList>
    </PageContainer>
  );
}
