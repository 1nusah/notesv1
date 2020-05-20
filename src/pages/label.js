import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Label extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="plus-outline" size={100} color="#ff0bac" />
          <Text style={{fontSize: 30, color: '#4b0082'}}>
            Tap the Icon to Add New Label
          </Text>
        </View>
      </View>
    );
  }
}

export default Label;
