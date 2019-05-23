import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


class User extends Component {

  onFavoriteButtonClick = () => {}

  renderRightButton() {
    return (
      <TouchableOpacity onPress={() => this.onFavoriteButtonClick()}>
        <FontAwesome name={'star'} size={20} style={{color: 'white', marginRight: 10}}/>
      </TouchableOpacity>
    )
  }
  
  render() {
    const {themeColor} = this.props;
    let statusBar = {
      backgroundColor: themeColor,
      barStyle: 'light-content',
    };
    
    return (
      <View style={styles.container}>
        <NavigationBar title={'我的'} statusBar={statusBar} style={{backgroundColor: themeColor}} rightButton={this.renderRightButton()}/>
        <Text style={styles.welcome}>我的 Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = state => ({
  themeColor: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(User);