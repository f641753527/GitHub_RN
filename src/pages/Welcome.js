import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

import NavigatorUtils from '../navigator/NavigatorUtils';

export default class Welcome extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      NavigatorUtils.resetToHome({
        navigation: this.props.navigation
      });
    }, 200);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }





  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
