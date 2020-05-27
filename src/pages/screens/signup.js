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
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [myuserToken, setUserToken] = useState(null);

  const handleCreateAccount = (userEmail, userPassword, userToken) => {
    axios
      .post('https://us-central1-notes-537b3.cloudfunctions.net/api/signup', {
        email: email,
        password: password,
        confirmpassword: confirmPassword,
      })
      .then((res) => {
        console.log(res.data);
        setUserToken(res.data.token);
        // const HeaderThings = `Bearer ${res.data.token}`;
        // axios.defaults.headers['Authorization'] = HeaderThings;
      })
      .catch((err) => console.log(err));
    signUp(userEmail, userPassword, userToken);
    // navigation.navigate('Notes');
  };
  const {signUp} = React.useContext(AuthContext);

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
          style={styles.button}
          onPress={() => handleCreateAccount(email, password, myuserToken)}>
          <Text style={styles.buttonText}>Proceed</Text>
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
