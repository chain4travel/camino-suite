import moment from 'moment';
import { TransactionsInfo } from '../../../../types/transaction';

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