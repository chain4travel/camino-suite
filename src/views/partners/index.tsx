import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, CircularProgress, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { ReactNode, useReducer, useState } from 'react'
import { PartnerDataType } from '../../@types/partners'
import PartnersFilter from '../../components/Partners/PartnersFilter'
import {
    initialStatePartners,
    partnersActions,
    partnersReducer,
} from '../../helpers/partnersReducer'
import { useListPartnersQuery } from '../../redux/services/partners'
import ListPartners from './ListPartners'
import Partner from './Partner'

interface PartnersListWrapperProps {
    isLoading: boolean
    isFetching: boolean
    children?: ReactNode
}

const PartnersListWrraper: React.FC<PartnersListWrapperProps> = ({
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
    const [partner, setPartner] = useState<PartnerDataType | null>(null)

    if (!partners?.data) {
        return <PartnersListWrraper isLoading={isLoading} isFetching={isFetching} />
    }
    const content = partner ? (
        <Partner partner={partner} setPartner={setPartner} />
    ) : (
        <>
            <PartnersFilter state={state} dispatchPartnersActions={dispatchPartnersActions} />
            <Typography variant="h5">{partners.meta.pagination.total} Partners</Typography>
            <PartnersListWrraper isLoading={isLoading} isFetching={isFetching}>
                <ListPartners partners={partners} setPartner={setPartner} />
            </PartnersListWrraper>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: '2rem' }}>
                <Pagination
                    page={state.page}
                    onChange={handleChange}
                    count={partners.meta.pagination.pageCount}
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
                mt: '5rem',
                gap: '1rem',
                height: '100%',
                width: '100%',
                maxWidth: theme => theme.customWidth.layoutMaxWitdh,
            }}
        >
            {content}
        </Box>
    )
}

export default Partners
