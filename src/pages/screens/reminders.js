import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// thsi is the reminders page to be updated in our later version
class Reminders extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Icon name="bell-outline" color="#ff0bac" size={100} />
          <Text style={{fontSize: 30, color: '#4b0082'}}>
            You have no reminders
          </Text>
        </View>
      </View>
    );
  }
}

export default Reminders;
