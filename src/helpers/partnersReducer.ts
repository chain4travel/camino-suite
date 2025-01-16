import { BusinessFieldCategory } from '../redux/slices/partnersSlice'

export interface BusinessField {
    category: string
    fields: Array<{
        name: string
        active: boolean
        fullName: string
    }>
}

export interface StatePartnersType {
    companyName: string
    businessFields: BusinessField[]
    validators: boolean
    onMessenger: boolean
}

export const initialStatePartners: StatePartnersType = {
    companyName: '',
    businessFields: [],
    validators: false,
    onMessenger: false,
}

export enum partnersActions {
    'UPDATE_COMPANY_NAME',
    'UPDATE_BUSINESS_FIELD',
    'TOGGLE_CATEGORY',
    'TOGGLE_VALIDATORS',
    'TOGGLE_ON_MESSENGER',
    'UPDATE_BUSINESS_FIELDS_FROM_API',
    'RESET_ALL_BUSINESS_FIELDS',
}

export interface ActionType {
    type: partnersActions
    payload?: any
}

export const partnersReducer = (
    state: StatePartnersType,
    action: ActionType,
): StatePartnersType => {
    switch (action.type) {
        case partnersActions.UPDATE_COMPANY_NAME:
            return {
                ...state,
                companyName: action.payload,
            }
        case partnersActions.UPDATE_BUSINESS_FIELD:
            const newBusinessField = state.businessFields.map(field => {
                const fieldIndex = field.fields.findIndex(
                    filter => filter.fullName === action.payload,
                )

                if (fieldIndex !== -1) {
                    const updatedFields = field.fields.map((filter, i) => {
                        if (i === fieldIndex) {
                            return { ...filter, active: !filter.active }
                        }
                        return filter
                    })

                    return { ...field, fields: updatedFields }
                }

                return field
            })

            return {
                ...state,
                businessFields: newBusinessField,
            }
        case partnersActions.TOGGLE_CATEGORY:
            const updatedBusinessField = state.businessFields.map(group => {
                if (group.category === action.payload) {
                    const isAllSelected = group.fields.every(field => field.active)
                    const updatedFields = group.fields.map(field => ({
                        ...field,
                        active: !isAllSelected,
                    }))
                    return { ...group, fields: updatedFields }
                }
                return group
            })

            return {
                ...state,
                businessFields: updatedBusinessField,
            }

        case partnersActions.TOGGLE_VALIDATORS:
            return {
                ...state,
                validators: !state.validators,
            }
        case partnersActions.TOGGLE_ON_MESSENGER:
            return {
                ...state,
                onMessenger: !state.onMessenger,
            }
        case partnersActions.UPDATE_BUSINESS_FIELDS_FROM_API:
            return {
                ...state,
                businessFields: action.payload,
            }
        case partnersActions.RESET_ALL_BUSINESS_FIELDS:
            return {
                ...state,
                businessFields: state.businessFields.map(group => ({
                    ...group,
                    fields: group.fields.map(field => ({
                        ...field,
                        active: false,
                    })),
                })),
            }
        default:
            return state
    }
}

export const handleBusinessFieldToggle = (
    businessFields: BusinessFieldCategory[],
    selectedField: string,
) => {
    const newBusinessField = businessFields.map(field => {
        const fieldIndex = field.fields.findIndex(filter => filter.fullName === selectedField)
        if (fieldIndex !== -1) {
            const updatedFields = field.fields.map((filter, i) => {
                if (i === fieldIndex) {
                    return { ...filter, active: !filter.active }
                }
                return filter
            })
            return { ...field, fields: updatedFields }
        }
        return field
    })

    return newBusinessField
}

export const handleCategoryToggleHelper = (
    businessFields: BusinessFieldCategory[],
    category: string,
) => {
    const updatedBusinessField = businessFields.map(group => {
        if (group.category === category) {
            const isAllSelected = group.fields.every(field => field.active)
            const updatedFields = group.fields.map(field => ({
                ...field,
                active: !isAllSelected,
            }))
            return { ...group, fields: updatedFields }
        }
        return group
    })

    return updatedBusinessField
}

export const handleResetAllFields = (businessFields: BusinessFieldCategory[]) => {
    return businessFields.map(group => ({
        ...group,
        fields: group.fields.map(field => ({ ...field, active: false })),
    }))
}
