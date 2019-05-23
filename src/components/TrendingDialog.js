import React, { Component } from 'react';
import { StyleSheet, Modal, View, Text, Image, TouchableOpacity   } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TrendingDialog extends Component{

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  show = () => {
    this.setState({ modalVisible: true });
  }

  hide = () => {
    this.setState({ modalVisible: false });
  }

  onSelect = (v) => {
    this.props.onTimeSpanSelect(v);
    this.hide();
  }

  render() {
    const { timeSpan } = this.props;

    return (
      <Modal visible={this.state.modalVisible} onRequestClose={this.hide} transparent={true} animationType='fade'>
        <TouchableOpacity style={styles.container} onPress={this.hide}>
          <MaterialIcons name='arrow-drop-up' size={36} style={{color: '#fff', margin: -15, marginTop: 30,}}/>

          <View style={styles.content}>
            {timeSpan.map((v, i) => (
              <TouchableOpacity key={i} onPress={()=>{this.onSelect(v);}} underlayColor='transparent'>
                <View style={styles.text_container}>
                  <Text style={styles.text}>{v.key}</Text>
                </View>
                {
                  i !== timeSpan.length - 1 ? <View style={styles.line}/> : null
                }
            </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});