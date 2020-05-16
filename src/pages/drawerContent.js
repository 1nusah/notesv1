import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
const {width, height} = Dimensions.get('screen');
const DrawerCOntent = ({props}) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flexDirection: 'row', paddingTop: 15, paddingLeft: 10}}>
          <Text style={{fontSize: 30, color: '#4b0082'}}>My </Text>
          <Text style={{fontSize: 30, color: '#ff0bac'}}>Notes</Text>
        </View>
        <View style={{...styles.container, paddingTop: 10}}>
          <Text
            style={styles.items}
            onPress={() => this.props.navigation.navigate('Notes')}>
            Notes
          </Text>
          <Text style={styles.items}>Categories</Text>
          <Text style={styles.items}>Reminders</Text>
          <Text style={styles.items}>Archives</Text>
          <Text style={styles.items}>Trash</Text>
        </View>
        <View>
          <Text style={styles.signOut}> Sign Out</Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
  items: {
    fontSize: 25,
    color: '#4b0082',
    paddingVertical: 10,
  },
  signOut: {
    fontSize: 25,
    color: '#f00',
    paddingTop: 0.5 * height,
  },
});

export default DrawerCOntent;
