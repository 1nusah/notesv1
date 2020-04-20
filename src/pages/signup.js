import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#4b0082"
          clearButtonMode="unless-editing"
          returnKeyType="next"
          keyboardType="email-address"
          onChangeText={(text) =>
            this.setState({
              email: text,
            })
          }
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#4b0082"
          clearButtonMode="unless-editing"
          secureTextEntry={true}
          onChangeText={(text) =>
            this.setState({
              password: text,
            })
          }
        />
        <TextInput
          style={styles.textInput}
          placeholder=" Confirm Password"
          placeholderTextColor="#4b0082"
          clearButtonMode="unless-editing"
          secureTextEntry={true}
          onChangeText={(text) =>
            this.setState({
              confirmpassword: text,
            })
          }
        />
        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Notes')}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    fontSize: 40,
    color: '#ff0bac',
  },
  textInput: {
    width: '80%',
    fontSize: 22,
    borderBottomWidth: 1,
    borderRadius: 30,
    borderBottomColor: '#4b0082',
    textAlign: 'center',
    color: '#4b0082',
  },
  button: {
    backgroundColor: '#ff0bac',
    height: 30,
    width: 200,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});
