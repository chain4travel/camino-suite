import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useWidth from 'app/hooks/useWidth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  Avatar,
  ClickAwayListener,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { SearchMenuItem } from 'types/search-menu';
import { mapToItem } from './utils/search-utils';
import { debounce } from './utils/debounce';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { selectMagellanAddress } from 'store/app-config';
import { searchApi } from 'utils/magellan-api-utils';

function OutlinedSearchInput() {
  const theme = useTheme();
  const navigate = useNavigate();
  const magellanAddress = useAppSelector(selectMagellanAddress);
  const [search, setSearch] = useState('');
  const [menuItems, setMenuItems] = useState([] as SearchMenuItem[]);
  const [timer, setTimer] = useState(0 as unknown as NodeJS.Timeout);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleSearch = () => {
    setLoading(true);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      debouncedSearch(search);
    }, 500);
    setTimer(newTimer);
    setLoading(false);
  };

  const debouncedSearch = debounce(
    async search => {
      if (!search || search.length < 1) {
        setMenuItems([]);
        return;
      }
      setLoading(true);
      const data = await axios
        .get(`${magellanAddress}${searchApi}?query=${search}`)
        .then((res: AxiosResponse) => {
          return res.data;
        })
        .catch((err: AxiosError) => {
          setLoading(false);
          return [];
        });
      setMenuItems([]);
      const numberOfResults =
        data?.results?.length > 5 ? 5 : data?.results?.length;
      for (let i = 0; i < numberOfResults; i++) {
        const mapItem = (await mapToItem(
          data.results[i].type,
          data.results[i].data,
        )) as SearchMenuItem;
        if (mapItem) setMenuItems(prev => [...prev, mapItem]);
      }
      setLoading(false);
    },
    250,
    search.length === 0,
  );

  const handleClick = () => {
    if (search.length > 0 || loading) setOpen(true);
    else setOpen(prev => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (menuItems.length > 0) {
      navigate(menuItems[0].link);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]); // eslint-disable-line

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '40px',
        [theme.breakpoints.down('md')]: {
          height: '50px !important',
        },
      }}
    >
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <Box
          component="form"
          sx={{
            height: '40px',
            [theme.breakpoints.down('md')]: {
              height: '50px',
            },
          }}
          onSubmit={handleSubmit}
        >
          <OutlinedInput
            placeholder="Search by Address / Hash / Block / Token"
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              p: '8px 16px',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              borderWidth: '0px',
              fontSize: '15px',
              lineHeight: '24px',
              fontWeight: 400,
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              [theme.breakpoints.down('md')]: {
                height: '50px',
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onFocus={handleClick}
            onChange={e => {
              setSearch(e.target.value);
            }}
            onKeyUp={e => {
              if (e.key === 'Enter' && menuItems.length > 0) {
                navigate(menuItems[0].link);
              }
            }}
          />
          <SearchResult
            open={open}
            menuItems={menuItems}
            loading={loading}
            search={search}
          />
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

export default function SearchInput() {
  const { isDesktop } = useWidth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <>
      {!isDesktop ? (
        <div>
          <SearchIcon
            onClick={handleOpen}
            sx={{ color: 'primary.contrastText' }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            disableEscapeKeyDown
            disableEnforceFocus
            disableAutoFocus
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'primary.dark',
                boxShadow: 24,
                width: '500px',
                maxWidth: '70%',
                padding: '1rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '40px',
                borderRadius: '12px',
                height: '40px',
                [theme.breakpoints.down('md')]: {
                  height: 'auto',
                },
                [theme.breakpoints.down('sm')]: {
                  maxWidth: '95%',
                },
              }}
            >
              <Typography variant="h5" component="h5">
                Search for anything
              </Typography>
              <OutlinedSearchInput />
            </Box>
          </Modal>
        </div>
      ) : (
        <Box
          sx={{
            width: '450px',
            height: '40px',
            '@media (max-width:1199px)': {
              width: '325px',
            },
          }}
        >
          <OutlinedSearchInput />
        </Box>
      )}
    </>
  );
}

const SearchResultMenu = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        maxHeight: '300px',
        position: 'absolute',
        zIndex: 999,
        top: '100%',
        overflowX: 'hidden',
        borderRadius: '7px',
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        marginTop: '8px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      {children}
    </Box>
  );
};

const SearchResultMenuList = ({ menuItems }) => {
  return (
    <MenuList>
      {menuItems.map(item => (
        <MenuItem
          key={item.label + Math.random().toString(36).substring(2, 15)}
          onClick={() => {
            window.location.href = item.link;
          }}
          sx={{ gap: '10px' }}
        >
          <ListItemIcon>
            <Avatar
              sx={{
                backgroundColor: item.avatarColor,
                color: 'primary.contrastText',
                width: 30,
                height: 30,
                borderRadius: '12px',
              }}
            >
              <Typography variant="caption">{item.avatar}</Typography>
            </Avatar>
          </ListItemIcon>
          <Typography variant="body2" component="p" noWrap>
            {item.label}
          </Typography>
        </MenuItem>
      ))}
    </MenuList>
  );
};

const SearchResult = ({ open, loading, menuItems, search }) => {
  if (open && loading) {
    return (
      <SearchResultMenu>
        <MenuList>
          <MenuItem
            key="loading"
            sx={{ gap: '10px', justifyContent: 'center' }}
          >
            <Typography variant="body2" component="p" noWrap>
              Loading...
            </Typography>
          </MenuItem>
        </MenuList>
      </SearchResultMenu>
    );
  } else if (open && !loading) {
    if (menuItems.length > 0) {
      return (
        <SearchResultMenu>
          <SearchResultMenuList menuItems={menuItems} />
        </SearchResultMenu>
      );
    } else if (
      search.startsWith('0') &&
      search.length !== 36 &&
      search.length !== 42 &&
      menuItems.length === 0
    ) {
      return (
        // this should be updated to be more specific
        <SearchResultMenu>
          <MenuList>
            <MenuItem
              key="no-results"
              sx={{ gap: '10px', justifyContent: 'center' }}
            >
              <Typography variant="body2" component="p" noWrap>
                No results found
              </Typography>
            </MenuItem>
          </MenuList>
        </SearchResultMenu>
      );
    }
  }
  return null;
};
