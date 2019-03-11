import { combineReducers } from 'redux';
<<<<<<< HEAD
import authentication from './authentication';
import alert from './alert';
import registration from './registration';

=======
import { authentication, reservation } from './authentication';
>>>>>>> super_reservations

/*
    Combines all the reducers into one for easy portability.
*/

const rootReducer = combineReducers({
    authentication,
<<<<<<< HEAD
    alert,
    registration
=======
    reservation
>>>>>>> super_reservations
});

export default rootReducer;