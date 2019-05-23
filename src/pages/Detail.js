import React, {Component} from 'react';
import { StyleSheet, Text, View, WebView, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

import NavigationBar from '../components/NavigationBar';

import ViewUtils from '../utils/ViewUtils';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NavigatorUtils from '../navigator/NavigatorUtils';
import BackPress from '../components/BackPress';

const TREND_URL = 'https://github.com/'
class Detail extends Component {

  constructor(props) {
    super(props);
    const { projectModel } = this.props.navigation.state.params;
    const title = projectModel.full_name || projectModel.fullName;
    const url = projectModel.html_url || TREND_URL + title;
    this.backPress = new BackPress({backPress: () => this.onBackPress() });

    this.state = {
      title,
      url,
      canGoBack: false,
    };
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  __renderRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{marginRight: 6}}>
          <MaterialIcons name='favorite-border' size={26} style={{color: '#fff'}}/>
        </TouchableOpacity>
        { ViewUtils.renderShareButton(()=>{}) }
      </View>
    );
  }

  onBackPress = () => {
    this.back();
    return true;
  }

  back = () => {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigatorUtils.goBack(this.props.navigation);
    }
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={this.state.title} leftButton={ViewUtils.renderLeftButton(this.back)}
          rightButton={this.__renderRightButton()} titleLayoutStyle={{paddingRight: 30}}
          style={{backgroundColor: this.props.themeColor}}/>
        <WebView ref={(node)=>{this.webView=node;}} source={{uri: this.state.url}} startInLoadingState={true} onNavigationStateChange={this.onNavigationStateChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  themeColor: state.theme.theme
});

export default connect(mapStateToProps)(Detail);
