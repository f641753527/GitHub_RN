import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import * as actions from '../redux/action/theme';

class Favorite extends Component {

  constructor(props) {
    super(props);
  }

  __change_theme = () => {
    const COLORS = ['red', 'blue', 'green', 'pink', 'yellow'];
    const i = Math.floor(Math.random() * 5);
    this.props.UPDATE_THEME(COLORS[i]);
  }

  render() {
    let statusBar = {
      backgroundColor: this.props.themeColor,
      barStyle: 'light-content',
    };
    return (
      <View style={styles.container}>
        <NavigationBar title='收藏' statusBar={statusBar} style={{backgroundColor: this.props.themeColor}}/>
        <Text style={styles.welcome}>收藏 Page</Text>
        <Button title='修改主题' onPress={this.__change_theme}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  themeColor: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
  UPDATE_THEME: (theme) => dispatch(actions.UPDATE_THEME(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);

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
