import { combineReducers } from 'redux';
import authentication from './authentication';

/*
    Combines all the reducers into one for easy portability.
*/

const rootReducer = combineReducers({
    authentication,

});

export default rootReducer;