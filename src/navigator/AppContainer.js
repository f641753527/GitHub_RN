import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

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

const switchStack = createSwitchNavigator({
  Init: initStack,
  Main: MainStack
});

export default createAppContainer(switchStack);