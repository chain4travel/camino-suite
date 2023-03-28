import {
    Box,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Radio,
    Typography,
    useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import DialogAnimate from '../Animate/DialogAnimate'
import Icon from '@mdi/react'
import { mdiClose, mdiWalletOutline } from '@mdi/js'
import MainButton from '../MainButton'
import LoadMyKeysComponent from './LoadMyKeysComponent'
import LoadSaveKeysComponent from './LoadSaveKeysComponent'

const ActiveAliasButton = ({ active }: { active: boolean }) => {
    const theme = useTheme()
    return (
        <MainButton
            variant="contained"
            style={{
                background: !active ? theme.palette.secondary.main : ' rgba(0, 133, 255, 0.15)',
            }}
        >
            <Typography
                variant="body2"
                component="span"
                fontWeight="fontWeightBold"
                sx={{ color: 'primary.contrastText' }}
            >
                {active ? <>Active</> : <>Switch</>}
            </Typography>
        </MainButton>
    )
}

// need to add the key
const DefaultButton = ({ isDefault }: { isDefault: boolean }) => {
    return (
        <>
            <FormControlLabel
                control={
                    <Radio
                        onChange={() => {
                            console.log('bsbs')
                        }}
                        checked={isDefault}
                        sx={{
                            '&.Mui-checked': {
                                color: 'secondary.main',
                            },
                        }}
                    />
                }
                label={'Default'}
            />
        </>
    )
}

const Alias = ({
    active,
    personal,
    isDefault,
}: {
    active: boolean
    personal: boolean
    isDefault: boolean
}) => {
    const theme = useTheme()
    return (
        <Grid
            container
            justifyContent="space-between"
            sx={{
                padding: '1rem 0',
                border: '2px solid',
                borderColor: theme.palette.divider,
                borderRadius: '5px',
                margin: '1rem 0',
            }}
        >
            <Grid
                item
                xs={1}
                md={1}
                lg={1}
                xl={1}
                container
                justifyContent="center"
                alignItems="center"
            >
                <Icon path={mdiWalletOutline} size={1.5} />
            </Grid>
            <Grid
                item
                xs={6}
                md={6}
                lg={6}
                xl={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Typography variant="h5" component="span" noWrap>
                    {personal ? <>Personal</> : <>MultiSignature Wallet</>}
                </Typography>
                <Typography variant="subtitle2" component="span" noWrap>
                    X-kopernikus1g65uqn6t77p656w64023nh8nd9updzmxh8ttv3
                </Typography>
            </Grid>
            <Grid
                item
                xs={4}
                md={4}
                lg={4}
                xl={4}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <DefaultButton isDefault={isDefault} />
                <ActiveAliasButton active={active} />
                {/* <ActiveAliasButton active={active} /> */}
                {/* <DefaultButton /> */}
            </Grid>
        </Grid>
    )
}

const AliasPickerOld = () => {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => {
        setOpen(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
    }
    return (
        <>
            <MainButton variant="outlined" onClick={handleOpenModal}>
                Choose Alias
            </MainButton>
            <DialogAnimate open={open} onClose={handleCloseModal}>
                <DialogTitle
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h3" component="span" noWrap>
                        Wallet Switcher
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            mt: '20px',
                        }}
                    >
                        <LoadSaveKeysComponent />
                        {/* <Icon path={mdiAlertOutline} size={1} />
                        <Typography variant="subtitle1" component="span" noWrap>
                            You need to save account in order to set Default value
                        </Typography> */}
                    </Box>
                    <Box
                        sx={{ position: 'absolute', right: '15px', top: '15px', cursor: 'pointer' }}
                        onClick={handleCloseModal}
                    >
                        <Icon path={mdiClose} size={1} />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <LoadMyKeysComponent />
                </DialogContent>
            </DialogAnimate>
        </>
    )
}

export default AliasPickerOld
