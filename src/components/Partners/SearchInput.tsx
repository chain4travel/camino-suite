import { Box, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useCallback } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { debounce } from 'lodash'

const SearchInput = ({ searchByName }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearchByName = useCallback(
        debounce(searchByName, 300),
        [], // will only create this function once on mount
    )
    return (
        <Box
            sx={{
                flex: '1 1 452px',
                height: '40px',
                maxWidth: '452px',
            }}
        >
            <OutlinedInput
                placeholder="Search"
                sx={{
                    width: '100%',
                    height: '100%',
                    p: '8px 16px',
                    border: theme => `solid 2px ${theme.palette.card.border}`,
                    borderRadius: '12px',
                    fontSize: '15px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    // backgroundColor: '#475569',
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                onChange={e => debouncedSearchByName(e.target.value)}
            />
        </Box>
    )
}

export default SearchInput
