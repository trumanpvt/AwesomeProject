import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppHeader from './components/AppHeader';

import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar/menu';
import HomeScreen from './components/HomeScreen';
import ModalContainer from './components/Modal';
import {Hub} from 'aws-amplify';
import {useStores} from './store';
import {getCurrentAuthenticatedUserInfo} from './util/auth';

const Drawer = createDrawerNavigator();

const App = () => {
  const stores = useStores();
  const {setCloseModal} = stores.modalStore;
  const {setUser} = stores.userStore;

  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
          getCurrentAuthenticatedUserInfo()
            .then((user) => {
              setUser(user);
              setCloseModal();
            })
            .catch((e) => {
              console.log('Auth.currentAuthenticatedUser error');
            });
          break;
        case 'signOut':
          setUser({});
          break;
        case 'customOAuthState':
          console.log('customOAuthState');
      }
    });
  }, [setCloseModal, setUser]);

  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            header: ({scene}) => <AppHeader scene={scene} />,
            headerShown: true,
          }}
          drawerContent={(props) => <SideBar {...props} />}>
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{title: 'My profile'}}
          />
          <Drawer.Screen name="ChatScreen" component={ChatScreen} />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
      <ModalContainer />
    </>
  );
};
export default App;
