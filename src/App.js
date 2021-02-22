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
import {getCurrentAuthenticatedUser} from './util/auth';

const Drawer = createDrawerNavigator();

const App = () => {
  const stores = useStores();
  const {modal, setModal, setCloseModal} = stores.modalStore;
  const {setUser} = stores.userStore;

  useEffect(() => {
    setCloseModal();
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
          console.log('signIn fired', data);
          getCurrentAuthenticatedUser()
            .then((user) => {
              setUser(user);
              console.log('modal', modal);
              if (modal !== null && modal !== 'createPassword') {
                setCloseModal();
              }
            })
            .catch((e) => {
              console.log('Auth.currentAuthenticatedUser error', e);
            });
          break;
        case 'signOut':
          console.log('signOut fired');
          setUser({});
          break;
        case 'customOAuthState':
          console.log('customOAuthState data', data);
          break;
        default:
          if (
            data &&
            data.url &&
            data.url.includes('NEWUSER') &&
            modal !== 'createPassword'
          ) {
            console.log('setModal');
            setModal('createPassword');
          }
      }
    });

    getCurrentAuthenticatedUser()
      .then((result) => {
        setUser(result);
      })
      .catch((e) => {
        console.log('Auth.currentAuthenticatedUser() error', e);
      });
  }, [modal, setCloseModal, setModal, setUser]);

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
