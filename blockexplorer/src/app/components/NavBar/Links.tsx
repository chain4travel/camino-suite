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
  STATISTICS
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
    case "statistics":
      return 5;
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
      else if (newValue === 5) navigate(STATISTICS)
      if (newValue !== 3 && newValue !== 4) setValue(newValue);
    }
  };
  useEffect(() => {
    if (location.pathname === MAINNET) setValue(0);
    else if (location.pathname === CCHAIN) setValue(0);
    else if (location.pathname === XCHAIN) setValue(1);
    else if (location.pathname === PCHAIN) setValue(2);
    else if (location.pathname === STATISTICS) setValue(5);
  }, [location]);

  let navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        width: '100%',
        height: '48px',
        backgroundColor: 'card.navBar',
      }}
    >
      <Tabs
        // variant="fullWidth"
        value={value}
        onChange={handleChange}
        textColor="secondary"
        // remove the underline
        sx={{ maxWidth: '90%', '& .MuiTabs-indicator': { display: 'none' } }}
        scrollButtons="auto"
        variant="scrollable"
      >
        <Tab className="tab" disableRipple label="C-Chain" {...a11yProps(0)} />
        <Tab className="tab" disableRipple label="X-Chain" {...a11yProps(1)} />
        <Tab className="tab" disableRipple label="P-Chain" {...a11yProps(2)} />
        <Tab className="tab" value={5} disableRipple label="Statistics" {...a11yProps(5)} />
      </Tabs>
    </Box>
  );
}
