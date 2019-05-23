import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import * as actions from '../redux/action/trending';
import NavigationBar from '../components/NavigationBar';
import KeyMap from '../model/KeyMap';

import TrendingItem from '../components/TrendingItem';
import TrendingDialog from '../components/TrendingDialog';

const TABS = [
  new KeyMap('All', ''),
  new KeyMap('Unknown', 'unknown'),
  new KeyMap('Html', 'html'),
  new KeyMap('Java', 'java'),
  new KeyMap('JavaScript', 'javascript'),
  new KeyMap('TypeScript', 'typescript'),
  new KeyMap('Vue', 'vue'),
  new KeyMap('Lua', 'lua')
];

const TimeSpan = [
  new KeyMap('今天', 'daily'),
  new KeyMap('本周', 'weekly'),
  new KeyMap('本月', 'monthly')
];

class Trending extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      timeSpan: TimeSpan[0],
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
          screen: (props) => <PopularTabPage {...props} title={tab.value} timeSpan={this.state.timeSpan}/>,
          navigationOptions: {
            title: tab.key,
          },
        }
      });
      return createAppContainer(createMaterialTopTabNavigator(tabRouteConfig, {
        tabBarOptions: {
          upperCaseLabel: false,
          tabStyle: styles.tabStyle,
          scrollEnabled: true,
          style: { backgroundColor: this.props.themeColor },
          indicatorStyle: { height: 2, backgroundColor: '#fff' },
          labelStyle: { fontSize: 14, marginTop: 6, marginBottom: 6, paddingLeft: 2, },
        },
      }));
    }
    return null;
  }

  render_title_view = () => {
    return (
      <TouchableOpacity onPress={()=>{this.dialog.show();}}>
        <View style={styles.title_container}>
          <Text style={styles.title}>趋势 · {this.state.timeSpan.key} </Text>
          <MaterialIcons name='arrow-drop-down' size={26} style={{color: '#fff'}}/>
        </View>
      </TouchableOpacity>
    );
  }

  onTimeSpanSelect = (v) => {
    this.setState({
      timeSpan: v,
    });
  }


  render() {
    const TopTabBar = this.__render_tabbar();
    return (
      <View style={styles.container}>
        <NavigationBar titleView={this.render_title_view()} style={{backgroundColor: this.props.themeColor}}/>
        {TopTabBar && <TopTabBar/>}
        <TrendingDialog ref={(node)=>{this.dialog=node;}} timeSpan={TimeSpan} onTimeSpanSelect={this.onTimeSpanSelect}/>
      </View>
    );
  }
}

const mapStateToProps1 = state => ({
  themeColor: state.theme.theme
});

export default connect(mapStateToProps1)(Trending);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  tabStyle: {
    width: 120,
  },
});



const pageSize = 10;
class TrendingTab extends Component {

  constructor(props) {
    super(props);
    this.title = this.props.title;
  }

  componentDidMount() {
    this._onRefresh();
  }

  __render_item = (data) => {
    const {item}= data;
    return <TrendingItem item={item} themeColor={this.props.themeColor}/>
  }

  _store = () => {
    const {trending} = this.props;
    let store = trending[this.title];
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
    this.props.TRENDING_REFRESH(this.title, this.gen_url(this.title), pageSize);
  }

  load_more = () => {
    if (!this.can_load_more) {
      return;
    }
    this.can_load_more = false;
    const store = this._store();
    this.props.TRENDING_LOAD_MORE(this.title, store.items, pageSize, store.pageIndex + 1, () => {
      this.all_loaded = true;
    });
  }

  gen_url = (title) => {
    const { timeSpan } = this.props;
    return `https://github.com/trending/${title}?since=${timeSpan.value}`;
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
    const { themeColor} = this.props;
    let store = this._store();
    return (
      <FlatList data={store.projectModel} renderItem={this.__render_item} keyExtractor={(item, i) => `${i}`}
        refreshControl={  <RefreshControl refreshing={store.is_loading}  onRefresh={this._onRefresh } colors={[themeColor]}/>}
        ListFooterComponent={this.__render_footer} onEndReached = {this.load_more} onEndReachedThreshold={0.3} onMomentumScrollBegin={()=>{this.can_load_more = true;}}
      />
    )
  }
}

const mapStateToProps = state => ({
  trending: state.trending,
  themeColor: state.theme.theme
});

const mapDispatchToProps = dispatch => ({
  TRENDING_REFRESH: (label, url, pageSize) => dispatch(actions.TRENDING_REFRESH(label, url, pageSize)),
  TRENDING_LOAD_MORE: (label, data, pageSize, pageIndex, cb) => dispatch(actions.TRENDING_LOAD_MORE(label, data, pageSize, pageIndex, cb))
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);
