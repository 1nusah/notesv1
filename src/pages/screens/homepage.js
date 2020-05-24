import React, {Component} from 'react';
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
import axios from 'axios';
import {Caption} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

export default class HomePage extends Component {
  state = {
    notes: [],
    isLoading: true,
    modalReveal: false,
    selectedItem: {},
    edit: false,
  };

  hideLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 5000);
  };
  handleAddNote = () => {
    // axios
    //   .post('https://us-central1-notes-537b3.cloudfunctions.net/api/newNote', {
    //     title: this.state.title,
    //     body: this.state.body,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    this.props.navigation.navigate('Notes');
  };

  render() {
    return (
      <View style={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.header}>
          <Text style={styles.logoText1}>My</Text>
          <Text style={styles.logoText2}> Notes</Text>
        </View>
        {this.state.notes.length < 1 ? (
          <View
            style={{
              paddingTop: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.isLoading && <ActivityIndicator />}
            {this.hideLoading()}
            {!this.state.isLoading && (
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
                  onPress={() => this.props.navigation.openDrawer()}
                />
                <Text style={styles.menu}>Menu</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Add Note')}>
                <PlusIcon name="pluscircle" size={70} color="#ff0bac" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <FlatList
                data={this.state.notes}
                style={{height: 0.7 * height}}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => item.title}
                keyboardShouldPersistTaps="always"
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          modalReveal: !this.state.modalReveal,
                          selectedItem: {
                            title: item.title,
                            body: item.body,
                          },
                        });
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
              {this.state.modalReveal && (
                <Modal
                  onRequestClose={() => {
                    this.setState({modalReveal: false});
                    if (this.state.edit !== false) {
                      this.setState({edit: false});
                    }
                  }}>
                  <View style={styles.inputContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        placeholder={this.state.selectedItem.title}
                        defaultValue={this.state.selectedItem.title}
                        autoCapitalize="sentences"
                        multiline
                        editable={this.state.edit}
                        clearButtonMode="unless-editing"
                        placeholderTextColor="#4b0082"
                        underlineColorAndroid="#4b0082"
                        textAlignVertical="center"
                        onChangeText={(text) => {
                          this.setState({
                            ...this.state.selectedItem,
                            title: text,
                          });
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
                          this.setState({edit: true});
                        }}>
                        Edit
                      </Caption>
                    </View>
                    {console.log(this.state.edit)}

                    <TextInput
                      clearButtonMode="unless-editing"
                      placeholder={this.state.selectedItem.body}
                      multiline
                      editable={this.state.edit}
                      placeholderTextColor="#4b0082"
                      defaultValue={this.state.selectedItem.body}
                      onChangeText={(text) => {
                        this.setState({
                          ...this.state.selectedItem,
                          body: text,
                        });
                      }}
                      style={{
                        height: 0.5 * height,
                        fontSize: 25,
                        color: '#4b0082',
                        textAlignVertical: 'top',
                      }}
                    />
                    {this.state.edit && (
                      <TouchableOpacity onPress={this.handleAddNote}>
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
                    onPress={() => this.props.navigation.openDrawer()}
                  />
                  <Text style={styles.menu}>Menu</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Add Note')}>
                  <PlusIcon name="pluscircle" size={70} color="#ff0bac" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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

// componentDidMount() {
//   axios
//     .get('https://us-central1-notes-537b3.cloudfunctions.net/api/getNote')
//     .then((res) => {
//       res.data.forEach((item) => {
//         this.setState({
//           notes: [
//             ...this.state.notes,
//             {
//               body: item.body,
//               title: item.title,
//               createdAt: item.createdAt,
//               id: item.body.noteId,
//             },
//           ],
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
