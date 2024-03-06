import { BUSINESS_FIELDS } from '../constants/apps-consts'

export interface BusinessField {
    name: string
    active: boolean
}

export interface StatePartnersType {
    page: number
    companyName: string
    businessField: BusinessField[]
    validators: boolean
}

export const initialStatePartners: StatePartnersType = {
    page: 1,
    companyName: '',
    businessField: BUSINESS_FIELDS.map(elem => {
        return { name: elem, active: false }
    }),
    validators: false,
}

export enum partnersActions {
    'NEXT_PAGE',
    'UPDATE_COMPANY_NAME',
    'UPDATE_BUSINESS_FIELD',
    'TOGGLE_VALIDATORS',
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
            let newBusinessField = [...state.businessField]
            let index = newBusinessField.findIndex(elem => elem.name === action.payload)
            newBusinessField[index] = {
                ...newBusinessField[index],
                active: !newBusinessField[index].active,
            }
            return {
                ...state,
                page: 1,
                businessField: newBusinessField,
            }
        case partnersActions.TOGGLE_VALIDATORS:
            return {
                ...state,
                page: 1,
                validators: !state.validators,
            }
        default:
            return state
    }
}
