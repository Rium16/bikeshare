import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './_reducers';

// a middleware for displaying transitions on the console
const loggerMiddleware = createLogger();

/*
    Creates an app-wide store (enabled by Provider in App.js) with all of the combined reducers.
    So basically creates a state machine where the transition rules are dictated by rootReducer.
*/
export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}