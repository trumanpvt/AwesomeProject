import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {LogBox, Platform, useWindowDimensions} from 'react-native';
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
import ModalAuthContainer from './components/ModalAuth';

import {changeLanguage, setRTL} from './i18n';

import {observer} from 'mobx-react-lite';
import LoadingOverlay from './components/Elements/LoadingOverlay';
import i18n from './i18n';

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
  const {userStore, localeStore, stateStore} = useStores();
  const {user, setUser} = userStore;
  const {language, setLoading} = localeStore;
  const {setOrientation} = stateStore;

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    setOrientation(windowDimensions);
  }, [setOrientation, windowDimensions]);

  useEffect(() => {
    return auth().onAuthStateChanged(updatedUser => {
      if (updatedUser && !updatedUser.emailVerified) {
        const currentUser = auth().currentUser;
        if (currentUser) {
          currentUser.reload().then(() => {
            setUser(auth().currentUser);
          });
        }
      } else {
        setUser(updatedUser);
      }
    });
  }, [setUser]);

  useEffect(() => {
    if (language && language !== i18n.language) {
      changeLanguage(language)
        .then(() => {
          setLoading(false);
          return setRTL(language);
        })
        .catch(() => {
          changeLanguage(i18n.language).then(() => setLoading(false));
        });
    }
  }, [language, setLoading]);

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
              {user ? (
                <Drawer.Screen name="ChatScreen" component={ChatScreen} />
              ) : null}
              <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            </Drawer.Navigator>
            <ModalAuthContainer />
            <LoadingOverlay />
          </ThemeProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default observer(App);
