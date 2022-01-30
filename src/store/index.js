import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export const store = window.location.origin.indexOf("localhost") >= 0 ? createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
) : createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    ));