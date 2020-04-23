import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './src/pages/homepage';
import Landing from './src/pages/landing';
import SignUp from './src/pages/signup';
import MyNotes from './src/pages/mynotes';
import Login from './src/pages/login';
import AddNotes from './src/pages/addNotes';
const Stack = createStackNavigator();
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes">
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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notes"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="My Notes"
            component={MyNotes}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Add Note" component={AddNotes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
