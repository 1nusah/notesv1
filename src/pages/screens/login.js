import React, {Component, useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../components/context/context';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingIndicator, setIsLoading] = useState(false);
  const {signIn} = useContext(AuthContext);
  function loginHandle(email, password) {
    signIn(email, password);
    // setIsLoading(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#4b0082"
        clearButtonMode="unless-editing"
        value={email}
        returnKeyType="next"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        placeholderTextColor="#4b0082"
        clearButtonMode="unless-editing"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={{paddingTop: 20}}>
        <TouchableOpacity
          style={styles.button}
          onPress={loginHandle(email, password)}>
          {isLoadingIndicator == 'hello' ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Proceed</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{paddingTop: 10}}>
        <TouchableOpacity
          onPress={() => {
            setIsLoading(true);
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
