import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import {Caption} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

const HomePage = ({navigation}) => {
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalReveal, setModalReveal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  const hideLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${yourToken}`,
  //   },
  // };
  let yourToken;
  // this function gets the items from firebase
  const getMyNotes = async () => {
    try {
      yourToken = await AsyncStorage.getItem('userToken');
      console.log(yourToken);
    } catch (e) {
      console.log(e);
    }
    axios
      .get('https://us-central1-notes-537b3.cloudfunctions.net/api/getNote', {
        headers: {
          Authorization: `Bearer ${yourToken}`,
        },
      })
      .then((res) => {
        console.log(res.data[0].notes);
        // setNotes(...notes, res.data[0].notes);
        // console.log(notes);
        // res.data[0].notes.map((i) => {
        //   console.log(i.title);
        //   console.log(i.body);
        //   setNotes(i);
        // });
        // console.log('notes is now ' + notes);
        setNotes(res.data[0].notes);
        console.log(notes);
      })

      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    //added the setInterval function here
    setInterval(() => {
      getMyNotes();
    }, 15000);
  });

  // components and screen page is implemented
  return (
    <View style={styles.container} keyboardShouldPersistTaps="always">
      <View style={styles.header}>
        <Text style={styles.logoText1}>My</Text>
        <Text style={styles.logoText2}> Notes</Text>
      </View>
      {notes.length < 1 ? (
        <View
          style={{
            paddingTop: '40%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isLoading && <ActivityIndicator />}
          {hideLoading()}
          {!isLoading && (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: 25,
                color: '#4b0082',
              }}>
              Tap icon to add first note
            </Text>
          )}
          /* if there is no item we just show Tap icon to add first note*/
          <View
            style={{
              flexDirection: 'row',
              top: '80%',
              paddingLeft: 20,
            }}>
            <View style={{paddingLeft: 30, marginRight: '48%'}}>
              <Icon
                name="menu"
                size={50}
                color="#4b0082"
                onPress={() => navigation.openDrawer()}
              />
              <Text style={styles.menu}>Menu</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Add Note')}>
              <PlusIcon name="pluscircle" size={70} color="#ff0bac" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // if there is any notes, we show them
        <View>
          <View>
            <FlatList
              data={notes}
              style={{height: 0.7 * height, paddingLeft: 20, paddingRight: 20}}
              horizontal={false}
              numColumns={2}
              keyExtractor={(item) => item.title}
              keyboardShouldPersistTaps="always"
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setModalReveal(!modalReveal);
                      setSelectedItem({title: item.title, body: item.body});
                    }}>
                    <View
                      style={{
                        height: 100,
                        width: width / 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          textTransform: 'capitalize',
                          borderBottomColor: '#f2e9e9',
                          borderBottomEndRadius: 5,
                          color: '#ff0bac',
                        }}>
                        {item.title}
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: 'Roboto',
                          color: '#4b0082',
                        }}>
                        {item.body.substring(0, 25)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            {modalReveal && (
              <Modal
                onRequestClose={() => {
                  setModalReveal(false);
                  if (edit !== false) {
                    setEdit(false);
                  }
                }}>
                <View style={styles.inputContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      placeholder={selectedItem.title}
                      defaultValue={selectedItem.title}
                      autoCapitalize="sentences"
                      multiline
                      editable={edit}
                      clearButtonMode="unless-editing"
                      placeholderTextColor="#4b0082"
                      underlineColorAndroid="#4b0082"
                      textAlignVertical="center"
                      onChangeText={(text) => {
                        setSelectedItem(...selectedItem, {title: text});
                      }}
                      style={{
                        height: 0.1 * height,
                        width: 0.9 * width,
                        fontSize: 30,
                        color: '#ff0bac',
                      }}
                    />
                    <Caption
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        paddingTop: 30,
                      }}
                      onPress={() => {
                        setEdit(true);
                      }}>
                      Edit
                    </Caption>
                  </View>
                  {console.log(edit)}

                  <TextInput
                    clearButtonMode="unless-editing"
                    placeholder={selectedItem.body}
                    multiline
                    editable={edit}
                    placeholderTextColor="#4b0082"
                    defaultValue={selectedItem.body}
                    onChangeText={(text) => {
                      setSelectedItem(...selectedItem, {body: text});
                    }}
                    style={{
                      height: 0.5 * height,
                      fontSize: 25,
                      color: '#4b0082',
                      textAlignVertical: 'top',
                    }}
                  />
                  {edit && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Notes');
                      }}>
                      <Icon
                        name="check"
                        size={50}
                        color="#ff0bac"
                        style={{
                          paddingLeft: 0.7 * width,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </Modal>
            )}
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{paddingLeft: 30, marginRight: '48%'}}>
                <Icon
                  name="menu"
                  size={50}
                  color="#4b0082"
                  onPress={() => navigation.openDrawer()}
                />
                <Text style={styles.menu}>Menu</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Add Note')}>
                <PlusIcon name="pluscircle" size={70} color="#ff0bac" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  logoText1: {
    fontSize: 40,
    color: '#ff0bac',
    fontWeight: 'bold',
    marginRight: 10,
  },
  logoText2: {
    fontSize: 40,
    color: '#4b0082',
    fontWeight: 'bold',
  },

  menu: {
    fontSize: 18,
    paddingTop: 0,
    paddingLeft: 8,
    color: '#ff0bac',
  },
  tapIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    height: height,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'azure',
  },
});

export default HomePage;
