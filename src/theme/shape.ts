declare module '@mui/system' {
    interface Shape {
        borderRadiusNone: number | string
        borderRadiusSm: number | string
        borderRadiusMd: number | string
        borderRadiusLg: number | string
        borderRadiusXl: number | string
    }
}

const shape = {
    borderRadiusNone: 0,
    borderRadius: 8,
    borderRadiusSm: 12,
    borderRadiusMd: 16,
    borderRadiusLg: 20,
    borderRadiusXl: 25,
}

export default shape
