import React from 'react'
import * as Yup from 'yup'
import { Network } from '../../@types/store'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { Typography, TextField, DialogContent, DialogActions } from '@mui/material'
import { useFormik, Form, FormikProvider } from 'formik'
import { Button } from '@mui/material'
import { AvaNetwork } from 'wallet/AvaNetwork'
import store from 'wallet/store'
import { addNetworks } from '../../redux/slices/network'
import { useStore } from 'Explorer/useStore'
import axios from 'axios'

export default function AddNewNetwork({
    networks,
    handleClose,
    switchNetwork,
    edit,
    networkToEdit,
}) {
    const [error, setError] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const { updateNetworks } = useStore()
    const dispatch = useAppDispatch()
    const selectedNetwork = networks.find(net => net.name === networkToEdit)
    const getInitialValues = () => {
        let _newNetwork
        if (edit && selectedNetwork)
            _newNetwork = {
                id: selectedNetwork.id,
                url: selectedNetwork.url,
                displayName: selectedNetwork.name,
                magellanAddress: selectedNetwork.explorerUrl,
                explorerSiteUrl: selectedNetwork.explorerSiteUrl,
                signavaultAddress: selectedNetwork.signavaultUrl,
                predefined: selectedNetwork.readonly,
            }
        else
            _newNetwork = {
                id: '',
                url: '',
                displayName: '',
                magellanAddress: '',
                explorerSiteUrl: '',
                signavaultAddress: '',
                predefined: false,
            }
        return _newNetwork
    }

    const EventSchema = Yup.object().shape({
        id: Yup.string(),
        displayName: Yup.string().required('This field is required').min(3, 'Too Short!'),
        url: Yup.string()
            .min(10, 'URL must be at least 10 characters')
            .max(200, 'URL must be no more than 200 characters')
            .test(
                'validate http / https prefix',
                'URLs require the appropriate HTTP/HTTPS prefix.',
                function (value) {
                    if (
                        !value ||
                        (value.substring(0, 7) !== 'http://' &&
                            value.substring(0, 8) !== 'https://')
                    ) {
                        return false
                    }
                    return true
                },
            )
            .test('validate base ip', 'Invalid URL.', function (value) {
                let rest = value?.split('://')[1]
                if (!rest || rest.length === 0) {
                    return false
                }
                return true
            })
            .test('validate port', 'You must specify a valid port of the url.', function (value) {
                let rest = value?.split('://')[1]
                if (!rest || !rest.includes(':') || isNaN(parseInt(rest.split(':')[1])))
                    return false
                return true
            }),
        magellanAddress: Yup.string()
            .min(10, 'URL must be at least 10 characters')
            .max(200, 'URL must be no more than 200 characters')
            .matches(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
        explorerSiteUrl: Yup.string()
            .min(10, 'URL must be at least 10 characters')
            .max(200, 'URL must be no more than 200 characters')
            .matches(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
        signavaultAddress: Yup.string()
            .min(10, 'URL must be at least 10 characters')
            .max(200, 'URL must be no more than 200 characters')
            .matches(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
        predefined: Yup.boolean(),
    })

    const handleDuplicateNetworkId = (NewNetwork: Network, networks: Network[]) => {
        const _duplicate = networks.find(
            item => item.id === NewNetwork.id && item.predefined === false,
        )
        if (_duplicate) return true
        return false
    }
    async function tryConnection(url, credential = false): Promise<number | null> {
        try {
            let resp = await axios.post(
                url + '/ext/info',
                {
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'info.getNetworkID',
                },
                {
                    withCredentials: credential,
                },
            )
            return parseInt(resp.data.result.networkID)
        } catch (err) {
            return null
        }
    }
    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const newNetwork = {
                    id: values.displayName.replace(/\s/g, '-').toLowerCase(),
                    displayName: values.displayName,
                    url: values.url,
                    magellanAddress: values.magellanAddress,
                    explorerSiteUrl: values.explorerSiteUrl,
                    signavaultAddress: values.signavaultAddress,
                    predefined: values.predefined,
                }
                if (handleDuplicateNetworkId(newNetwork, networks)) {
                    setSubmitting(false)
                    setError('Network Name already exists')
                    return
                }
                setIsLoading(true)

                let url = newNetwork.url
                let findNetwork = store.state.Network.networksCustom?.findIndex(
                    network => network.id === selectedNetwork?.id,
                )
                let net = new AvaNetwork(
                    newNetwork.displayName,
                    url,
                    newNetwork.id,
                    newNetwork.magellanAddress,
                    newNetwork.explorerSiteUrl,
                    newNetwork.signavaultAddress,
                )
                if (edit === 'edit')
                    net = {
                        ...net,
                        id: store.state.Network.networksCustom[findNetwork].id,
                    } as AvaNetwork
                let credNum = await tryConnection(url, true)
                let noCredNum = await tryConnection(url)

                let validNetId = credNum || noCredNum

                if (!validNetId) {
                    setError('Camino Network Not Found')
                    setIsLoading(false)
                    return
                }
                if (edit && findNetwork !== -1) {
                    store.dispatch('Network/editNetwork', { net, findNetwork })
                } else {
                    store.dispatch('Network/addCustomNetwork', net)
                }
                store.dispatch('Network/addCustomNetwork', net)
                let allNetworks = store.getters['Network/allNetworks']
                dispatch(addNetworks(allNetworks))
                updateNetworks(allNetworks)
                switchNetwork(net)
                resetForm()
                setIsLoading(false)
                setSubmitting(false)
                handleClose()
            } catch (error) {
                console.error(error)
            }
        },
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
                    <TextField
                        fullWidth
                        label="Network Name"
                        {...getFieldProps('displayName')}
                        error={Boolean(touched.displayName && errors.displayName)}
                        helperText={touched.displayName && errors.displayName}
                        sx={{ mb: 3 }}
                        data-cy="add-network-field-network-name"
                    />
                    <TextField
                        fullWidth
                        label="URL"
                        {...getFieldProps('url')}
                        error={Boolean(touched.url && errors.url)}
                        helperText={touched.url && errors.url}
                        sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
                        data-cy="add-network-field-url"
                    />
                    <TextField
                        fullWidth
                        label="Magellan Address"
                        {...getFieldProps('magellanAddress')}
                        error={Boolean(touched.magellanAddress && errors.magellanAddress)}
                        helperText={touched.magellanAddress && errors.magellanAddress}
                        sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
                        data-cy="add-network-field-magellan-address"
                    />
                    <TextField
                        fullWidth
                        label="Explorer URL"
                        {...getFieldProps('explorerSiteUrl')}
                        error={Boolean(touched.explorerSiteUrl && errors.explorerSiteUrl)}
                        helperText={touched.explorerSiteUrl && errors.explorerSiteUrl}
                        sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
                        data-cy="add-network-field-explorerSiteUrl-address"
                    />
                    <TextField
                        fullWidth
                        label="Signavault Address"
                        {...getFieldProps('signavaultAddress')}
                        error={Boolean(touched.signavaultAddress && errors.signavaultAddress)}
                        helperText={touched.signavaultAddress && errors.signavaultAddress}
                        sx={{ mb: 3, '& fieldset': { borderRadius: '12px' } }}
                    />
                    {error && (
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    )}
                </DialogContent>

                <DialogActions sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 2 }}>
                    <Button
                        disabled={isLoading}
                        variant="outlined"
                        type="submit"
                        data-cy="btn-add-network"
                    >
                        {!edit ? <>Add Network</> : <>Edit Network</>}
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Form>
        </FormikProvider>
    )
}
