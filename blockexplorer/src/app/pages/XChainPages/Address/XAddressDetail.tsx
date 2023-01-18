import React, { useEffect, useState } from 'react';
import PageContainer from 'app/components/PageContainer';
import SubPageTitle from 'app/components/SubPageTitle';
import CopyTitleCard from 'app/components/CopyTitleCard';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import XPAddressView from './XPAddressView';
import axios from 'axios';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { CamAmount } from 'app/components/CamAmount';
import { ChainType } from 'utils/types/chain-type';
import { mdiFileDocumentOutline } from '@mdi/js';
import { getBaseUrl } from 'api/utils';
import { addressesApi, assetsApi } from 'utils/magellan-api-utils';
import { BASE_PATH } from '../../../../utils/route-paths';
import { getChainTypeFromUrl, getAddressFromUrl } from 'utils/route-utils';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
];

async function loadAssets() {
  const loadedAssets = (await axios.get(`${getBaseUrl()}${assetsApi}`)).data;
  const newElements = new Map();
  if (loadedAssets.assets) {
    loadedAssets.assets.forEach(element => {
      newElements.set(element.id, {
        name: element.name,
        symbol: element.symbol,
      });
    });
  }
  return newElements;
}
export interface AddressBalance {
  id: string;
  balance: any;
  symbol: string;
  name: string;
}

export default function XAddressDetail() {
  // getting the address from the url by getting what comes after the last slash
  const address = getAddressFromUrl();
  const chainType = getChainTypeFromUrl() as ChainType;
  const [value, setValue] = React.useState(0);
  const [balance, setBalance] = useState(0);
  // const dispatch = useAppDispatch();
  const location = useLocation();
  async function loadBalances(address) {
    const assets = await loadAssets();
    const addressInfo = await (
      await axios.get(`${getBaseUrl()}${addressesApi}/${address}`)
    ).data;
    const addressBalances: AddressBalance[] = [];
    if (addressInfo && addressInfo.assets) {
      Object.entries(addressInfo.assets).forEach(
        ([key, value]: [key: any, value: any]) => {
          addressBalances.push({
            id: key,
            balance: value.balance,
            name: assets.get(key)?.name || 'UNKNOWN',
            symbol: assets.get(key)?.symbol || 'UNKNOWN',
          });
        },
      );
      setBalance(addressBalances[0]?.balance);
      return addressBalances;
    }
    return [];
  }
  useEffect(() => {
    loadBalances(getAddressFromUrl());
  }, [location]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const getChainPageTitle = (chainType: ChainType) => {
    switch (chainType) {
      case ChainType.X_CHAIN:
        return 'X chain';
      case ChainType.P_CHAIN:
        return 'P chain';
      default:
        return 'X chain';
    }
  };
  return (
    <PageContainer
      pageTitle={getChainPageTitle(chainType)}
      metaContent={`chain-overview ${chainType}`}
    >
      <SubPageTitle
        title="Address Detail"
        backToLink={BASE_PATH + '/' + chainType}
      />
      <CopyTitleCard
        label="Address"
        value={address}
        icon={mdiFileDocumentOutline}
        mixedStyle
      />
      <AddressOverviewCard balance={balance} />
      <Paper square variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
        <TabsHeader
          tabValue={value}
          changeAction={handleChange}
          tabOptions={tabOptions}
        >
          <Panels
            value={value}
            chainType={getChainTypeFromUrl() as ChainType}
          />
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
}

const Panels = ({
  value,
  chainType,
}: {
  value: number;
  chainType: ChainType;
}) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        <XPAddressView chainType={chainType} />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </>
  );
};

export const AddressOverviewCard = ({ balance }: { balance: number }) => {
  return (
    <Paper variant="outlined" sx={{ backgroundColor: 'primary.dark' }}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs md={6}>
            <Typography
              variant="body1"
              component="h6"
              fontWeight="fontWeightBold"
              gutterBottom={true}
            >
              Balance
            </Typography>
          </Grid>
          <Grid item md={6}>
            <CamAmount amount={balance} currency="nCam" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
