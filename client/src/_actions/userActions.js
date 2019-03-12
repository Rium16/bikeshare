// inspired by http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
import { userConstants } from '../_constants/userConstants';
import { apiConstants } from '../_constants/apiConstants';
import { userService } from '../services/userService';
import { alertActions } from './alertActions';
import { history } from '../services/history';

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
                    history.push('/map'); 
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
    return dispatch => {
        userService.logout();
        dispatch(alertActions.success("Logout successful!"));
        history.push('/map');
        return { type: userConstants.LOGOUT };
    }
    
}

export function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user.email, user.phone, user.firstName, user.lastName, user.password)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success("Customer account created!"));
                    history.push('/map');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );

        
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

export function lock(itemLocation, customer) {
    return dispatch => {
        dispatch(request({ itemLocation }));

        userService.lock(itemLocation, customer)
            .then(
                response => {
                    dispatch(success(response.reservation[0]));
                },
                error => {
                    /* dispatch failure alert here */
                    dispatch(failure(error.toString()));
                }
            )
    }

    function request(reservation) { return { type: userConstants.LOCK_REQUEST, reservation } }
    function success(reservation) { return { type: userConstants.LOCK_SUCCESS, reservation } }
    function failure(error) { return { type: userConstants.LOCK_FAILURE, error } }
}

export function unlock(EID) {
    return dispatch => {
        dispatch(request({ EID }));

        userService.unlock(EID)
            .then(
                message => {
                    dispatch(success(message));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }


    function request(EID) { return { type: userConstants.UNLOCK_REQUEST, EID } }
    function success(message) { return { type: userConstants.UNLOCK_SUCCESS, message } }
    function failure(error) { return { type: userConstants.UNLOCK_FAILURE, error } }
}

export function getReservations(customerID) {
    return dispatch => {
        dispatch(request());

        userService.getReservations(customerID)
            .then(
                response => {
    
                    dispatch(success(response.reservations[0]));
 
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    }
    

    
    function request() { return { type: userConstants.GETRES_REQUEST } }
    function success(reservations) { return { type: userConstants.GETRES_SUCCESS, reservations } }
    function failure(error) { return { type: userConstants.GETRES_FAILURE, error } }

}