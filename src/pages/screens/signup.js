import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../components/context/context';
import {ActivityIndicator} from 'react-native-paper';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [myuserToken, setUserToken] = useState(null);
  const [isLoadingIndicator, setIsLoading] = useState(false);

  const {signUp} = React.useContext(AuthContext);
  // sign up page

  // so here the user details are sent to the devices storage
  function handleCreateAccount(userEmail, userPassword, userToken) {
    axios
      .post('https://us-central1-notes-537b3.cloudfunctions.net/api/signup', {
        email: email,
        password: password,
        confirmpassword: confirmPassword,
      })
      .then((res) => {
        // console.log(res.data.token);
        setUserToken(res.data.token.toString());
      })
      .catch((err) => console.log(err));
    signUp(userEmail, userPassword, userToken);
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 5000);
  }

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
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#4b0082"
        clearButtonMode="unless-editing"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        //git
      />
      <TextInput
        style={styles.textInput}
        placeholder=" Confirm Password"
        placeholderTextColor="#4b0082"
        clearButtonMode="unless-editing"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <View style={{paddingTop: 20}}>
        <TouchableOpacity
          disabled={isLoadingIndicator}
          style={styles.button}
          onPress={() => handleCreateAccount(email, password, myuserToken)}>
          {isLoadingIndicator == true ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Proceed</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
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
