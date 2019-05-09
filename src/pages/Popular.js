import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import {connect} from 'react-redux';
import * as actions from '../redux/action/popular';

import PopularItem from '../components/PopularItem';

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



const pageSize = 10;
class PopularTab extends Component {

  constructor(props) {
    super(props);
    this.title = this.props.title;
  }

  componentDidMount() {
    this._onRefresh();
  }

  __render_item = (data) => {
    const {item}= data;
    return <PopularItem item={item} themeColor={this.props.themeColor}/>
  }

  _store = () => {
    const {popular} = this.props;
    let store = popular[this.title];
    if (!store) {
      store = {
        projectModel: [],
        items: [],
        is_loading: false,
        load_more: false,
        pageIndex: 1,
      };
    }
    return store;
  }

  _onRefresh = () => {
    this.all_loaded = false;
    const pageIndex = this._store().pageIndex;
    this.props.POPULAR_REFRESH(this.title, this.gen_url(this.title), pageIndex, pageSize);
  }

  load_more = () => {
    if (!this.can_load_more) {
      return;
    }
    this.can_load_more = false;
    const store = this._store();
    this.props.POPULAR_LOAD_MORE(this.title, store.items, store.pageIndex + 1, pageSize, () => {
      this.all_loaded = true;
    });
  }

  gen_url = (title) => {
    return `https://api.github.com/search/repositories?q=${this.title}&sort=stars`;
  }

  __render_footer = () => {
    let store = this._store();

    return (
      store.load_more ? 
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator color={this.props.themeColor} size={26} style={{margin: 10}}/>
          {this.all_loaded ? <Text>数据加载完毕...</Text> : <Text>正在加载中...</Text>}
        </View>
      : null
    );
  }


  render() {
    const {popular, themeColor} = this.props;
    let store = this._store();
    return (
      <FlatList data={store.projectModel} renderItem={this.__render_item} keyExtractor={(item) => item.id.toString()}
        refreshControl={  <RefreshControl refreshing={store.is_loading}  onRefresh={this._onRefresh } colors={[themeColor]}/>}
        ListFooterComponent={this.__render_footer} onEndReached = {this.load_more} onEndReachedThreshold={0.3} onMomentumScrollBegin={()=>{this.can_load_more = true;}}
      />
    )
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
  themeColor: state.theme.theme
});

const mapDispatchToProps = dispatch => ({
  POPULAR_REFRESH: (label, url, pageIndex, pageSize) => dispatch(actions.POPULAR_REFRESH(label, url, pageIndex, pageSize)),
  POPULAR_LOAD_MORE: (label, data, pageIndex, pageSize, cb) => dispatch(actions.POPULAR_LOAD_MORE(label,data, pageIndex, pageSize, cb))
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
