import React, { useEffect } from 'react'
import Icon from '@mdi/react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    Button,
    MenuItem,
    Typography,
    Select,
    DialogTitle,
    useTheme,
    MenuList,
    Stack,
    Box,
    Chip,
    IconButton,
} from '@mui/material'
import { mdiDeleteOutline, mdiPencilOutline, mdiPlus } from '@mdi/js'
import store from 'wallet/store'
import {
    addNetworks,
    changeActiveNetwork,
    changeNetworkStatus,
    getActiveNetwork,
    getNetworks,
    selectNetworkStatus,
} from '../../redux/slices/network'
import { networkStatusColor, networkStatusName } from '../../utils/networkUtils'
import DialogAnimate from '../Animate/DialogAnimate'
import MHidden from '../@material-extend/MHidden'
import AddNewNetwork from './AddNewNetwork'
import SelectedNetwork from './SelectNetwork'
import { Status } from '../../@types'
import { useStore } from 'Explorer/useStore'
import { updateAssets } from '../../helpers/walletStore'

export default function NetworkSwitcher() {
    const dispatch = useAppDispatch()
    const networks = useAppSelector(getNetworks)
    const activeNetwork = useAppSelector(getActiveNetwork)
    const status = useAppSelector(selectNetworkStatus)
    const theme = useTheme()
    const [selectedEvent, setSelectedEvent] = React.useState('')
    const [selectedNetwork, setSelectedNetwork] = React.useState(null)

    const {
        changeNetworkExplorer,
        resetCChainReducer,
        resetValidatorsReducer,
        resetXPChainReducer,
    } = useStore()

    const switchNetwork = async network => {
        try {
            dispatch(changeNetworkStatus(Status.LOADING))
            await store.dispatch('Network/setNetwork', network)
            dispatch(changeNetworkStatus(Status.SUCCEEDED))
            await updateAssets()
        } catch (e) {
            store.state.Network.selectedNetwork = null
            store.state.Network.status = 'disconnected'
            dispatch(changeNetworkStatus(Status.FAILED))
        } finally {
            let newSelectedNetwork = store.state.Network.selectedNetwork
                ? store.state.Network.selectedNetwork
                : network
            dispatch(changeActiveNetwork(newSelectedNetwork))
            changeNetworkExplorer(newSelectedNetwork)
        }
    }
    const handleChangeNetwork = (selected: string) => {
        setSelectedNetwork(selected)
    }
    const handleEditCustomNetwork = network => {
        setSelectedEvent('editNetwork')
        // setSelectedNetwork(network)
        // setSelectedNetwork(network)
        // setSelectedEvent('editNetwork')
        // console.log('clicked on edit network', network)
        // setSelectedEvent('edit')
        // setSelectedNetwork(network.id)
        // setOpen(true)
    }

    const handleRemoveCustomNetwork = async network => {
        setSelectedEvent('removeNetwork')
    }
    async function changeNet(net) {
        let selectedN = networks.find(network => network.name === net)
        await switchNetwork(selectedN)
    }
    async function editNet(net) {
        console.log('edit network', net)
    }
    async function removeNet(net) {
        let selectedN = networks.find(network => network.name === net)
        store.dispatch('Network/removeCustomNetwork', selectedN)
        let nks = store.getters['Network/allNetworks']
        if (selectedN.name === activeNetwork.name) {
            await switchNetwork(networks[1])
            dispatch(changeActiveNetwork(networks[1]))
            changeNetworkExplorer(networks[1])
        }
        dispatch(addNetworks(nks))
    }

    const handleChangeEvent = async () => {
        if (selectedEvent === 'editNetwork') await editNet(selectedNetwork)
        else if (selectedEvent === 'removeNetwork') await removeNet(selectedNetwork)
        else if (!selectedEvent) await changeNet(selectedNetwork)
        setSelectedEvent('')
        setSelectedNetwork('')
    }
    useEffect(() => {
        if (selectedNetwork) {
            handleChangeEvent()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedNetwork])

    const [network, setNetwork] = React.useState('')

    React.useEffect(() => {
        resetCChainReducer()
        resetValidatorsReducer()
        resetXPChainReducer()
        if (activeNetwork.name) setNetwork(activeNetwork.name)
    }, [activeNetwork]) // eslint-disable-line

    const [open, setOpen] = React.useState(false)

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    return (
        <>
            {/* Mobile */}
            <MHidden width="smUp">
                <MenuList sx={{ bgcolor: 'transparent' }}>
                    <MenuItem
                        sx={{
                            typography: 'h6',
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
                            }}
                            onClick={() => handleChangeNetwork(network.name)}
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
                                    <Typography variant="subtitle1" component="span" noWrap>
                                        {network.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1 }} />
                                {!network.readonly && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexBasis: '50%',
                                        }}
                                    >
                                        <IconButton onClick={() => handleRemoveCustomNetwork()}>
                                            <Icon path={mdiDeleteOutline} size={0.8} />
                                        </IconButton>
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
                        onClick={handleOpenModal}
                        sx={{
                            typography: 'body1',
                            width: '100%',
                            maxWidth: '326px',
                            justifyContent: 'space-between',
                        }}
                    >
                        Add Custom Network
                        <IconButton>
                            <Icon path={mdiPlus} size={0.8} />
                        </IconButton>
                    </MenuItem>
                </MenuList>
                <DialogAnimate open={open} onClose={handleCloseModal}>
                    <DialogTitle>Add New Network</DialogTitle>
                    <AddNewNetwork
                        networks={networks}
                        handleClose={handleCloseModal}
                        switchNetwork={switchNetwork}
                    />
                </DialogAnimate>
            </MHidden>
            {/* Desktop */}
            <MHidden width="smDown">
                <Select
                    value={network}
                    renderValue={() => <SelectedNetwork />}
                    sx={{
                        maxWidth: '13rem',
                        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '.MuiSvgIcon-root': { color: theme.palette.text.primary },
                    }}
                >
                    {networks?.map(network => (
                        <MenuItem
                            key={network.id}
                            value={network.name}
                            divider
                            onClick={() => {
                                handleChangeNetwork(network.name)
                            }}
                            sx={{ gap: '.6rem', justifyContent: 'space-between' }}
                        >
                            <Typography variant="subtitle1" component="span" noWrap>
                                {network.name}
                            </Typography>
                            {!network.readonly && (
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
                                        onClick={() => handleEditCustomNetwork(network.name)}
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
                                        onClick={() => handleRemoveCustomNetwork(network.name)}
                                    >
                                        <Icon path={mdiDeleteOutline} size={0.7} color="white" />
                                    </Button>
                                </Box>
                            )}
                        </MenuItem>
                    ))}
                    <MenuItem
                        onClick={handleOpenModal}
                        sx={{ typography: 'body1', width: '100%', maxWidth: '326px' }}
                    >
                        Add Custom Network
                    </MenuItem>
                </Select>
                <DialogAnimate open={open} onClose={handleCloseModal}>
                    <DialogTitle>Add New Network</DialogTitle>
                    <AddNewNetwork
                        networks={networks}
                        handleClose={handleCloseModal}
                        switchNetwork={switchNetwork}
                    />
                </DialogAnimate>
            </MHidden>
        </>
    )
}
