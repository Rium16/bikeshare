import { combineReducers } from 'redux';
import authentication from './authentication';
import alert from './alert';
import registration from './registration';
import reservation from './reservation';
import loan from './loan';


/*
    Combines all the reducers into one for easy portability.
*/
const appReducer = combineReducers({
    authentication,
    alert,
    registration,
    reservation,
    loan
});

const rootReducer = (state, action) => {
    if (action.type === 'USERS_LOGOUT') {
        state = undefined;
    }
    
    return appReducer(state, action);
}

export default rootReducer;