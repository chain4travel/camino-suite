import { typesStatistic } from '../../../pages/Statistics/ChartSelector';
import { dailyTransactionsTooltip, uniqueAddressesDailyIncreaseTooltip } from './Tooltips';
import { TransactionsInfo } from '../../../../types/transaction';
import { AddressInfo, DailyTransactions } from '../../../../types/uniqueAddresses';

class ConfigLinearMeter {

    title: string;
    categories: any[];
    typeStatistic: string;
    data: any[];

    constructor(typeStatistic: string, title: string, dataChart: any) {
        this.typeStatistic = typeStatistic;
        this.title = title;


        switch (this.typeStatistic) {
            case typesStatistic.DAILY_TRANSACTIONS:
                this.data = dataChart.TxInfo;
                break;
            case typesStatistic.UNIQUE_ADRESSES:
                this.data = dataChart.AddressInfo;
                break;
            default:
                this.data = [];
                break;
        }

        this.categories = this.getCategories();
    }

    public getCategories() {
        return this.data.map((value, index) => value.Date)
    }

    public getTooltip(index) {
        switch (this.typeStatistic) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return dailyTransactionsTooltip(this.data[index]);
            case typesStatistic.UNIQUE_ADRESSES:
                return uniqueAddressesDailyIncreaseTooltip(this.data[index]);
        }
    }

    public getMappedSeries() {
        switch (this.typeStatistic) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return this.data.map((value, index) => {
                    return { y: value.TotalTransactions, name: value.Date };
                });
            case typesStatistic.UNIQUE_ADRESSES:
                return this.data.map((value, index) => {
                    return { y: value.DailyIncrease, name: value.Date };
                });
            default:
                break;
        }
    }

}

export default ConfigLinearMeter;

