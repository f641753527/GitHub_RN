import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import {connect} from 'react-redux';
import * as actions from '../redux/action/popular';

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
          screen: (props) => <PopularTabPage {...props} title={tab}/>,
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
          indicatorStyle: { height: 2, backgroundColor: '#fff' },
          labelStyle: { fontSize: 14, marginTop: 6, marginBottom: 6, paddingLeft: 2, },
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

  constructor(props) {
    super(props);
    this.title = this.props.title;
  }

  __render_item = (data) => {
    const {item}= data;
    console.log(item);
    return (
      <View>
        <Text>{item.id}</Text>
      </View>
    );
  }

  _onRefresh = () => {
    this.props.LOAD_POPULAR_REFRESH(this.title, this.gen_url(this.title));
  }

  gen_url = (title) => {
    return `https://api.github.com/search/repositories?q=${this.title}&sort=stars`;
  }


  render() {
    const {popular} = this.props;
    let store = popular[this.title];
    if (!store) {
      store = {
        items: [],
        is_loading: false,
      };
    }
    return (
      <FlatList data={store.items} renderItem={this.__render_item} keyExtractor={(item) => item.id.toString()}
        refreshControl={  <RefreshControl refreshing={store.is_loading}  onRefresh={this._onRefresh } />}
      />
    )
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
  LOAD_POPULAR_REFRESH: (label, url) => dispatch(actions.LOAD_POPULAR_REFRESH(label, url))
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
