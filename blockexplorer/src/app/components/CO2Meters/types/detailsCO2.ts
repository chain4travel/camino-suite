export interface DetailsCO2 {
    chain?: string;
    time: string;
    value: number;
}

export interface ChainCO2Details {
    name: string, //Example: Network Emissions Camino or Daily Emisions
    data: DetailsCO2[]
}