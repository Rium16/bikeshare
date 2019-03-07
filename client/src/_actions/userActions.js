// inspired by http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
import { userConstants } from '../_constants/userConstants';
import { userService } from '../services/userService';

// actions for transforming parts of the store that are related
// to user functionality

// currently just login/logout but will have registration etc.

/*
    This uses thunks which basically allow us to return a function from an action. So when we perform the login
    action, we really want a function that dispatches a LOGIN_REQUEST action, perform the login network request,
    and then dispatch the corresponding success or failure. Thunks are important here because we have network requests.
*/

export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        /* a promise that when resolved notifies of success/failure */
        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
        
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

export function lock(itemLocation) {
    return dispatch => {
        dispatch(request({ itemLocation }));

        userService.lock(itemLocation)
            .then(
                reservation => {
                    dispatch(success(reservation));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(reservation) { return { type: userConstants.LOCK_REQUEST, reservation } }
    function success(reservation) { return { type: userConstants.LOCK_SUCCESS, reservation } }
    function failure(error) { return { type: userConstants.LOCK_FAILURE, error } }
}