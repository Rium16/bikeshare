import { combineReducers } from 'redux';
import authentication from './authentication';
import alert from './alert';
import registration from './registration';
import reservation from './reservation';
import loan from './loan';


/*
    Combines all the reducers into one for easy portability.
*/

const rootReducer = combineReducers({
    authentication,
    alert,
    registration,
    reservation,
    loan
});

export default rootReducer;