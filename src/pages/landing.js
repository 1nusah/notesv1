import React, {Component} from 'react';
import Splash from './splash';
import Login from './login';
import AsyncStorage from '@react-native-community/async-storage';
export default class Landing extends Component {
  render() {
    if (!this.state.timePassed) {
      return <Splash />;
    } else {
      return <Login navigation={this.props.navigation} />;
    }
  }
}
