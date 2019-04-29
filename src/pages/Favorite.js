import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';



export default class Favorite extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>收藏 Page</Text>
        <Button title='修改主题' onPress={() => {this.props.navigation.setParams({'theme': {tintColor: 'red', update: new Date().getTime()}})}}/>
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
