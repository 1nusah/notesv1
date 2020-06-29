import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../components/context/context';
// drawer content
export default function DrawerContent(props) {
  const {signOut} = React.useContext(AuthContext);

  const [isDarkTheme, setIsDarktheme] = React.useState(false);
  const toggleTheme = () => {
    setIsDarktheme(!isDarkTheme);
  };

  const handleSignOut = () => {
    signOut();
  };
  // the various drawer items and components are here

  return (
    <View style={{flex: 1}} {...props}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              {/* <Avatar.Image source={{url: }} size={50} /> */}
              <View style={{flexDirection: 'row', padding: 10}}>
                <Title
                  style={{
                    color: '#4b0082',
                    fontSize: 30,
                    paddingHorizontal: 10,
                  }}
                  size={30}>
                  My
                </Title>
                <Title style={{color: '#ff0bac', fontSize: 30}}>Notes</Title>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Notes');
              }}></DrawerItem>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bell-outline" color={color} size={size} />
              )}
              label="Reminders"
              onPress={() => {
                props.navigation.navigate('Reminders');
              }}></DrawerItem>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Notes"
              onPress={() => {
                props.navigation.navigate('My Notes');
              }}></DrawerItem>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="plus-outline" color={color} size={size} />
              )}
              label="Add New Label"
              onPress={() => {
                props.navigation.navigate('Label');
              }}></DrawerItem>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}></DrawerItem>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('Support');
              }}></DrawerItem>
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text> Dark theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleSignOut}></DrawerItem>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
