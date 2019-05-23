import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtils {

  static renderLeftButton(cb) {
    return (
      <TouchableOpacity onPress={cb} style={{ padding: 8, paddingLeft: 12 }}>
        <Ionicons name='ios-arrow-back' size={26} style={{ color: '#fff'}} />
      </TouchableOpacity>
    );
  }

  static renderShareButton(cb) {
    return (
      <TouchableOpacity onPress={cb} style={{marginRight: 12}}>
        <Ionicons name='md-share-alt' size={26} style={{color: '#fff'}} />
      </TouchableOpacity>
    );
  }

}