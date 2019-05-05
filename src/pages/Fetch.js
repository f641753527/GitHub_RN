import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class Fetch extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  handleTextChange = (text) => {
    this.setState({
      keyword: text
    });
  }

  search = () => {
    const url = `https://api.github.com/search/repositories?q=${this.state.keyword}`;
    console.log('search begin...');
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('请求数据失败');
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.error(e);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={this.handleTextChange}/>
        <Button title='搜索' type='text' onPress={this.search}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
  },
});