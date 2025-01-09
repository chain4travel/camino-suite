import { InputAdornment, TextField } from '@mui/material'

import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface SearchInputProps {
    searchByName: (value: string) => void
    value: string
}

const SearchInput: React.FC<SearchInputProps> = ({ searchByName, value }) => {
    return (
        <TextField
            placeholder="Search by company name"
            value={value}
            onChange={e => searchByName(e.target.value)}
            sx={{
                minWidth: '300px',
                '& .MuiOutlinedInput-root': {
                    height: '40px',
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default React.memo(SearchInput)
