import { Typography } from '@mui/material'
import React from 'react'
import { displayFirstPartLongString, displaySecondPartLongString } from '../utils/display-utils'
const LongString = ({ value }) => {
    const content =
        value && value.length < 12 ? (
            <Typography>{value}</Typography>
        ) : (
            <Typography>
                {displayFirstPartLongString(value)}&hellip;
                {displaySecondPartLongString(value)}
            </Typography>
        )
    return <>{content}</>
}
export default LongString
