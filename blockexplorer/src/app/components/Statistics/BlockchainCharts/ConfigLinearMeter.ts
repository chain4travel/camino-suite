import { typesStatistic } from '../../../pages/Statistics/ChartSelector';
import {
  dailyTransactionsTooltip,
  uniqueAddressesDailyIncreaseTooltip,
  dailyTokenTransferTooltip,
  gasUsedTooltip,
  activeAddressesTooltip,
  averageGasPriceTooltip,
} from './Tooltips';

class ConfigLinearMeter {
  title: string;
  categories: any[] = [];
  typeStatistic: string;
  data: any[] = [];

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
      case typesStatistic.DAILY_TOKEN_TRANSFER:
        this.data = dataChart;
        break;
      case typesStatistic.GAS_USED:
        this.data = dataChart;
        break;
      case typesStatistic.ACTIVE_ADDRESSES:
        this.data = dataChart.ActiveAddresesInfo;
        break;
      case typesStatistic.GAS_AVERAGE_PRICE:
        this.data = dataChart;
        break;
    }
  }

  public getCategories() {
    return this.data.map((value, index) => value.Date);
  }

  public getTooltip(index) {
    switch (this.typeStatistic) {
      case typesStatistic.DAILY_TRANSACTIONS:
        return dailyTransactionsTooltip(this.data[index]);
      case typesStatistic.UNIQUE_ADRESSES:
        return uniqueAddressesDailyIncreaseTooltip(this.data[index]);
      case typesStatistic.DAILY_TOKEN_TRANSFER:
        return dailyTokenTransferTooltip(this.data[index]);
      case typesStatistic.GAS_USED:
        return gasUsedTooltip(this.data[index]);
      case typesStatistic.ACTIVE_ADDRESSES:
        return activeAddressesTooltip(this.data[index]);
      case typesStatistic.GAS_AVERAGE_PRICE:
        return averageGasPriceTooltip(this.data[index]);
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
      case typesStatistic.DAILY_TOKEN_TRANSFER:
        return this.data.map((value, index) => {
          return { y: value.TotalTokenTransfer, name: value.Date };
        });

      case typesStatistic.GAS_USED:
        return this.data.map((value, index) => {
          return { y: value.TotalGasUsed, name: value.Date };
        });

      case typesStatistic.ACTIVE_ADDRESSES:
        return this.data.map((value, index) => {
          console.log('valueAddresses', value);
          return { y: value.ActiveAddresses, name: value.Date };
        });

      case typesStatistic.GAS_AVERAGE_PRICE:
        return this.data.map((value, index) => {
          console.log('valueAddresses', value);
          return { y: value.AverageGasPrice, name: value.Date };
        });
    }
  }
}

export default ConfigLinearMeter;
