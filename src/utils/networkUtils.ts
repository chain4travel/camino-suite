export const networkStatusColor = (status: string) => {
    switch (status) {
        case 'idle':
            return '#64748B'
        case 'loading':
            return '#F19D38'
        case 'succeeded':
            return '#35E9AD'
        case 'failed':
            return '#DD5E56'
        default:
            return '#64748B'
    }
}

export const networkStatusName = (status: string) => {
    switch (status) {
        case 'idle':
            return 'Connecting...'
        case 'loading':
            return 'Connecting...'
        case 'succeeded':
            return 'Connected'
        case 'failed':
            return 'Not connected'
        default:
            return 'Connecting...'
    }
}
