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
import {View} from 'react-native';
import {StatusBar} from 'react-native';
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
  const initialLoginState = {
    isLoading: true,
    userName: null,
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
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          userToken: null,
        };

      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
          userName: action.id,
          userToken: action.token,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = React.useMemo(() => ({
    signIn: (userName, password) => {
      let userToken;
      userName = null;
      if (userName == 'user' && password == 'pass') {
        userToken = 'asdfgh';
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: () => {
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      setUserToken('said');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
      dispatch({type: 'REGISTER', token: 'asdfgh'});
    }, 3000);
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
            {/* <Drawer.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Drawer.Screen
              name="Sign Up"
              component={SignUp}
              options={{headerShown: false}}
            /> */}
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
