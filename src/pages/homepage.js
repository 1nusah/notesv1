import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logoText1}>My</Text>
          <Text style={styles.logoText2}> Notes</Text>
        </View>
        <View
          style={{
            ...styles.categoryContainer,
            justifyContent: 'center',
          }}>
          <ScrollView>
            <View style={styles.categoryContainer}>
              <View style={styles.categoryItemsContainer}>
                <Text style={styles.categoryName}>Personal </Text>
                <Text style={styles.notesNumber}>4</Text>
              </View>
              <View style={styles.categoryItemsContainer}>
                <Text style={styles.pinkCategoryName}>Work </Text>
                <Text style={styles.pinkCategoryNumber}>6</Text>
              </View>
              <View style={styles.categoryItemsContainer}>
                <Text style={styles.categoryName}>Ideas </Text>
                <Text style={styles.notesNumber}>2</Text>
              </View>
              <View style={styles.categoryItemsContainer}>
                <Text style={styles.categoryName}>Lists </Text>
                <Text style={styles.notesNumber}>7</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 110}}>
          <View style={{paddingLeft: 30, marginRight: '48%'}}>
            <Icon
              name="menu"
              size={50}
              color="#4b0082"
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Text
              style={{
                fontSize: 18,
                paddingTop: 0,
                paddingLeft: 8,
                color: '#ff0bac',
              }}>
              Menu
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Add Note')}>
            <PlusIcon name="pluscircle" size={70} color="#ff0bac" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  logoText1: {
    fontSize: 70,
    color: '#ff0bac',
    fontWeight: 'bold',
    marginRight: 10,
  },
  logoText2: {
    fontSize: 70,
    color: '#4b0082',
    fontWeight: 'bold',
  },
  categoryContainer: {
    paddingTop: 0,
  },
  categoryItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  pinkCategoryName: {
    textAlign: 'justify',
    marginRight: '25%',
    fontSize: 45,
    color: '#ff0bac',
    fontWeight: 'bold',
  },
  pinkCategoryNumber: {
    fontSize: 45,
    color: '#ff0bac',
    fontWeight: 'bold',
    textAlign: 'justify',
    // backgroundColor: '#FFC0CB',
    borderRadius: 15,
  },
  categoryName: {
    marginRight: '25%',
    fontSize: 45,
    color: '#4b0082',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  notesNumber: {
    fontSize: 45,
    color: '#4b0082',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
});
