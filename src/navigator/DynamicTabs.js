import React, {Component} from 'react';
import {  } from 'react-native';

import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { BottomTabBar } from 'react-navigation-tabs';
import {connect} from 'react-redux'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Popular from '../pages/Popular';
import Trending from '../pages/Trending';
import Favorite from '../pages/Favorite';
import User from '../pages/User';

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

class DynamicTabs extends Component {

  __render_bottom_tabbar = () => {

    if (this.Tabs) {
      return this.Tabs
    }

    const { Popular, Trending, Favorite, User } = TABS;

    const tabs = { Popular, Trending, Favorite, User };

    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: (props) => <TabBarComponent {...props} theme={this.props.theme}/>
    }));
  }

  render() {
    const NavBar = this.__render_bottom_tabbar();
    return <NavBar/>
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});


export default connect(mapStateToProps)(DynamicTabs);

class TabBarComponent extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme}/>
  }

}
