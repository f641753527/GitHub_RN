import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStore from '../utils/AsyncStore';

const KEY = 'key';

export default class Storage extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      value: '',
    };
  }

  handleTextChange = (text) => {
    this.setState({
      keyword: text,
    });
  }

  doSave = () => {
    console.log(this.state.keyword);
    AsyncStore.set(KEY, this.state.keyword);
  }

  doGet = () => {
    AsyncStore.get(KEY).then(value => {
      this.setState({
        value,
      });
    });
  }

  doRemove = () => {
    AsyncStore.remove(KEY);
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Text>storage 值: {this.state.value}</Text>
        <TextInput onChangeText={this.handleTextChange} style={{borderWidth: 1}}/>
        <Button onPress={this.doSave} title='存储'/>
        <Button onPress={this.doGet} title='获取'/>
        <Button onPress={this.doRemove} title='删除'/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    // flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
});