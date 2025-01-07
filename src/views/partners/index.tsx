import {
    Box,
    CircularProgress,
    Pagination,
    PaginationItem,
    Typography,
    useTheme,
} from '@mui/material'
import React, { ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { fetchBusinessFields, fetchPartners } from '../../redux/slices/partnersSlice/utils'
import { initialStatePartners, partnersReducer } from '../../helpers/partnersReducer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Icon from '@mdi/react'
import ListPartners from './ListPartners'
import MatchingPartners from './MatchingPartners'
import PartnersFilter from '../../components/Partners/PartnersFilter'
import { getActiveNetwork } from '../../redux/slices/network'
import { mdiAccessPointNetwork } from '@mdi/js'
import { selectAllPartners } from '../../redux/slices/partnersSlice'
import { selectFilteredPartners } from '../../redux/selectors/partners'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { useListPartnersQuery } from '../../redux/services/partners'
import { useSmartContract } from '../../helpers/useSmartContract'

interface PartnersListWrapperProps {
    isLoading: boolean
    isFetching: boolean
    children?: ReactNode
}

export const PartnersListWrapper: React.FC<PartnersListWrapperProps> = ({
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
    const auth = useAppSelector(state => state.appConfig.isAuth)
    const [state] = useReducer(partnersReducer, initialStatePartners)
    const { isFetching } = useListPartnersQuery(state)
    const partnersSlice = useAppSelector(selectAllPartners)
    const { isLoading, error, filters } = useAppSelector(state => state.partners)
    const dispatch = useAppDispatch()
    const theme = useTheme()

    useEffectOnce(() => {
        dispatch(fetchPartners())
        dispatch(fetchBusinessFields())
    })

    const filteredPartners = useAppSelector(rootState =>
        selectFilteredPartners(rootState, partnersSlice, filters),
    )

    const value = useSmartContract()
    const [activePage, setActivePage] = useState(0)
    const itemsPerPage = 12

    useEffect(() => {
        setActivePage(0)
    }, [filters, dispatch])

    useEffect(() => {
        if (activeNetwork) dispatch(fetchPartners())
        //@ts-ignore
    }, [activeNetwork, dispatch])

    // Get current partners for pagination
    const currentPartners = useMemo(() => {
        if (!filteredPartners?.data) {
            return []
        }
        const slice = filteredPartners.data.slice(
            activePage * itemsPerPage,
            activePage * itemsPerPage + itemsPerPage,
        )
        return slice
    }, [filteredPartners?.data, activePage])

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setActivePage(page - 1)
    }

    // Show loading state while initial data is being fetched
    if (isLoading) {
        return <PartnersListWrapper isLoading={true} isFetching={false} />
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
            <PartnersFilter />

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
