import { Box, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import store from 'wallet/store'
import PartnerCard from '../../components/Partners/PartnerCard'
import { usePartnerConfigurationContext } from '../../helpers/partnerConfigurationContext'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useIsPartnerQuery, useListMatchingPartnersQuery } from '../../redux/services/partners'
import { getActiveNetwork } from '../../redux/slices/network'

const MatchingPartners = ({ state }) => {
    const value = usePartnerConfigurationContext()
    const {
        data: partners,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useListMatchingPartnersQuery({
        ...state,
        supportedResult: value?.state?.stepsConfig[1]?.services,
        wantedResult: value?.state?.stepsConfig[2]?.services,
    })
    const { data, refetch: refetchIsPartner } = useIsPartnerQuery({
        cChainAddress: store?.state?.activeWallet?.ethAddress
            ? '0x' + store?.state?.activeWallet?.ethAddress
            : '',
    })
    const activeNetwork = useAppSelector(getActiveNetwork)
    const sc = useSmartContract()
    const matchingPartnersFiltred = useMemo(() => {
        return partners?.data
            ? partners?.data?.filter(elem => {
                  let address = elem?.attributes?.cChainAddresses.find(
                      elem => elem.Network.toLowerCase() === activeNetwork?.name?.toLowerCase(),
                  )?.cAddress
                  if (address !== sc?.wallet?.address) return true
                  return false
              })
            : []
    }, [partners])
    const partnerCChainAddress = useMemo(() => {
        let cAddress = data?.attributes?.cChainAddresses.find(
            elem => elem.Network === activeNetwork?.name?.toLowerCase(),
        )
        if (cAddress) return cAddress
        return ''
    }, [data])
    useEffect(() => {
        if (activeNetwork) {
            refetch()
            refetchIsPartner()
        }
    }, [activeNetwork])
    const navigate = useNavigate()
    if (
        isLoading ||
        isFetching ||
        error ||
        !matchingPartnersFiltred ||
        matchingPartnersFiltred?.length === 0 ||
        !partnerCChainAddress
    )
        return <></>
    return (
        <>
            <Typography variant="h5">Matching Partners</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    maxWidth: theme => theme.customWidth.layoutMaxWitdh,
                }}
            >
                {matchingPartnersFiltred &&
                    matchingPartnersFiltred.map((partner, index) => (
                        <PartnerCard
                            onClick={() => {
                                navigate(partner.attributes.companyName)
                            }}
                            partner={partner}
                            key={partner.attributes.companyName}
                            clickable={true}
                            index={index}
                        />
                    ))}
            </Box>
        </>
    )
}

export default MatchingPartners
