import { Box, DialogContent, DialogTitle, Typography, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogAnimate from '../Animate/DialogAnimate'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import MainButton from '../MainButton'
import LoadMyKeysComponent from './LoadMyKeysComponent'
import LoadSaveKeysComponent from './LoadSaveKeysComponent'
import store from 'wallet/store'
import { getMultisigAliases } from '../../api'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getShowButton } from '../../redux/slices/app-config'

const AliasPicker = () => {
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const handleOpenModal = () => {
        setOpen(true)
    }
    const showButtonState = useAppSelector(getShowButton)
    async function showButton() {
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
        <>
            <MainButton
                variant="outlined"
                onClick={handleOpenModal}
                style={{ width: '100%', whiteSpace: 'nowrap', padding: '0.5rem 1rem' }}
            >
                Switch Wallet
            </MainButton>
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
        </>
    )
}

export default AliasPicker
