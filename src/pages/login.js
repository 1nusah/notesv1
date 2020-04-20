import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.login}>Login</Text>
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
        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Notes')}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 10}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Sign Up');
            }}>
            <Text style={styles.signup}> Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  login: {
    fontSize: 40,
    color: '#ff0bac',
    paddingBottom: 15,
    fontWeight: 'bold',
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
  signup: {
    fontSize: 20,
    color: '#4b0082',
  },
});
