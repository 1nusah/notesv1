/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './src/pages/homepage';
import Landing from './src/pages/landing';
import SignUp from './src/pages/signup';
const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Sign Up">
          <Stack.Screen
            name="Home"
            component={Landing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Notes" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
