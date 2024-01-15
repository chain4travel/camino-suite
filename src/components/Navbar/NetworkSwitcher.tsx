import {
    Box,
    Button,
    Chip,
    CircularProgress,
    DialogTitle,
    MenuItem,
    MenuList,
    Select,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import { mdiDeleteOutline, mdiPencilOutline, mdiPlus } from '@mdi/js'
import { networkStatusColor, networkStatusName } from '../../utils/networkUtils'

import AddNewNetwork from './AddNewNetwork'
import DialogAnimate from '../Animate/DialogAnimate'
import Icon from '@mdi/react'
import MHidden from '../@material-extend/MHidden'
import React from 'react'
import SelectedNetwork from './SelectNetwork'
import useNetwork from '../../hooks/useNetwork'

interface NetworkSwitcherProps {
    handleCloseSidebar?: () => void
}

export default function NetworkSwitcher({ handleCloseSidebar }: NetworkSwitcherProps) {
    const {
        handleChangeNetwork,
        handleEditCustomNetwork,
        handleRemoveCustomNetwork,
        handleOpenModal,
        handleCloseModal,
        switchNetwork,
        status,
        networks,
        open,
        edit,
        networkToEdit,
        activeNetwork,
    } = useNetwork()
    const theme = useTheme()

    const changeNetwork = networkName => {
        handleChangeNetwork(networkName)
        handleCloseSidebar()
    }

    const editNetwork = () => {
        handleEditCustomNetwork()
        handleCloseSidebar()
    }

    const removeNetwork = () => {
        handleRemoveCustomNetwork()
        handleCloseSidebar()
    }

    const openModal = () => {
        handleOpenModal()
        handleCloseSidebar()
    }

    const closeModal = () => {
        handleCloseModal()
        handleCloseSidebar()
    }

    return (
        <>
            {/* Mobile */}
            <MHidden width="smUp">
                <MenuList sx={{ bgcolor: 'transparent' }}>
                    <MenuItem
                        sx={{
                            typography: 'body2',
                            fontWeight: theme.typography.fontWeightMedium,
                            color: theme.palette.text.disabled,
                        }}
                    >
                        Networks
                    </MenuItem>
                    {networks?.map(network => (
                        <MenuItem
                            key={network.id}
                            value={network.name}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'baseline',
                                color: theme.palette.text.primary,
                                ...(network.name === activeNetwork.name && { cursor: 'auto' }),
                            }}
                            onClick={() => {
                                if (network.name === activeNetwork.name) return
                                changeNetwork(network.name)
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="end"
                                sx={{ width: '100%', flexWrap: 'wrap' }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '.7rem' }}>
                                    <Chip
                                        sx={{
                                            width: '8px',
                                            height: '8px',
                                            bgcolor:
                                                network.name === activeNetwork.name
                                                    ? networkStatusColor(status)
                                                    : '#64748B',
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        noWrap
                                        sx={{ maxWidth: '180px' }}
                                    >
                                        {network.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1 }} />
                                {!network.readonly && network.url !== activeNetwork.url && (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box onClick={editNetwork}>
                                            <Icon path={mdiPencilOutline} size={0.8} />
                                        </Box>
                                        <Box onClick={removeNetwork}>
                                            <Icon path={mdiDeleteOutline} size={0.8} />
                                        </Box>
                                    </Box>
                                )}
                                <Box sx={{ flexBasis: '50%', textAlign: 'right' }}>
                                    {activeNetwork.name === network.name && (
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            noWrap
                                            sx={{
                                                marginLeft: 'auto',
                                                color: networkStatusColor(status),
                                                textTransform: 'uppercase',
                                                mr: '8px',
                                            }}
                                        >
                                            {networkStatusName(status)}
                                        </Typography>
                                    )}
                                </Box>
                            </Stack>
                        </MenuItem>
                    ))}
                    <MenuItem
                        onClick={openModal}
                        sx={{
                            typography: 'body2',
                            width: '100%',
                            maxWidth: '326px',
                            justifyContent: 'space-between',
                        }}
                    >
                        Add Custom Network
                        <Icon path={mdiPlus} size={0.8} />
                    </MenuItem>
                </MenuList>
                <DialogAnimate open={open} onClose={closeModal}>
                    <DialogTitle>Add New Network</DialogTitle>
                    <AddNewNetwork
                        networks={networks}
                        handleClose={closeModal}
                        switchNetwork={switchNetwork}
                        edit={edit}
                        networkToEdit={networkToEdit}
                    />
                </DialogAnimate>
            </MHidden>
            {/* Desktop */}
            <MHidden width="smDown">
                <Select
                    value={activeNetwork?.name ? activeNetwork?.name : ''}
                    renderValue={() => <SelectedNetwork />}
                    sx={{
                        typography: 'body2',
                        maxWidth: '13rem',
                        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '.MuiSvgIcon-root': { color: theme.palette.text.primary },
                    }}
                    data-cy="network-selector"
                >
                    {networks?.map(network => (
                        <MenuItem
                            key={network.id}
                            value={network.name}
                            divider
                            onClick={() => {
                                if (network.name === activeNetwork.name) return
                                handleChangeNetwork(network.name)
                            }}
                            sx={{
                                gap: '.6rem',
                                justifyContent: 'space-between',
                                ...(network.name === activeNetwork.name && { cursor: 'auto' }),
                            }}
                            data-cy={`network-name-${network.name}`}
                        >
                            <Typography variant="body2" component="span" noWrap>
                                {network.name}
                            </Typography>
                            {!network.readonly && network.url !== activeNetwork.url && (
                                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                                    <Button
                                        sx={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '7px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            minWidth: 'auto',
                                            border: '1px solid',
                                            borderColor: 'secondary.main',
                                            color: 'secondary.main',
                                            '&:hover': {
                                                backgroundColor: 'secondary.main',
                                            },
                                        }}
                                        onClick={() => handleEditCustomNetwork()}
                                    >
                                        <Icon path={mdiPencilOutline} size={0.7} />
                                    </Button>
                                    <Button
                                        sx={{
                                            width: '30px',
                                            height: '30px',
                                            bgcolor: 'secondary.main',
                                            borderRadius: '7px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            minWidth: 'auto',
                                            '&:hover': {
                                                bgcolor: 'secondary.main',
                                            },
                                        }}
                                        onClick={() => handleRemoveCustomNetwork()}
                                    >
                                        <Icon path={mdiDeleteOutline} size={0.7} color="white" />
                                    </Button>
                                </Box>
                            )}
                        </MenuItem>
                    ))}
                    <MenuItem
                        onClick={handleOpenModal}
                        sx={{ typography: 'body2', width: '100%', maxWidth: '326px' }}
                        data-cy="add-custom-network"
                    >
                        Add Custom Network
                    </MenuItem>
                </Select>
                <DialogAnimate open={open} onClose={handleCloseModal}>
                    <DialogTitle>{!edit ? <>Add New Network</> : <>Edit Network</>}</DialogTitle>
                    <AddNewNetwork
                        networks={networks}
                        handleClose={handleCloseModal}
                        switchNetwork={switchNetwork}
                        edit={edit}
                        networkToEdit={networkToEdit}
                    />
                </DialogAnimate>
            </MHidden>
        </>
    )
}
