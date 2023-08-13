import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { Box, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import store from 'wallet/store'
import { getMultisigAliases } from '../../api'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getShowButton } from '../../redux/slices/app-config'
import DialogAnimate from '../Animate/DialogAnimate'
import MainButton from '../MainButton'
import LoadMyKeysComponent from './LoadMyKeysComponent'
import LoadSaveKeysComponent from './LoadSaveKeysComponent'

const AliasPicker = () => {
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
        <>
            <MainButton
                variant="outlined"
                onClick={handleOpenModal}
                style={{ width: '100%', whiteSpace: 'nowrap', padding: '0.5rem 1rem' }}
            >
                Switch Wallet
            </MainButton>
            <DialogAnimate open={open} onClose={handleCloseModal}>
                <DialogTitle
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h4" component="h4">
                        Wallet Switcher
                    </Typography>
                    <Box sx={{ cursor: 'pointer' }} onClick={handleCloseModal}>
                        <Icon path={mdiClose} size={1} />
                    </Box>
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
