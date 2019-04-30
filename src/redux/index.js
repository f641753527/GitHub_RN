import { applyMiddleware, createStore } from 'redux';
import reducers from './reducer';
import { middleware } from '../navigator/AppContainer';


const middlewares = [
    middleware,
];
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
