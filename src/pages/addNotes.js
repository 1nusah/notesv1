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
import axios from 'axios';
const {width, height} = Dimensions.get('window');
export default class AddNotes extends Component {
  state = {
    title: '',
    body: '',
  };
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
  handleAddNote = () => {
    axios
      .post('https://us-central1-notes-537b3.cloudfunctions.net/api/newNote', {
        title: this.state.title,
        body: this.state.body,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    this.props.navigation.goBack();
  };

  render() {
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
          value={this.state.title}
          onChangeText={(text) => {
            // this.setState({notes: {...this.state.notes, title: text}});
            this.setState({title: text});
          }}
        />
        <ScrollView style={{paddingBottom: 0.1 * height}}>
          <TextInput
            placeholder="Notes"
            placeholderTextColor="#4b0082"
            enablesReturnKeyAutomatically
            autoCapitalize="sentences"
            multiline
            value={this.state.body}
            style={styles.noteItem}
            onChangeText={(text) => {
              // this.setState({notes: {...this.state.note, notes: text}});
              this.setState({body: text});
            }}
          />
        </ScrollView>
        <TouchableOpacity onPress={this.handleAddNote}>
          <CheckIcon
            name="check"
            size={50}
            color="#ff0bac"
            style={{
              paddingTop: 0.48 * height,
              paddingLeft: 0.8 * width,
              paddingBottom: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  categoryName: {
    color: '#4b0082',
    height: 0.1 * height,
    fontSize: 30,
  },
  noteItem: {
    fontSize: 25,
    color: '#4b0082',
  },
});
