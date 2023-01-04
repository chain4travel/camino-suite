import moment from 'moment';
import { TransactionsInfo } from '../../../../types/transaction';
import { AddressInfo } from '../../../../types/uniqueAddresses';
import {DailyTokenTransfer} from '../../../../types/dailyTokenTransfer';
import {GasUsed} from '../../../../types/gasUsed';

//Transactions
export const dailyTransactionsTooltip = (data: TransactionsInfo) => {
    const header = `<span>
        ${moment(new Date(data.Date)).format("MMMM Do YYYY")}
        <br/>
        [<label style="color: blue">Total Transactions:</label> <b>${data.TotalTransactions}</b>]
        <br/>
        <br/>

        -<b>Avg Block Time:</b>${data.AvgBlockTime} TH<br/>
        -<b>Avg Block Size:</b>${data.AvgBlockSize} GH<br/>
        -<b>Total Block Count:</b>${data.TotalBlockCount} <br/>
        -<b>Total Uncles Count:</b>${data.TotalUnclesCount} <br/>
        -<b>New Adress Seen:</b>${data.NewAddressSeen}
        
        </span><br/>`;
    return header;
}

//Unique Addresses
export const uniqueAddressesDailyIncreaseTooltip = (data: AddressInfo) => {
    const header = `<span>
        ${moment(new Date(data.Date)).format("MMMM Do YYYY")}
        <br/>
        [<label style="color: blue">Total Disctinct Addresses:</label> <b>${data.TotalDistinctAddresses}</b>]
        <br/>
        <br/>
        -<b>Daily Increase:</b>${data.DailyIncrease}<br/>
        </span>`;
    return header;
}

//Daily Token Transfer
export const dailyTokenTransferTooltip = (data: DailyTokenTransfer) => {
    const header = `<span>
    ${moment(new Date(data.Date)).format("MMMM Do YYYY")}
        <br/>
        [<label style="color: blue">Total Token Transfer:</label> <b>${data.TotalTokenTransfer}</b>]
        </span>`;
    return header;
}

//Gas Used
export const gasUsedTooltip = (data: GasUsed) => {
    const header = `<span>
    ${moment(new Date(data.Date)).format("MMMM Do YYYY")}
        <br/>
        [<label style="color: blue">Total Gas Used:</label> <b>${data.TotalGasUsed}</b>]
        </span>`;
    return header;
}