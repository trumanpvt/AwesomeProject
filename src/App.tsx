import React, {useEffect} from 'react';

import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {useStores} from './store';
import auth from '@react-native-firebase/auth';

import AppHeader from './components/AppHeader';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar';
import HomeScreen from './components/HomeScreen';
import ModalContainer from './components/Modal';
import i18n from './i18n';

import {observer} from 'mobx-react-lite';

LogBox.ignoreLogs(['Remote debugger']);

const Drawer = createDrawerNavigator();

const App = () => {
  const {setUser} = useStores().userStore;

  const {language} = useStores().localeStore;

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged');
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
    if (i18n.language !== language) {
      console.log(i18n.language);
      i18n.changeLanguage(language).catch((e) => {
        console.log('i18n.changeLanguage error', e);
      });
    }
  }, [language]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          screenOptions={(props) => ({
            header: () => (
              <AppHeader
                openDrawer={props.navigation.openDrawer}
                name={props.route.name}
              />
            ),
            headerShown: true,
          })}
          drawerContent={({navigation, state}) => (
            <SideBar navigation={navigation} routeNames={state.routeNames} />
          )}>
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="ChatScreen" component={ChatScreen} />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
      <ModalContainer />
    </SafeAreaProvider>
  );
};

export default observer(App);
