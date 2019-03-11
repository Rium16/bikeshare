import { combineReducers } from 'redux';
import authentication from './authentication';
import alert from './alert';
import registration from './registration';
import reservation from './reservation';


/*
    Combines all the reducers into one for easy portability.
*/

const rootReducer = combineReducers({
    authentication,
    alert,
    registration,
    reservation
});

export default rootReducer;