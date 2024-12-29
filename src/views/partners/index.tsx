import {
    Box,
    CircularProgress,
    Pagination,
    PaginationItem,
    Typography,
    useTheme,
} from '@mui/material'
import React, { ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import {
    initialStatePartners,
    partnersActions,
    partnersReducer,
} from '../../helpers/partnersReducer'
import { useGetBusinessFieldsQuery, useListPartnersQuery } from '../../redux/services/partners'

import { mdiAccessPointNetwork } from '@mdi/js'
import Icon from '@mdi/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PartnersFilter from '../../components/Partners/PartnersFilter'
import { useSmartContract } from '../../helpers/useSmartContract'
import { useAppSelector } from '../../hooks/reduxHooks'
import { selectFilteredPartners } from '../../redux/selectors/partners'
import { getActiveNetwork } from '../../redux/slices/network'
import ListPartners from './ListPartners'
import MatchingPartners from './MatchingPartners'

interface PartnersListWrapperProps {
    isLoading: boolean
    isFetching: boolean
    children?: ReactNode
}

const PartnersListWrapper: React.FC<PartnersListWrapperProps> = ({
    isLoading,
    isFetching,
    children,
}) => {
    if (isLoading || isFetching)
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '1093px',
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        )
    return <>{children}</>
}

const Partners = () => {
    const activeNetwork = useAppSelector(getActiveNetwork)
    const { data: bsFeilds } = useGetBusinessFieldsQuery()
    const [state, dispatchPartnersActions] = useReducer(partnersReducer, initialStatePartners)
    const { data: partners, isLoading, isFetching, refetch, error } = useListPartnersQuery()
    console.log('Raw partners from query:', partners)

    const filteredPartners = useAppSelector(rootState =>
        selectFilteredPartners(rootState, partners, state),
    )
    console.log('Filtered partners:', filteredPartners)

    const value = useSmartContract()
    const [activePage, setActivePage] = useState(0)
    const itemsPerPage = 12

    useEffect(() => {
        setActivePage(0)
    }, [state.companyName, state.businessField, state.validators, state.onMessenger])

    useEffect(() => {
        if (activeNetwork) refetch()
    }, [activeNetwork, refetch])

    useEffect(() => {
        if (bsFeilds) {
            dispatchPartnersActions({
                type: partnersActions.UPDATE_BUSINESS_FIELDS_FROM_API,
                payload: bsFeilds,
            })
        }
    }, [bsFeilds])

    // Get current partners for pagination
    const currentPartners = useMemo(() => {
        console.log('Calculating current partners slice')
        if (!filteredPartners?.data) {
            console.log('No filtered partners data')
            return []
        }
        const slice = filteredPartners.data.slice(
            activePage * itemsPerPage,
            activePage * itemsPerPage + itemsPerPage,
        )
        console.log('Current partners slice:', slice)
        return slice
    }, [filteredPartners?.data, activePage])

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setActivePage(page - 1)
    }

    const theme = useTheme()
    const auth = useAppSelector(state => state.appConfig.isAuth)

    // Show loading state while initial data is being fetched
    if (isLoading) {
        return <PartnersListWrapper isLoading={true} isFetching={false} />
    }

    // Show loading state while data is being refetched
    if (isFetching) {
        return <PartnersListWrapper isLoading={false} isFetching={true} />
    }

    // Show error state
    if (error) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    justifyContent: 'center',
                }}
            >
                <Icon path={mdiAccessPointNetwork} size={3} color={theme.palette.grey[400]} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        alignItems: 'center',
                        maxWidth: '450px',
                    }}
                >
                    <Typography variant="h6">Something went wrong</Typography>
                    <Typography variant="caption" align="center" color={theme.palette.grey[300]}>
                        We have encountered an unexpected issue with our current system.
                    </Typography>
                </Box>
            </Box>
        )
    }

    // Show loading state if we don't have filtered partners yet
    if (!filteredPartners) {
        return <PartnersListWrapper isLoading={true} isFetching={false} />
    }

    const content = (
        <>
            <PartnersFilter state={state} dispatchPartnersActions={dispatchPartnersActions} />

            {auth && value?.contractCMAccountAddress && (
                <>
                    <MatchingPartners state={state} />
                </>
            )}
            <Typography variant="h5">{filteredPartners?.data?.length || 0} Partners</Typography>
            <PartnersListWrapper isLoading={isLoading} isFetching={isFetching}>
                <ListPartners
                    partners={
                        filteredPartners ? { ...filteredPartners, data: currentPartners } : null
                    }
                />
            </PartnersListWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: '2rem' }}>
                <Pagination
                    count={Math.ceil(filteredPartners.data.length / itemsPerPage)}
                    page={activePage + 1}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    shape="rounded"
                    variant="outlined"
                    color="primary"
                    renderItem={item => (
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
            </Box>
        </>
    )

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            {content}
        </Box>
    )
}

export default Partners
