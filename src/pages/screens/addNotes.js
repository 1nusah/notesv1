import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckIcon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
const {width, height} = Dimensions.get('window');
const AddNotes = ({navigation}) => {
  const [yourTitle, setNoteTitle] = React.useEffect('');
  const [yourBody, setNoteBody] = React.useEffect('');
  const [yourToken, setYourToken] = React.useEffect('');
  const handleAddNote = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setYourToken(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }

    const AuthStr = 'Bearer '.concat(yourToken);

    axios
      .post('https://us-central1-notes-537b3.cloudfunctions.net/api/newNote', [
        {
          title: yourTitle,
          body: yourBody,
        },
        {headers: {Authorization: AuthStr}},
      ])
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.categoryName}
        placeholder="Title"
        placeholderTextColor="#4b0082"
        enablesReturnKeyAutomatically
        autoCapitalize="sentences"
        underlineColorAndroid="#4b0082"
        textAlignVertical="center"
        onChangeText={(text) => {
          setNoteTitle(text);
        }}
      />

      <TextInput
        placeholder="Notes"
        placeholderTextColor="#4b0082"
        autoCapitalize="sentences"
        style={styles.noteItem}
        multiline={true}
        onChangeText={(text) => {
          setNoteBody(text);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          handleAddNote();
        }}>
        <CheckIcon
          name="check"
          size={50}
          color="#ff0bac"
          style={{
            paddingTop: 0.1 * height,
            paddingLeft: 0.7 * width,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddNotes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'azure',
  },
  categoryName: {
    color: '#4b0082',
    height: 0.1 * height,
    fontSize: 30,
  },
  noteItem: {
    fontSize: 25,
    color: '#4b0082',
    height: 0.5 * height,
    textAlignVertical: 'top',
  },
});

//  notes: {
//         title: '',
//         notes: '',
//       },
//   this.state = {
//    someProperty: {
//       flag:true
//    }
// }
//this.setState({ someProperty: { ...this.state.someProperty, flag: false} });

// handleAddNote = () => {
//   axios
//     .post('https://us-central1-notes-537b3.cloudfunctions.net/api/newNote', {
//       title: this.state.title,
//       body: this.state.body,
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => console.log(err));
//   this.props.navigation.goBack();
// };
