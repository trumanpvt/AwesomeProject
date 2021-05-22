import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {LogBox, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors, ThemeProvider} from 'react-native-elements';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {useStores} from './store';
import auth from '@react-native-firebase/auth';

import AppHeader from './components/AppHeader';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar';
import BlogScreen from './components/BlogScreen';
import ModalContainer from './components/Modal';

import {changeLanguage} from './i18n';

import {observer} from 'mobx-react-lite';
import LoadingOverlay from './components/LoadingOverlay';

LogBox.ignoreLogs(['Remote debugger', 'Reanimated']);

const Drawer = createDrawerNavigator();

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

const App = () => {
  const {userStore, localeStore} = useStores();
  const {user, setUser} = userStore;
  const {language} = localeStore;

  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      if (user && !user.emailVerified) {
        const currentUser = auth().currentUser;
        if (currentUser) {
          currentUser.reload().then(() => {
            setUser(auth().currentUser);
          });
        }
      } else {
        setUser(user);
      }
    });
  }, [setUser]);

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <ThemeProvider theme={theme}>
            <Drawer.Navigator
              initialRouteName="HomeScreen"
              screenOptions={props => ({
                header: () => (
                  <AppHeader
                    openDrawer={props.navigation.openDrawer}
                    name={props.route.name}
                  />
                ),
                headerShown: true,
              })}
              drawerContent={({navigation, state}) => (
                <SideBar
                  navigation={navigation}
                  routeNames={state.routeNames}
                />
              )}>
              <Drawer.Screen name="HomeScreen" component={HomeScreen} />
              {user ? (
                <Drawer.Screen name="BlogScreen" component={BlogScreen} />
              ) : null}
              <Drawer.Screen name="ChatScreen" component={ChatScreen} />
              <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            </Drawer.Navigator>
            <ModalContainer />
            <LoadingOverlay />
          </ThemeProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default observer(App);
