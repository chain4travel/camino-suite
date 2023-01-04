export type AddressInfo = {
    Date: string,
    TotalDistinctAddresses: number;
    DailyIncrease: number;
}

export type UniqueAdressesInfo = {
    HighestValue: number;
    HighestDate: string;
    LowerValue: number;
    LowerDate: string;
    AddressInfo: AddressInfo[]
};