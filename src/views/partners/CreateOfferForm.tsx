import React, { useEffect, useRef } from 'react'
import { mountCreateOfferForm } from 'wallet/mountCreateOfferForm'

const LoadCreateOfferForm = () => {
    const ref = useRef(null)
    useEffect(() => {
        mountCreateOfferForm(ref.current, { isSuite: true })
    }, [])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '32px',
                paddingLeft: '0',
                marginTop: '2.5rem',
                maxWidth: '1536px',
            }}
        >
            <div ref={ref} />
        </div>
    )
}

export default function CreateOfferForm() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoadCreateOfferForm />
        </React.Suspense>
    )
}
