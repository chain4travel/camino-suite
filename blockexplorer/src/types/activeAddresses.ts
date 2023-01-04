export interface ActiveAddreses {
    HighestNumber: number,
    LowestNumber: number,
    ActiveAddresesInfo: ActiveAddresesInfo[]
}

export interface ActiveAddresesInfo {
    Date: string,
    ActiveAddresses: number,
    ReceiveCount: number,
    SendCount: number
}

export default ActiveAddreses;
