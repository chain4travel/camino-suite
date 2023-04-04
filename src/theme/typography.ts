function pxToRem(value: number) {
    return `${value / 16}rem`
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    }
}

const FONT = 'Inter'

const typography = {
    fontFamily: FONT,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
        fontFamily: FONT,
        fontStyle: 'normal',
        fontSize: pxToRem(64),
        lineHeight: '83px',
        letterSpacing: '-2.2%',
        fontWeight: '700',
        ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
        fontFamily: FONT,
        fontStyle: 'normal',
        fontSize: pxToRem(48),
        lineHeight: '62px',
        letterSpacing: '-2.2%',
        fontWeight: '700',
        ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
        fontFamily: FONT,
        fontStyle: 'normal',
        fontSize: pxToRem(40),
        lineHeight: '52px',
        letterSpacing: '-1.1%',
        fontWeight: '700',
        ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
        fontFamily: FONT,
        fontStyle: 'normal',
        fontSize: pxToRem(32),
        lineHeight: '42px',
        letterSpacing: '-1.1%',
        fontWeight: '700',
        ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
        fontFamily: FONT,
        fontStyle: 'normal',
        fontSize: pxToRem(24),
        lineHeight: '36px',
        letterSpacing: '-1.1%',
        fontWeight: '700',
        ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
        fontFamily: FONT,
        fontStyle: 'normal',
        fontSize: pxToRem(20),
        lineHeight: '26px',
        letterSpacing: '-1.1%',
        fontWeight: '700',
        ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    subtitle1: {
        fontFamily: FONT,
        fontWeight: 500,
        lineHeight: '36px',
        letterSpacing: '-2.2%',
        fontSize: pxToRem(24),
    },
    subtitle2: {
        fontFamily: FONT,
        fontWeight: 500,
        lineHeight: '30px',
        letterSpacing: '-1.1%',
        fontSize: pxToRem(20),
    },
    body1: {
        fontFamily: FONT,
        lineHeight: '28px',
        letterSpacing: '-1.1%',
        fontWeight: 500,
        fontSize: pxToRem(18),
    },
    body2: {
        fontFamily: FONT,
        lineHeight: '24px',
        fontWeight: 500,
        fontSize: pxToRem(16),
        letterSpacing: '-1.1%',
    },
    caption: {
        fontFamily: FONT,
        lineHeight: '20px',
        fontWeight: 500,
        fontSize: pxToRem(14),
        letterSpacing: '-1.1%',
    },
    overline: {
        fontFamily: FONT,
        fontWeight: 700,
        lineHeight: '18px',
        fontSize: pxToRem(12),
        letterSpacing: '-1.1%',
        textTransform: 'uppercase',
    },
    button: {
        fontFamily: FONT,
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize',
    },
} as const

export default typography
