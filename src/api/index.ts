import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseEndpoint } from '../constants/magellan-api'
import { getBaseUrl } from './apiUtils'

export const getChains = createAsyncThunk('appConfig/chains', async () => {
    const res = await axios.get(`${getBaseUrl()}${baseEndpoint}`)
    return res.data
})
