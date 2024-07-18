import { useTheme } from '@mui/system'
import React from 'react'
import useNetwork from '../../hooks/useNetwork'
const CaminoNameService = React.lazy(() => import('caminoNameService/cns'))

const NameServiceApp = () => {
    const { activeNetwork } = useNetwork()
    const theme = useTheme()
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <CaminoNameService network={activeNetwork} theme={theme} />
        </React.Suspense>
    )
}

export default NameServiceApp
