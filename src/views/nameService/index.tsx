import React from 'react'
// const NameService = React.lazy(() => import('caminoNameService/button'))
import NameService from 'caminoNameService/button'

const NameServiceApp = () => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <NameService />
        </React.Suspense>
    )
}

export default NameServiceApp
