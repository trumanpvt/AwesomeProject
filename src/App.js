import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppHeader from './components/AppHeader';

import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar/menu';
import HomeScreen from './components/HomeScreen';
import ModalContainer from './components/Modal';
import {useStores} from './store';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

const App = () => {
  const {setUser} = useStores().userStore;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged');
      if (user && !user.emailVerified) {
        user
          .reload()
          .then(() => {
            console.log('user reload success', user);
          })
          .catch((e) => {
            console.log('user reload failed', e);
          });
      }
      setUser(user);
    });

    return subscriber; // unsubscribe on unmount
  }, [setUser]);

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
