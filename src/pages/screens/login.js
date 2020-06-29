import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {AuthContext} from '../../components/context/context';
import axios from 'axios';

const Login = ({navigation}) => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userToken, setUserToken] = useState(null);
  const [isLoadingIndicator, setIsLoading] = useState(false);
  const {signIn} = useContext(AuthContext);
  function loginHandle(email, password, myuserToken) {
    // email, password, userToken
    // handle login function which passes the userlogin details and usertoken to the devices storeage
    axios
      .post('https://us-central1-notes-537b3.cloudfunctions.net/api/login', {
        email: userEmail,
        password: userPassword,
      })
      .then((res) => {
        // console.log(res.data.token);
        setUserToken(res.data.token);
      })
      .catch((e) => {
        console.log(e);
      });
    signIn(email, password, myuserToken);
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 5000);
  }
  // this is the login page
  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#4b0082"
        clearButtonMode="unless-editing"
        value={userEmail}
        returnKeyType="next"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={userPassword}
        placeholderTextColor="#4b0082"
        clearButtonMode="unless-editing"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={{paddingTop: 40}}>
        <TouchableOpacity
          disabled={isLoadingIndicator}
          style={styles.button}
          onPress={() => {
            // if you press login the handle function is triggered
            loginHandle(userEmail, userPassword, userToken);
          }}>
          {isLoadingIndicator == true ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Proceed</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{paddingTop: 10}}>
        <TouchableOpacity
          onPress={() => {
            // setIsLoading(true);
            navigation.navigate('Sign Up');
          }}>
          <Text style={styles.signup}> Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

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
