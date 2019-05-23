import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity   } from 'react-native';
import HTMLView from 'react-native-htmlview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TrendingItem extends Component{

  render() {
    const { item, themeColor } = this.props;
    if (!item) return null;

    const description = `<p>${item.description}</p>`;

    return (
      <TouchableOpacity onPress={() => {this.props.onTrendingItemPress(item)}}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.fullName}</Text>
          <HTMLView value={description} stylesheet={{p: styles.description, a: styles.description}}/>
          <Text style={styles.description}>{item.meta}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>contributors: </Text>
              {item.contributors.map((v, i)=>(
                <Image style={{width: 22, height: 22, margin: 2}} source={{uri: v}} key={i}/>
              ))}
            </View>
            <View style={styles.row}>
              <Text>Forks: </Text>
              <Text>{item.forkCount}</Text>
            </View>
            <TouchableOpacity style={{padding: 6}} underlayColor='transparent'>
              <FontAwesome name={'star-o'} size={26} style={{color: themeColor}}/>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  }
});