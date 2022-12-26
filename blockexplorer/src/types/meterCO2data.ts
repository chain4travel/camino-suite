export interface DetailsCO2 {
    chain: string;
    time: string;
    value: number;
}

export interface MeterCO2Data {
    Name: string, //Example: Network Emissions Camino or Daily Emisions
    Value: DetailsCO2[]
}

export default MeterCO2Data;
