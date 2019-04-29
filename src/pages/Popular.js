import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import NavigatorUtils from '../navigator/NavigatorUtils';

const TABS = ['Android', 'IOS', 'Front-End', 'Go Lang', 'PHP', 'Java', 'JavaScript', 'C++', 'Python', 'Ruby', 'C', 'NodeJs'];

export default class Popular extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
    };
  }

  componentDidMount() {
    this.get_top_tabs();
  }

  get_top_tabs = () => {
    const list = TABS;
    this.setState({tabs: list});
  }


  __render_tabbar = () => {
    const tabRouteConfig = {};
    if (this.state.tabs && this.state.tabs.length) {
      this.state.tabs.forEach((tab, i) => {
        tabRouteConfig[`tab${i}`] = {
          screen: (props) => <PopularTab {...props} title={tab}/>,
          navigationOptions: {
            title: tab,
          },
        }
      });
      return createAppContainer(createMaterialTopTabNavigator(tabRouteConfig, {
        tabBarOptions: {
          upperCaseLabel: false,
          tabStyle: styles.tabStyle,
          scrollEnabled: true,
          style: { backgroundColor: '#678' },
          indicatorStyle: { height: 1, backgroundColor: '#fff' },
          labelStyle: { fontSize: 12, marginTop: 6, marginBottom: 6, paddingLeft: 2, },
        },
      }));
    }
    return null;
  }


  render() {
    const TopTabBar = this.__render_tabbar();
    return TopTabBar && <TopTabBar />
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 100,
  },
});

class PopularTab extends Component {

  test = () => {
    NavigatorUtils.navigateToPage({navigation: this.props.navigation}, 'Detail');
  }

  render() {
    return (
      <View>
        <Text>top tabbar</Text>
        <Text>{this.props.title}</Text>
        <Text onPress={this.test}>detail</Text>
      </View>
    )
  }
}
