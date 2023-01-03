export type AddressInfo = {
    Date: string,
    TotalDistinctAddresses: number;
    DailyIncrease: number;
}

export type DailyTransactions = {
    HighestValue: number;
    HighestDate: string;
    LowerValue: number;
    LowerDate: string;
    AddressInfo: AddressInfo[]
};