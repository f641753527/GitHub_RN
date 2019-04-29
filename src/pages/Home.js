import React, {Component} from 'react';
import {  } from 'react-native';

import DynamicTabs from '../navigator/DynamicTabs';


import NavigatorUtils from '../navigator/NavigatorUtils';

export default class Home extends Component {

  componentDidMount() {
    NavigatorUtils.setNavigation(this.props.navigation);
  }

  render() {
    return <DynamicTabs/>
  }
}

