import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CCHAIN,
  XCHAIN,
  PCHAIN,
  WALLET,
  DOCS,
  MAINNET,
} from 'utils/route-paths';
import { ChainType } from 'utils/types/chain-type';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const activeTab = (path: string): number => {
  switch (path) {
    case ChainType.C_CHAIN:
      return 0;
    case ChainType.X_CHAIN:
      return 1;
    case ChainType.P_CHAIN:
      return 2;
  }
  return 0;
};

export default function Links() {
  const location = useLocation();
  const [value, setValue] = useState(
    activeTab(location.pathname.split('/')[1]),
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (location.pathname !== MAINNET) {
      if (newValue === 3) window.open(DOCS);
      else if (newValue === 4) window.open(WALLET);
      else if (newValue === 0) navigate(CCHAIN);
      else if (newValue === 1) navigate(XCHAIN);
      else if (newValue === 2) navigate(PCHAIN);
      if (newValue !== 3 && newValue !== 4) setValue(newValue);
    }
  };
  useEffect(() => {
    if (location.pathname === MAINNET) setValue(0);
    else if (location.pathname === CCHAIN) setValue(0);
    else if (location.pathname === XCHAIN) setValue(1);
    else if (location.pathname === PCHAIN) setValue(2);
  }, [location]);

  let navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        width: '100%',
        height: '48px',
        padding: '0 8px',
        backgroundColor: 'primary.dark',
      }}
    >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab className="tab" disableRipple label="C-Chain" {...a11yProps(0)} />
        <Tab className="tab" disableRipple label="X-Chain" {...a11yProps(1)} />
        <Tab className="tab" disableRipple label="P-Chain" {...a11yProps(2)} />
        <Tab className="tab" disableRipple label="Docs" {...a11yProps(3)} />
        <Tab className="tab" disableRipple label="Wallet" {...a11yProps(4)} />
      </Tabs>
    </Box>
  );
}
