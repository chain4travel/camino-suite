import { typesStatistic } from '../../../pages/Statistics/ChartSelector';
import { dailyTransactionsTooltip } from './Tooltips';
import { TransactionsInfo } from '../../../../types/transaction';

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
                let convertData: TransactionsInfo[] = dataChart.TxInfo;
                this.data = convertData;
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
        }
    }

    public getMappedSeries()
    {
        switch (this.typeStatistic) {
            case typesStatistic.DAILY_TRANSACTIONS:
                return this.data.map((value, index) => {
                    return { y: value.TotalTransactions, name: value.Date };
                });
            default:
                break;
        }
    }

}

export default ConfigLinearMeter;

