import React, { useRef } from 'react'
import { mountVersionComponent } from 'wallet/mountVersionComponent'
import { useEffectOnce } from '../../hooks/useEffectOnce'

const WalletVersionComponent = () => {
    const ref = useRef(null)
    useEffectOnce(() => {
        mountVersionComponent(ref.current)
    }) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div ref={ref} />
        </>
    )
}

export default React.memo(WalletVersionComponent)
