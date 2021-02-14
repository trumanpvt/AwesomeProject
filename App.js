import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppHeader from './src/components/AppHeader';

import ProfileScreen from './src/components/ProfileScreen';
import ChatScreen from './src/components/ChatScreen';
import SideBar from './src/components/SideBar/menu';
import HomeScreen from './src/components/HomeScreen';
import ModalContainer from './src/components/Modal';

const Drawer = createDrawerNavigator();

const App = () => {
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
