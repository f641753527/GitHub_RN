import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import theme from './theme';
import popular from './popular';
import { AppNavigator, rootCom } from '../../navigator/AppContainer';

//1.指定默认state
// const navState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = createNavigationReducer(AppNavigator);
// const navReducer = (state = navState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//   // 如果`nextState`为null或未定义，只需返回原始`state`
//   return nextState || state;
// };


/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    theme: theme,
    popular,
});

export default index;
