import React, {Component} from 'react';
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux'
import DynamicTabs from '../navigator/DynamicTabs';
import BackPress from '../components/BackPress';

import NavigatorUtils from '../navigator/NavigatorUtils';

class Home extends Component {

  constructor(props) {
    super(props);
    this.backPress = new BackPress({ backPress: this.onBackPress });
  }

  componentDidMount() {
    NavigatorUtils.setNavigation(this.props.navigation);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  /**
    * 处理 Android 中的物理返回键
    * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
    * @returns {boolean}
  */
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
        return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };


  render() {
    return <DynamicTabs/>
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});


export default connect(mapStateToProps)(Home);