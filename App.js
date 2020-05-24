import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from './src/pages/screens/splash';
import HomePage from './src/pages/screens/homepage';
import SignUp from './src/pages/screens/signup';
import MyNotes from './src/pages/screens/mynotes';
import Login from './src/pages/screens/login';
import AddNotes from './src/pages/screens/addNotes';
import DrawerContent from './src/pages/routesComponents/drawerContent';
import Reminders from './src/pages/screens/reminders';
import Settings from './src/pages/screens/settings';
import Support from './src/pages/screens/support';
import Label from './src/pages/screens/label';
import RegisterStack from './src/pages/routesComponents/registerStack';
import {AuthContext} from './src/components/context/context';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native';
import {StatusBar} from 'react-native';
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);
  initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGNUP': {
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
          email: action.id,
        };
      }
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          email: null,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        // setUserToken('jdskjdkjkjd');
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (email == 'user@gmail.com' && password == '1234567') {
          userToken = 'jnkjfkjkjlfkl';
          try {
            await AsyncStorage.setItem('userToken', userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: 'LOGIN', id: email, token: userToken});
        {
          console.log('user token is ' + userToken);
          console.log('user email is ' + email);
          console.log('user password is ' + password);
        }
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        setUserToken('said');
        setIsLoading(false);
      },
    }),
    [],
  );
  {
    console.log(loginState);
  }
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'RETRIEVE_TOKEN',
        token: userToken,
      });
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Splash />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" style={{backgroundColor: '#fff'}} />
        {loginState.userToken == null ? (
          <RegisterStack />
        ) : (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen
              name="Notes"
              component={HomePage}
              options={{headerShown: false}}
            />
            <Drawer.Screen
              name="My Notes"
              component={MyNotes}
              options={{headerShown: false}}
            />
            <Drawer.Screen name="Add Note" component={AddNotes} />
            <Drawer.Screen name="Reminders" component={Reminders} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Support" component={Support} />
            <Drawer.Screen name="Label" component={Label} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

// const initialLoginState = {
//   isLoading: true,
//   email: null,
//   userToken: null,
// };
// const loginReducer = (prevState, action) => {
//   switch (action.type) {
//     case 'RETRIEVE_TOKEN':
//       return {
//         ...prevState,
//         userToken: action.token,
//         isLoading: false,
//       };

//     case 'LOGIN':
//       return {
//         ...prevState,
//         email: action.id,
//         userToken: action.token,
//         isLoading: false,
//       };

//     case 'LOGOUT':
//       return {
//         // ...prevState,
//         isLoading: false,
//         email: null,
//         userToken: null,
//       };

//     case 'REGISTER':
//       return {
//         ...prevState,
//         isLoading: false,
//         email: action.id,
//         userToken: action.token,
//       };
//   }
// };
// const [loginState, dispatch] = React.useReducer(
//   loginReducer,
//   initialLoginState,
// );
