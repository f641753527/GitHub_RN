import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';

import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

export const rootCom = 'Init';//设置根路由

const initStack = createStackNavigator({
  Welcome: {
    screen: Welcome
  }
}, {
    defaultNavigationOptions: {
    header: null,
  },
});

const MainStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Detail: {
    screen: Detail,
  },
});

export const AppNavigator = createSwitchNavigator({
  Init: initStack,
  Main: MainStack
});

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);
/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(AppNavigator);


/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
  state: state.nav,
});

/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);
