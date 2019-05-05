import {} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStore {

  static set(key, value) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  static get(key) {
    return new Promise(async (resolve, reject) => {
      try {
        let value = await AsyncStorage.getItem(key);
        value = JSON.parse(value);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }

  static remove(key) {
    return new Promise(async (resolve, reject) => {
      try {
        let value = await AsyncStorage.removeItem(key);
        value = JSON.parse(value);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    });
  }

}