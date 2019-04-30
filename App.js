import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './src/redux';

import AppContainer from './src/navigator/AppContainer';

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

