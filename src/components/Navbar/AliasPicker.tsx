import { Box, DialogContent, DialogTitle, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import DialogAnimate from '../Animate/DialogAnimate'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import MainButton from '../MainButton'
import LoadMyKeysComponent from './LoadMyKeysComponent'
import LoadSaveKeysComponent from './LoadSaveKeysComponent'

const AliasPicker = () => {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => {
        setOpen(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
    }
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
