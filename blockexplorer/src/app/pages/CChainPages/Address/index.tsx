import React, { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import { mdiFileDocumentOutline } from '@mdi/js';
import PageContainer from 'app/components/PageContainer';
import TabsHeader from 'app/components/TabComponent/TabsHeader';
import TabPanel from 'app/components/TabComponent/TabPanel';
import Transactions from './Transactions';
import SubPageTitle from 'app/components/SubPageTitle';
import useWidth from 'app/hooks/useWidth';
import { CCHAIN } from 'utils/route-paths';
import CopyTitleCard from 'app/components/CopyTitleCard';
import { useLocation } from 'react-router-dom';

const tabOptions = [
  {
    label: 'Transactions',
    value: 'transactions',
  },
];

const CAddressDetails: FC = () => {
  const { isDesktop } = useWidth();
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const [address, setAddress] = React.useState(location.pathname.split('/')[3]);

  useEffect(() => {
    setAddress(location.pathname.split('/')[3]);
  }, [location]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <PageContainer
      pageTitle="C Address Detail"
      metaContent="Address Detail C-Chain"
    >
      <SubPageTitle title="Address Detail" backToLink={CCHAIN} />
      <CopyTitleCard
        label="Address"
        value={address}
        icon={mdiFileDocumentOutline}
        mixedStyle
      />
      <Paper
        square
        variant="outlined"
        sx={{ backgroundColor: 'primary.dark', boxShadow: 'none' }}
      >
        <TabsHeader
          tabValue={value}
          changeAction={handleChange}
          tabOptions={tabOptions}
        >
          <TabPanel
            value={value}
            index={0}
            style={{ padding: isDesktop ? '0px' : '.7rem .7rem 0px .7rem' }}
          >
            <Transactions />
          </TabPanel>
        </TabsHeader>
      </Paper>
    </PageContainer>
  );
};

export default CAddressDetails;
