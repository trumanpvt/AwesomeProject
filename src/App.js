import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppHeader from './components/AppHeader';
import {DataStoreProvider} from './store/context';

import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar/menu';
import HomeScreen from './components/HomeScreen';
import ModalContainer from "./components/Modal";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <DataStoreProvider>
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
    </DataStoreProvider>
  );
};
export default App;
