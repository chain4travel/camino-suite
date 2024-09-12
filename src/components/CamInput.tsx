import Big from 'big.js'
import BN from 'bn.js'
import React, { useCallback, useEffect, useState } from 'react'

Big.PE = 32

function bnToBig(val, denomination) {
    return new Big(val.toString()).div(Math.pow(10, denomination))
}

function bigToBN(val, denomination) {
    return new BN(val.mul(Math.pow(10, denomination)).toString())
}

const DecimalInput = ({
    denomination = 0,
    max = null,
    min = 0,
    step = null,
    placeholder,
    value,
    initial = null,
    onChange,
}) => {
    const [val, setVal] = useState(bnToString(initial))

    const bnToString = useCallback(
        val => {
            return val ? bnToBig(val, denomination).toString() : null
        },
        [denomination],
    )

    const stringToBN = useCallback(
        strVal => {
            return bigToBN(new Big(strVal), denomination)
        },
        [denomination],
    )

    const maxNumBN = max
    const maxNumString = bnToString(maxNumBN)

    const stepNum = (() => {
        if (!step) {
            if (denomination >= 2) {
                return 0.01
            } else {
                return Math.pow(10, -denomination)
            }
        }
        try {
            return bnToString(step)
        } catch (e) {
            console.error(e)
            return '0.01'
        }
    })()

    useEffect(() => {
        if (!val) {
            onChange(new BN(0))
            return
        }
        try {
            let splitVal = val.toString().split('.')
            let wholeVal = splitVal[0]
            let denomVal = splitVal[1]
            if (denomVal) {
                if (denomVal.length > denomination) {
                    let newDenom = denomVal.substring(0, denomination)
                    setVal(`${wholeVal}.${newDenom}`)
                    return
                }
            }
        } catch (e) {
            console.log(e)
        }
        if (parseFloat(val) < min) {
            setVal(min.toString())
            return
        }
        let valBn = stringToBN(val)
        onChange(valBn)
    }, [val, denomination, min, onChange, stringToBN])

    useEffect(() => {
        setVal(bnToString(value))
    }, [value, bnToString])

    const handleChange = e => {
        setVal(e.target.value)
    }

    const handleBlur = () => {
        // If number is above max amount, correct it
        const valBig = Big(val || '0')
        const valBN = bigToBN(valBig, denomination)
        if (maxNumBN != null) {
            if (valBN.gt(maxNumBN)) {
                setVal(bnToString(maxNumBN))
            }
        }
    }

    const maxout = () => {
        if (maxNumBN != null) {
            setVal(bnToString(maxNumBN))
        }
    }

    const clear = () => {
        setVal(undefined)
    }

    return (
        <input
            type="number"
            inputMode="decimal"
            placeholder={placeholder}
            value={val}
            min={min}
            max={maxNumString}
            step={stepNum}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
                textAlign: 'right',
                outline: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
            }}
        />
    )
}

export default DecimalInput
