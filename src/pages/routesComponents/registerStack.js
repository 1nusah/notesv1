import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../screens/signup';
import Login from '../screens/login';
const RegisterStackScreens = createStackNavigator();
const RegisterStack = ({navigation}) => {
  return (
    <RegisterStackScreens.Navigator headerMode="none">
      <RegisterStackScreens.Screen name="Login" component={Login} />
      <RegisterStackScreens.Screen name="Sign Up" component={SignUp} />
    </RegisterStackScreens.Navigator>
  );
};

export default RegisterStack;
