import { mdiClose, mdiOpenInNew } from '@mdi/js'
import Icon from '@mdi/react'
import {
    Box,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    MenuItem,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import store from 'wallet/store'
import { getMultisigAliases } from '../../api'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getShowButton } from '../../redux/slices/app-config'
import DialogAnimate from '../Animate/DialogAnimate'
import LoadMyKeysComponent from './LoadMyKeysComponent'
import LoadSaveKeysComponent from './LoadSaveKeysComponent'

const AliasPicker = ({ handleKeyDown }: { handleKeyDown: (e: any) => void }) => {
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const handleOpenModal = () => {
        setOpen(true)
    }
    const showButtonState = useAppSelector(getShowButton)
    async function showButton() {
        setLoad(false)
        let aliases = await getMultisigAliases(store.getters['staticAddresses']('P'))
        if ((aliases && aliases.length > 0) || store.state.wallets.length > 1) setLoad(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
    }
    useEffect(() => {
        showButton()
    }, [showButtonState])
    if (!load) return <></>
    return (
        <MenuItem
            onKeyDown={e => {
                handleKeyDown(e)
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '8px' }}
        >
            <Icon path={mdiOpenInNew} size={1} />
            <Typography
                variant="body2"
                onClick={handleOpenModal}
                style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
                Switch Wallet
            </Typography>
            <DialogAnimate open={open} onClose={handleCloseModal}>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    <Typography variant="h4" component="span">
                        Wallet Switcher
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 15,
                            cursor: 'pointer',
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <Icon path={mdiClose} size={1} />
                    </IconButton>
                </DialogTitle>

                <Divider sx={{ borderWidth: '1.5px' }} />
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                        }}
                    >
                        <LoadSaveKeysComponent />
                    </Box>
                    <LoadMyKeysComponent />
                </DialogContent>
            </DialogAnimate>
        </MenuItem>
    )
}

export default AliasPicker
