import { combineReducers } from 'redux';
import { authentication, reservation } from './authentication';

/*
    Combines all the reducers into one for easy portability.
*/

const rootReducer = combineReducers({
    authentication,
    reservation
});

export default rootReducer;