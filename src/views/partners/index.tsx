import { Box, CircularProgress, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { ReactNode, useReducer } from 'react'
import {
    initialStatePartners,
    partnersActions,
    partnersReducer,
} from '../../helpers/partnersReducer'

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
    const { data: partners, isLoading, isFetching } = useListPartnersQuery(state)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatchPartnersActions({ type: partnersActions.NEXT_PAGE, payload: value })
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
