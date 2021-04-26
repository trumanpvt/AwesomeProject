import React, {useEffect} from 'react';

import {LogBox} from 'react-native';
import {Root} from 'native-base';

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
import {useTranslation} from 'react-i18next';

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
    i18n.changeLanguage(language).catch((e) => {
      console.log('i18n.changeLanguage error', e);
    });
  }, [language]);

  const {t} = useTranslation();

  return (
    <Root>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={t('routes.HomeScreen')}
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
          <Drawer.Screen
            name={t('routes.HomeScreen')}
            component={HomeScreen}
            options={{title: 'My profile'}}
          />
          <Drawer.Screen name={t('routes.ChatScreen')} component={ChatScreen} />
          <Drawer.Screen
            name={t('routes.ProfileScreen')}
            component={ProfileScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <ModalContainer />
    </Root>
  );
};
export default observer(App);
