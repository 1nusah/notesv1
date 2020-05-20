import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Reminders extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Icon name="bell-outline" color="#4b0082" />
      </View>
    );
  }
}

export default Reminders;
