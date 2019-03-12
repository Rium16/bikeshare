import { userConstants } from '../_constants/userConstants';

export default function reservation(state = {}, action) {
    switch(action.type) {
        case userConstants.LOCK_REQUEST:
            return {
                locking: true,
            }
        case userConstants.LOCK_SUCCESS:
            return {
                locked: true,
                reservation: action.reservation
            }
        case userConstants.LOCK_FAILURE:
            return {}
        case userConstants.UNLOCK_REQUEST:
            return {
                unlocking: true
            }
        case userConstants.UNLOCK_SUCCESS:
            return {}
        case userConstants.UNLOCK_FAILURE:
            return state
        case userConstants.GETRES_REQUEST:
            return {
                getting: true
            }
        case userConstants.GETRES_SUCCESS:
            return {
                locked: true,
                reservation: action.reservations
            }
        case userConstants.GETRES_FAILURE:
            return {}
        default:
            return state
    }
}