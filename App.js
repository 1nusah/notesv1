import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from './src/pages/splash';
import HomePage from './src/pages/homepage';
import Landing from './src/pages/landing';
import SignUp from './src/pages/signup';
import MyNotes from './src/pages/mynotes';
import Login from './src/pages/login';
import AddNotes from './src/pages/addNotes';
import DrawerContent from './src/pages/drawerContent';
import Reminders from './src/pages/reminders';
import Settings from './src/pages/settings';
import Support from './src/pages/support';
import Label from './src/pages/label';
import {AuthContext} from './src/components/context/context';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken('said');
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken('said');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Splash />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Drawer.Screen
            name="Sign Up"
            component={SignUp}
            options={{headerShown: false}}
          />
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
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
