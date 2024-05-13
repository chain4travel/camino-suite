import {
    Box,
    CircularProgress,
    Pagination,
    PaginationItem,
    Typography,
    useTheme,
} from '@mui/material'
import React, { ReactNode, useReducer } from 'react'
import {
    initialStatePartners,
    partnersActions,
    partnersReducer,
} from '../../helpers/partnersReducer'

import { mdiAccessPointNetwork } from '@mdi/js'
import Icon from '@mdi/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PartnersFilter from '../../components/Partners/PartnersFilter'
import { useListPartnersQuery } from '../../redux/services/partners'
import ListPartners from './ListPartners'

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
    const [state, dispatchPartnersActions] = useReducer(partnersReducer, initialStatePartners)
    const { data: partners, isLoading, isFetching, error } = useListPartnersQuery(state)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatchPartnersActions({ type: partnersActions.NEXT_PAGE, payload: value })
    }
    const theme = useTheme()
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
    if (!partners?.data) {
        return <PartnersListWrapper isLoading={isLoading} isFetching={isFetching} />
    }

    const content = (
        <>
            <PartnersFilter state={state} dispatchPartnersActions={dispatchPartnersActions} />
            <Typography variant="h5">{partners.meta.pagination.total} Partners</Typography>
            <PartnersListWrapper isLoading={isLoading} isFetching={isFetching}>
                <ListPartners partners={partners} />
            </PartnersListWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: '2rem' }}>
                <Pagination
                    page={state.page}
                    onChange={handleChange}
                    count={partners.meta.pagination.pageCount}
                    siblingCount={0}
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
