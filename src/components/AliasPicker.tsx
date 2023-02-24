import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { getSelectedAlias, updateSelectedAlias } from '../redux/slices/app-config'
import LoadAccountMenu from './LoadAccountMenu'

const AliasPicker = () => {
    const selectedAlias = useAppSelector(getSelectedAlias)
    const dispatch = useAppDispatch()
    const updateAlias = (arg: string) => dispatch(updateSelectedAlias(arg))
    return (
        <>
            <LoadAccountMenu
                type="alias"
                selectedAlias={selectedAlias}
                updateAlias={updateAlias}
            ></LoadAccountMenu>
        </>
    )
}

export default React.memo(AliasPicker)
