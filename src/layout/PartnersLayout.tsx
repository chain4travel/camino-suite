import { Box, Link, Toolbar, Typography } from '@mui/material'

import { Paper } from '@mui/material'
import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import store from 'wallet/store'
import CMAccount from '../helpers/CMAccountManagerModule#CMAccount.json'
import CMAccountManager from '../helpers/ManagerProxyModule#CMAccountManager.json'
import { PartnerConfigurationProvider } from '../helpers/partnerConfigurationContext'
import { SmartContractProvider, useSmartContract } from '../helpers/useSmartContract'
import { useAppSelector } from '../hooks/reduxHooks'
import { useEffectOnce } from '../hooks/useEffectOnce'
import { useFetchPartnerDataQuery, useIsPartnerQuery } from '../redux/services/partners'
import { getWalletName } from '../redux/slices/app-config'
import { getActiveNetwork } from '../redux/slices/network'
import Links from '../views/settings/Links'

const ClaimProfile = () => {
    const emailAddress = 'foundation@camino.network'
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                height: '100%',
            }}
        >
            <Typography variant="h5">Claim a profile</Typography>
            <Typography variant="body2" textAlign={'center'}>
                To manage and configure your Camino Messenger, you need to claim an account.
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
                Contact the Camino Network Foundation via{' '}
                <Link href={`mailto:${emailAddress}`} target="_blank" rel="noopener noreferrer">
                    email
                </Link>{' '}
                to proceed.
            </Typography>
        </Box>
    )
}

// Function to create a contract instance
function getPartnerContract(address, provider) {
    return new ethers.Contract(address, CMAccount, provider)
}

// Main function to get services from multiple partner contracts
// async function getPartnerServices(partnerAddresses: string[], providerUrl: string) {
//     const provider = new ethers.JsonRpcProvider(providerUrl)
//     for (const address of partnerAddresses) {
//         const contract = getPartnerContract(address, provider)
//         try {
//             const result = await contract.getSupportedServices()
//             console.log(result)
//         } catch (error) {}
//     }
// }

const PartnersLayout = () => {
    const path = window.location.pathname
    const { data, isLoading } = useIsPartnerQuery({
        cChainAddress: store?.state?.activeWallet?.ethAddress
            ? '0x' + store?.state?.activeWallet?.ethAddress
            : '',
    })
    let { partnerID } = useParams()
    const {
        data: partner,
        isFetching,
        error,
    } = useFetchPartnerDataQuery({
        companyName: partnerID,
    })
    const value = useSmartContract()
    const walletName = useAppSelector(getWalletName)
    const navigate = useNavigate()
    useEffect(() => {
        if (
            walletName &&
            path.includes('partners/messenger-configuration') &&
            store.state.activeWallet?.type === 'multisig'
        ) {
            navigate('/')
        }
    }, [walletName])

    async function s() {
        const selectedNetwork = store.getters['Network/selectedNetwork']
        const providerUrl = `${selectedNetwork.protocol}://${selectedNetwork.ip}:${selectedNetwork.port}/ext/bc/C/rpc`
        const provider = new ethers.JsonRpcProvider(providerUrl)
        const managerReadOnlyContract = new ethers.Contract(
            '0xE5B2f76C778D082b07BDd7D51FFe83E3E055B47F',
            CMAccountManager.abi,
            provider,
        )
        const mappings = new Map()
        const CMACCOUNT_ROLE = await managerReadOnlyContract.CMACCOUNT_ROLE()
        const roleMemberCount = await managerReadOnlyContract.getRoleMemberCount(CMACCOUNT_ROLE)

        const promises = []
        for (let i = 0; i < roleMemberCount; i++) {
            promises.push(
                managerReadOnlyContract.getRoleMember(CMACCOUNT_ROLE, i).then(async role => {
                    const creator = await managerReadOnlyContract.getCMAccountCreator(role)
                    return { role, creator }
                }),
            )
        }

        const results = await Promise.all(promises)
        results.forEach(({ role, creator }) => {
            mappings.set(role.toLowerCase(), creator.toLowerCase())
        })
        await getPartnerServices(providerUrl, Object.fromEntries(mappings))
    }
    async function getPartnerServices(providerUrl: string, partnerContractMapping) {
        const provider = new ethers.JsonRpcProvider(providerUrl)

        for (const [contractAddress, partnerAddress] of Object.entries(partnerContractMapping)) {
            const contract = getPartnerContract(contractAddress, provider)
            try {
                const supportedServices = await contract.getSupportedServices()
                console.log(
                    `Partner at ${partnerAddress} (contract: ${contractAddress}) supports:`,
                    supportedServices,
                )
                const wantedServices = await contract.getSupportedServices()
                console.log(
                    `Partner at ${partnerAddress} (contract: ${contractAddress}) supports:`,
                    wantedServices,
                )
            } catch (error) {
                console.error(
                    `Error reading services from ${partnerAddress} (contract: ${contractAddress}):`,
                    error,
                )
            }
        }
    }
    useEffectOnce(() => {
        // s()
    })
    const activeNetwork = useAppSelector(getActiveNetwork)
    if (isLoading) return <></>
    if (
        path.includes('partners/messenger-configuration') &&
        !store.state.isAuth &&
        activeNetwork.name.toLowerCase() !== 'columbus'
    ) {
        return <Navigate to="/login" replace />
    }
    return (
        <SmartContractProvider>
            <PartnerConfigurationProvider>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Toolbar
                        sx={{
                            borderBottom: '1px solid',
                            borderColor: 'rgba(145, 158, 171, 0.24)',
                            background: theme => theme.palette.background.paper,
                            flexGrow: 1,
                            p: '1.5rem',
                            zIndex: 9,
                            position: 'fixed',
                            top: '65px',
                            width: '100vw',
                            height: '61px',
                            display: 'flex',
                            justifyContent: 'center',
                            right: 0,
                        }}
                    >
                        <Links />
                    </Toolbar>
                    {((path.includes('partners/messenger-configuration') && !!data) ||
                        partner?.contractAddress) && (
                        <Toolbar
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'rgba(145, 158, 171, 0.24)',
                                background: theme => theme.palette.background.paper,
                                flexGrow: 1,
                                p: '1.5rem',
                                zIndex: 9,
                                position: 'fixed',
                                top: '129px',
                                width: '100vw',
                                height: '61px',
                                display: 'flex',
                                justifyContent: 'center',
                                right: 0,
                            }}
                        >
                            <Links type="subtabs" partner={partner} />
                        </Toolbar>
                    )}
                    <Box
                        sx={{
                            mt:
                                (path.includes('partners/messenger-configuration') && !!data) ||
                                partner?.contractAddress
                                    ? '9rem'
                                    : '5rem',
                            height: '100%',
                            width: '100%',
                            maxWidth: theme => theme.customWidth.layoutMaxWitdh,
                            mb: '2rem',
                            padding: '32px',
                        }}
                        component={Paper}
                    >
                        {!path.includes('partners/messenger-configuration') ||
                        (path.includes('partners/messenger-configuration') && !!data) ? (
                            <Outlet />
                        ) : (
                            <ClaimProfile />
                        )}
                    </Box>
                </Box>
            </PartnerConfigurationProvider>
        </SmartContractProvider>
    )
}

export default PartnersLayout
