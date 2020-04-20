import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Splash extends Component {
  render() {
    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Animatable.Text
              animation="bounceInDown"
              iterationCount={1}
              style={styles.logoText1}>
              My
            </Animatable.Text>
            <Animatable.Text
              animation="bounceInUp"
              iterationCOunt={1}
              style={styles.logoText2}>
              Notes
            </Animatable.Text>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
  },
  logoText1: {
    fontSize: 35,
    color: '#ff0bac',
    fontWeight: 'bold',
    marginRight: 10,
  },
  logoText2: {
    fontSize: 35,
    color: '#4b0082',
    fontWeight: 'bold',
  },
});
