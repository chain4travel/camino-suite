export interface BusinessField {
    category: string
    fields: Array<{
        name: string
        active: boolean
        fullName: string
    }>
}

export interface StatePartnersType {
    page: number
    companyName: string
    businessField: BusinessField[]
    validators: boolean
    onMessenger: boolean
}

export const initialStatePartners: StatePartnersType = {
    page: 1,
    companyName: '',
    businessField: [],
    validators: false,
    onMessenger: false,
}

export enum partnersActions {
    'NEXT_PAGE',
    'UPDATE_COMPANY_NAME',
    'UPDATE_BUSINESS_FIELD',
    'TOGGLE_CATEGORY',
    'TOGGLE_VALIDATORS',
    'TOGGLE_ON_MESSENGER',
    'UPDATE_BUSINESS_FIELDS_FROM_API',

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
        case partnersActions.NEXT_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        case partnersActions.UPDATE_COMPANY_NAME:
            return {
                ...state,
                page: 1,
                companyName: action.payload,
            }
        case partnersActions.UPDATE_BUSINESS_FIELD:
            const newBusinessField = state.businessField.map(field => {
                // Check if the field contains the target filter
                const fieldIndex = field.fields.findIndex(
                    filter => filter.fullName === action.payload,
                )

                if (fieldIndex !== -1) {
                    // Create a new fields array with the updated filter
                    const updatedFields = field.fields.map((filter, i) => {
                        if (i === fieldIndex) {
                            // Return a new filter object with the toggled `active` property
                            return { ...filter, active: !filter.active }
                        }
                        return filter
                    })

                    // Return a new field object with the updated fields array
                    return { ...field, fields: updatedFields }
                }

                // Return the field as-is if it doesn't contain the target filter
                return field
            })

            return {
                ...state,
                page: 1,
                businessField: newBusinessField,
            }
        case partnersActions.TOGGLE_CATEGORY:
            const updatedBusinessField = state.businessField.map(group => {
                if (group.category === action.payload) {
                    const updatedFields = group.fields.map(field => ({
                        ...field,
                        active: !field.active,
                    }))
                    return { ...group, fields: updatedFields }
                }
                return group
            })

            return {
                ...state,
                page: 1,
                businessField: updatedBusinessField,
            }

        case partnersActions.TOGGLE_VALIDATORS:
            return {
                ...state,
                page: 1,
                validators: !state.validators,
            }
        case partnersActions.TOGGLE_ON_MESSENGER:
            return {
                ...state,
                page: 1,
                onMessenger: !state.onMessenger,
            }
        case partnersActions.UPDATE_BUSINESS_FIELDS_FROM_API:
            return {
                ...state,
                businessField: action.payload,
            }

        default:
            return state
    }
}
