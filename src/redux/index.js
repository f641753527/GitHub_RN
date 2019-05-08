import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducer';
import { middleware } from '../navigator/AppContainer';


const logger = store => next => action => {
    console.log('previous state', store.getState());
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const middlewares = [
    middleware,
    logger,
    ReduxThunk
];
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
