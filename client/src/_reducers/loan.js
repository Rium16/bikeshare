import { userConstants } from '../_constants/userConstants';

export default function loan(state={}, action) {
    switch(action.type) {
        case userConstants.LOAN_REQUEST:
            return {
                loaning: true
            }
        case userConstants.LOAN_SUCCESS:
            console.log("here");
            return {
                loan: action.loan
            }
        case userConstants.LOAN_FAILURE:
            return {}
        default:
            return state
    }
}