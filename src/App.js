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

import {Root} from 'native-base';

const Drawer = createDrawerNavigator();

const App = () => {
  const {setUser} = useStores().userStore;

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged');
      if (user && !user.emailVerified) {
        auth()
          .currentUser.reload()
          .then(() => {
            setUser(auth().currentUser);
          });
      } else {
        setUser(user);
      }
    });
  }, [setUser]);

  return (
    <Root>
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
    </Root>
  );
};
export default App;
