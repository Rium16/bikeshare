import { userConstants } from '../_constants/userConstants';

/*
    This file basically describes how to change state when we receive an action. Redux
    is basically a state machine.

    For example, if our action is a LOGIN_REQUEST, we set a flag to show that we're currently
    logging in (since it's not instantaneous) and set the (pending) user as whoever was specified in the action
*/

export function authentication(state = {}, action) {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
            
        default:
            return state
    }
}

export function reservation(state = {}, action) {
    switch(action.type) {
        case userConstants.LOCK_REQUEST:
            return {
                locking: true,
                location: action.location
            }
        case userConstants.LOCK_SUCCESS:
            return {
                locked: true,
                location: action.location,
                equipment: action.equipment
            }
        case userConstants.LOCK_FAILURE:
            return {

            }
        default:
            return state
    }
}

