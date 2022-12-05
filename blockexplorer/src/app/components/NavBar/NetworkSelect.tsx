import * as React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  Typography,
  Modal,
  TextField,
  Chip,
} from '@mui/material';
import {
  getActiveNetwork,
  getNetworks,
  changeNetwork,
  addCustomNetwork,
  removeCustomNetwork,
  selectNetworkStatus,
} from 'store/app-config';
import { useNavigate } from 'react-router-dom';
import { mdiChevronDown, mdiTrashCanOutline } from '@mdi/js';
import { Network } from 'types/store';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { resetValidatorsReducer } from 'store/validatorsSlice';
import { resetXPChainReducer } from 'store/xchainSlice';
import { resetCChainReducer } from 'store/cchainSlice';
import useWidth from 'app/hooks/useWidth';
import MainButton from '../MainButton';
import Icon from '@mdi/react';
import { getChains } from 'api';

function SelectedNetwork({
  value,
  networkStatus,
}: {
  value: string;
  networkStatus: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Chip
        sx={{
          width: '8px',
          height: '8px',
          backgroundColor:
            networkStatus === 'failed' || value === 'Mainnet'
              ? '#DD5E56'
              : '#35E9AD',
        }}
      />
      <Box
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </Box>
    </Box>
  );
}

const nameOfActiveNetwork = (networks, id) => {
  let active = networks.find(item => item.id === id);
  return active?.displayName;
};

export default function NetworkSelect() {
  const navigate = useNavigate();
  const networks = useAppSelector(getNetworks);
  const activeNetwork = useAppSelector(getActiveNetwork);
  const [network, setNetwork] = React.useState(
    nameOfActiveNetwork(networks, activeNetwork),
  );
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    // Reset Store
    dispatch(resetCChainReducer());
    dispatch(resetValidatorsReducer());
    dispatch(resetXPChainReducer());
    dispatch(changeNetwork(event.target.value));
  };

  React.useMemo(() => {
    if (activeNetwork === 'mainnet-testnet') navigate('/mainnet');
    else navigate('/');
  }, [activeNetwork]); // eslint-disable-line

  React.useEffect(() => {
    setNetwork(nameOfActiveNetwork(networks, activeNetwork));
  }, [activeNetwork]); // eslint-disable-line

  const handleRemoveCustomNetwork = (id: string) => {
    const customNetworks = JSON.parse(
      localStorage.getItem('customNetworks') || '[]',
    );
    const newCustomNetworks = customNetworks.filter(
      network => network.id !== id,
    );
    localStorage.setItem('customNetworks', JSON.stringify(newCustomNetworks));
    dispatch(changeNetwork('Columbus'));
    dispatch(removeCustomNetwork(id));
  };
  const status = useAppSelector(selectNetworkStatus);
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <FormControl>
        <Select
          variant="outlined"
          onChange={handleChange}
          value={network}
          IconComponent={() => <Icon path={mdiChevronDown} size={1} />}
          renderValue={() => {
            return <SelectedNetwork value={network} networkStatus={status} />;
          }}
          sx={{
            height: '40px',
            maxWidth: '170px',
            minWidth: '170px',
            borderRadius: '10px',
            padding: '8px 16px',
            '@media (max-width:370px)': {
              minWidth: '120px',
              width: '120px',
            },
            '.MuiSelect-select': {
              paddingRight: '0px !important',
            },
          }}
        >
          {networks.map((item, index) => {
            return (
              <MenuItem
                key={index}
                value={item.displayName}
                sx={{ gap: '10px', justifyContent: 'space-between' }}
              >
                <Typography variant="body1" component="span" noWrap>
                  {item.displayName}
                </Typography>
                {!item.predefined && (
                  <Button
                    sx={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: 'secondary.main',
                      borderRadius: '7px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                      },
                    }}
                    onClick={() => {
                      handleRemoveCustomNetwork(item.id);
                    }}
                  >
                    <Icon path={mdiTrashCanOutline} size={0.7} color="white" />
                  </Button>
                )}
              </MenuItem>
            );
          })}
          <NewNetwork />
        </Select>
      </FormControl>
    </Box>
  );
}

const NewNetwork = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { isDesktop } = useWidth();

  const [NewNetwork, setNewNetwork] = React.useState({
    id: '',
    displayName: 'My New Network',
    protocol: 'http',
    host: '127.0.0.1',
    magellanAddress: 'http://127.0.0.1:8080' as string,
    port: 9650,
    predefined: false,
  });
  const dispatch = useAppDispatch();

  // handle duplicate network id
  const handleDuplicateNetworkId = (
    NewNetwork: Network,
    networks: Network[],
  ) => {
    if (
      networks.find(
        item => item.id === NewNetwork.id && item.predefined === false,
      )
    ) {
      return true;
    }
    return false;
  };

  const networks = useAppSelector(getNetworks);
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    NewNetwork.id = NewNetwork.displayName.replace(/\s/g, '-').toLowerCase();
    if (handleDuplicateNetworkId(NewNetwork, networks)) {
      setError('Network Name already exists');
      return;
    }
    setError('');
    if (NewNetwork.magellanAddress.length === 0)
      NewNetwork.magellanAddress = `${NewNetwork.protocol}//${NewNetwork.host}:${NewNetwork.port}`;
    const ll = localStorage.getItem('customNetworks') as string;
    const customNetworks = JSON.parse(ll) || [];
    customNetworks.push(NewNetwork);
    localStorage.setItem('customNetworks', JSON.stringify(customNetworks));
    dispatch(addCustomNetwork(NewNetwork));
    dispatch(changeNetwork(NewNetwork.displayName));
    dispatch(getChains());
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <Typography variant="body1">Add New Network</Typography>
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '7px',
            padding: '1.5rem',
            minWidth: isDesktop ? '400px' : '0px',
          }}
        >
          <FormControl fullWidth variant="filled" size="medium">
            <TextField
              id="displayName"
              label="Display Name"
              variant="outlined"
              margin="normal"
              defaultValue="My New Network"
              color="secondary"
              fullWidth
              error={handleDuplicateNetworkId(NewNetwork, networks)}
              helperText={error}
              onChange={e =>
                setNewNetwork({ ...NewNetwork, displayName: e.target.value })
              }
            />
            <TextField
              id="protocol"
              label="Protocol"
              variant="outlined"
              margin="normal"
              defaultValue="http"
              color="secondary"
              fullWidth
              onChange={e =>
                setNewNetwork({ ...NewNetwork, protocol: e.target.value })
              }
            />
            <TextField
              id="host"
              label="Host"
              variant="outlined"
              margin="normal"
              defaultValue="127.0.0.1"
              color="secondary"
              fullWidth
              onChange={e =>
                setNewNetwork({ ...NewNetwork, host: e.target.value })
              }
            />
            <TextField
              id="port"
              label="Port"
              variant="outlined"
              margin="normal"
              defaultValue="9650"
              fullWidth
              type="number"
              color="secondary"
              onChange={e =>
                setNewNetwork({ ...NewNetwork, port: Number(e.target.value) })
              }
            />
            <TextField
              id="magellanAddress"
              label="Magellan Address"
              variant="outlined"
              margin="normal"
              color="secondary"
              type="text"
              fullWidth
              onChange={e =>
                setNewNetwork({
                  ...NewNetwork,
                  magellanAddress: e.target.value,
                })
              }
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'space-between',
                marginTop: '1rem',
              }}
            >
              <MainButton
                variant="outlined"
                onClick={handleSubmit}
                style={{ color: 'white' }}
              >
                Add Network
              </MainButton>
              <MainButton variant="contained" onClick={handleClose}>
                Cancel
              </MainButton>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};
