import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseEndpoint } from '../constants/magellan-api'
import { getBaseUrl } from './apiUtils'

export const getChains = createAsyncThunk('appConfig/chains', async () => {
    const res = await axios.get(`${getBaseUrl()}${baseEndpoint}`)
    return res.data
})

export async function getMultisigAliases(ownersAddresses: string[]): Promise<string[]> {
    let res = await axios.get(`${getBaseUrl()}/v2/multisigalias/${ownersAddresses.join(',')}`)
    return res.data.alias
}
