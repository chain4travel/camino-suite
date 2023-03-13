import { useEffect, useState } from 'react'
import {
    addNetworks,
    changeActiveNetwork,
    changeNetworkStatus,
    getActiveNetwork,
    getNetworks,
    selectNetworkStatus,
} from '@/redux/slices/network'
import { useStore } from 'Explorer/useStore'
import { Status } from '../@types'
import store from 'wallet/store'
import { updateNotificationStatus } from '../redux/slices/app-config'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { AvaNetwork } from 'wallet/AvaNetwork'

const useNetwork = (): {
    handleChangeNetwork: (arg: string) => void
    handleEditCustomNetwork: () => void
    handleRemoveCustomNetwork: () => void
    handleOpenModal: () => void
    handleCloseModal: () => void
    switchNetwork: (network: AvaNetwork) => Promise<void>
    status: Status
    networks: AvaNetwork[]
    open: boolean
    edit: boolean
    networkToEdit: string
    activeNetwork: AvaNetwork
} => {
    const dispatch = useAppDispatch()
    const [selectedEvent, setSelectedEvent] = useState('')
    const [selectedNetwork, setSelectedNetwork] = useState(null)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [networkToEdit, setNetworkToEdit] = useState('')

    const networks: AvaNetwork[] = useAppSelector(getNetworks)
    const activeNetwork = useAppSelector<AvaNetwork>(getActiveNetwork)
    const status: Status = useAppSelector(selectNetworkStatus)

    const { changeNetworkExplorer } = useStore()

    useEffect(() => {
        if (selectedNetwork) {
            handleChangeEvent()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedNetwork])

    const switchNetwork = async (network: AvaNetwork) => {
        try {
            dispatch(changeNetworkStatus(Status.LOADING))
            await store.dispatch('Network/setNetwork', network)
            dispatch(changeNetworkStatus(Status.SUCCEEDED))
            dispatch(
                updateNotificationStatus({
                    message: `Connected to ${network.name}`,
                    severity: 'success',
                }),
            )
        } catch (e) {
            store.state.Network.selectedNetwork = null
            dispatch(updateNotificationStatus({ message: 'Disconnected', severity: 'error' }))
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
    const handleEditCustomNetwork = () => {
        setSelectedEvent('editNetwork')
    }

    const handleRemoveCustomNetwork = () => {
        setSelectedEvent('removeNetwork')
    }
    async function changeNetworkEvent(net) {
        let selectedN = networks.find(network => network.name === net)
        await switchNetwork(selectedN)
    }
    async function editNetworkEvent(net) {
        setNetworkToEdit(net)
        setEdit(true)
        setOpen(true)
    }
    async function removeNetworkEvent(net: AvaNetwork) {
        let networkToRemove = store.getters['Network/allNetworks'].find(
            (network: AvaNetwork) => network.name === net,
        )
        if (networkToRemove) {
            store.dispatch('Network/removeCustomNetwork', networkToRemove)
            let updatedNetworks: AvaNetwork[] = store.getters['Network/allNetworks']
            if (networkToRemove.name === activeNetwork.name) {
                await switchNetwork(updatedNetworks[1])
                dispatch(changeActiveNetwork(updatedNetworks[1]))
                changeNetworkExplorer(updatedNetworks[1])
            }
            dispatch(
                updateNotificationStatus({
                    message: `Removed custom network.`,
                    severity: 'success',
                }),
            )
            dispatch(addNetworks(updatedNetworks))
        }
    }
    const handleChangeEvent = async () => {
        if (selectedEvent === 'editNetwork') await editNetworkEvent(selectedNetwork)
        else if (selectedEvent === 'removeNetwork') await removeNetworkEvent(selectedNetwork)
        else if (!selectedEvent) await changeNetworkEvent(selectedNetwork)
        setSelectedEvent('')
        setSelectedNetwork('')
    }
    const handleCloseModal = () => {
        setNetworkToEdit('')
        setEdit(false)
        setOpen(false)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }
    return {
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
    }
}

export default useNetwork
