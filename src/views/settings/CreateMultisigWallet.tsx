import React, { useEffect, useRef } from 'react'
import { mountCreateMultisigWallet } from 'wallet/mountCreateMultisigWallet'

const LoadCreateMultisigWallet = () => {
    const ref = useRef(null)
    useEffect(() => {
        mountCreateMultisigWallet(ref.current)
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div ref={ref} />
        </div>
    )
}

export default function CreateMultisigWallet() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadCreateMultisigWallet />
        </React.Suspense>
    )
}
