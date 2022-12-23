export interface DetailsCO2 {
    chain: string;
    time: string;
    value: number;
}

export interface MeterCO2Data {
    name: string, //Example: Network Emissions Camino or Daily Emisions
    data: DetailsCO2[]
}

export default MeterCO2Data;
