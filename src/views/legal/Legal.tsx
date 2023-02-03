import React, { useEffect, useRef } from 'react'
import { mountLegal } from 'wallet/mountLegal'

const LoadLegal = () => {
    const ref = useRef(null)
    useEffect(() => {
        mountLegal(ref.current)
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

export default function Legal() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadLegal />
        </React.Suspense>
    )
}
