/*
 * @Descripttion: 
 * @version: 
 * @Author: FanHaorun
 * @LastEditors: FanHaorun
 * @Date: 2019-04-28 17:44:47
 * @LastEditTime: 2019-04-29 15:48:35
 */

export default class NavigatorUtils {

  
  static navigation = null;

  /**
   * @name: 
   * @description: 
   * @param {type} 
   * @return: 
   */
  static setNavigation(navigation) {
    this.navigation = navigation
  }

  /**
   * @name: 
   * @description: 
   * @param page: url
   * @return: void
   */
  static navigateToPage(params, page) {
    if (!this.navigation) {
      console.log('navigation can not be empty');
      return;
    }
    this.navigation.navigate(page, params);
  }

  /**
   * @name: 
   * @description: 
   * @param {type}
   * @return: void
   */
  static goBack(navigation) {
    navigation.goBack();
  }

  /**
   * @name: 
   * @description: 
   * @param {type} 
   * @return: 
   */
  static resetToHome(params) {
    const { navigation } = params;
    navigation.navigate('Main');
  }
}