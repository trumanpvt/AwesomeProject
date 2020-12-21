import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Container} from 'native-base';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {initialState, reducers} from './reducers';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar/menu';
import HomeScreen from './components/HomeScreen';

const store = createStore(reducers, initialState);

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <Container>
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
          <AppFooter />
        </NavigationContainer>
      </Container>
    </Provider>
  );
};
export default App;
