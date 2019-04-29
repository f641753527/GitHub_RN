import React, {Component} from 'react';
import {  } from 'react-native';

import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { BottomTabBar } from 'react-navigation-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Popular from '../pages/Popular';
import Trending from '../pages/Trending';
import Favorite from '../pages/Favorite';
import User from '../pages/User';

import NavigatorUtils from '../navigator/NavigatorUtils';

const TABS = {
  Popular: {
    screen: Popular,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <MaterialIcons name='whatshot' size={26} style={{color: tintColor}}/>
      )
    },
  },
  Trending: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <Ionicons name='md-trending-up' size={26} style={{color: tintColor}}/>
      )
    },
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <MaterialIcons name='favorite' size={26} style={{color: tintColor}}/>
      )
    },
  },
  User: {
    screen: User,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, horizontal, tintColor }) => (
        <FontAwesome name='user' size={26} style={{color: tintColor}}/>
      )
    },
  },
};

export default class DynamicTabs extends Component {

  __render_bottom_tabbar = () => {

    const { Popular, Trending, Favorite, User } = TABS;

    const tabs = { Popular, Trending, Favorite, User };

    return createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: TabBarComponent
    }));
  }

  render() {
    const NavBar = this.__render_bottom_tabbar();
    return <NavBar/>
  }
}

class TabBarComponent extends Component{

  constructor(props) {
    super(props);
    this.theme = {
      tintColor: 'blue',
      update: new Date().getTime(),
    };
  }

  render() {
    const {routes, index} = this.props.navigation.state;
    const params = routes[index].params;
    if (params && params.theme) {
      this.theme = params.theme;
    }
    return <BottomTabBar {...this.props} activeTintColor={this.theme.tintColor}/>
  }

}
