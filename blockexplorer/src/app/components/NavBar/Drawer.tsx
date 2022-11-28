import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { CCHAIN, XCHAIN, PCHAIN, WALLET, DOCS } from 'utils/route-paths';
import {
  mdiAlphaCBoxOutline,
  mdiAlphaXBoxOutline,
  mdiAlphaPBoxOutline,
  mdiTextBoxMultipleOutline,
  mdiWalletOutline,
  mdiInboxOutline,
} from '@mdi/js';
import Icon from '@mdi/react';

type Anchor = 'left';

export default function TemporaryDrawer() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <DrawerListItem
          label="C-Chain"
          to={CCHAIN}
          iconPath={mdiAlphaCBoxOutline}
        />
        <DrawerListItem
          label="X-Chain"
          to={XCHAIN}
          iconPath={mdiAlphaXBoxOutline}
        />
        <DrawerListItem
          label="P-Chain"
          to={PCHAIN}
          iconPath={mdiAlphaPBoxOutline}
        />
      </List>
      <Divider />
      <List>
        <DrawerListItem
          label="Docs"
          to={DOCS}
          iconPath={mdiTextBoxMultipleOutline}
          newWindow
        />
        <DrawerListItem
          label="Wallet"
          to={WALLET}
          iconPath={mdiWalletOutline}
          newWindow
        />
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'none',
        [theme.breakpoints.down('md')]: {
          display: 'block',
        },
      }}
    >
      <React.Fragment key={'left'}>
        <Button
          onClick={toggleDrawer('left', true)}
          sx={{
            minWidth: 'min-content',
            padding: '0px 8px',
            color: 'text.primary',
          }}
          aria-label="burger menu"
        >
          <MenuIcon />
        </Button>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </Box>
  );
}

const DrawerListItem = ({
  label,
  to,
  iconPath,
  newWindow = false,
}: {
  label: string;
  to: string;
  iconPath?: string;
  newWindow?: boolean;
}) => {
  return (
    <ListItem key={label} disablePadding>
      <Link
        to={{ pathname: to }}
        style={{ width: '100%', textDecoration: 'none' }}
        target={newWindow ? '_blank' : '_self'}
      >
        <ListItemButton>
          <ListItemIcon>
            {iconPath ? (
              <Icon path={iconPath} size={1} />
            ) : (
              <Icon path={mdiInboxOutline} size={1} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{
              color: 'text.primary',
            }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
