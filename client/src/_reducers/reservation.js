import { userConstants } from '../_constants/userConstants';

export default function reservation(state = {}, action) {
    switch(action.type) {
        case userConstants.LOCK_REQUEST:
            return {
                locking: true,
                location: action.itemLocation
            }
        case userConstants.LOCK_SUCCESS:
            return {
                locked: true,
                location: action.reservation.location,
                equipment: action.reservation.equipment
            }
        case userConstants.LOCK_FAILURE:
            return {

            }
        case userConstants.UNLOCK_REQUEST:
            return {
                unlocking: true
            }
        case userConstants.UNLOCK_SUCCESS:
            return {}
        case userConstants.UNLOCK_FAILURE:
        default:
            return state
    }
}