import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

export default class HomePage extends Component {
  state = {
    notes: [],
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get('https://us-central1-notes-537b3.cloudfunctions.net/api/getNote')
      .then((res) => {
        console.log(res.data);
        // this.setState( {state: res.data.})
        res.data.forEach((item) => {
          this.setState({
            notes: [
              ...this.state.notes,
              {
                body: item.body,
                title: item.title,
                createdAt: item.createdAt,
              },
            ],
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  hideLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 5000);
  };

  render() {
    return (
      <View style={styles.container}>
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
          </View>
        ) : (
          <>
            <FlatList
              data={this.state.notes}
              style={{paddingTop: 0}}
              horizontal={false}
              numColumns={2}
              renderItem={({item}) => (
                <TouchableOpacity key={item.title}>
                  <View>
                    <View
                    // style={{
                    //   width: width / 2,
                    // }}
                    >
                      <View
                        style={{
                          height: 100,
                          width: width / 2,
                          paddingHorizontal: 2,
                          // overflow: 'hidden',
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            textTransform: 'capitalize',
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#f2e9e9',
                            borderBottomEndRadius: 5,
                          }}>
                          {item.title}
                        </Text>

                        <Text style={{fontSize: 20}}>
                          {item.body.substring(0, 30)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            top: '60%',
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
  categoryContainer: {
    paddingTop: 0,
  },
  categoryItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
});
