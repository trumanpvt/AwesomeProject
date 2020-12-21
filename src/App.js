import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Container, Content} from 'native-base';
import AppFooterContainer from './containers/AppFooterContainer.js';
import AppHeaderContainer from './containers/AppHeaderContainer.js';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {initialState, reducers} from './reducers';
import HomeScreenContainer from './containers/HomeScreenContainer.js';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar/menu';

const store = createStore(reducers, initialState);

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <NavigationContainer>
          <Drawer.Navigator
            // openByDefault
            initialRouteName="HomeScreen"
            screenOptions={{
              header: ({scene}) => <AppHeader scene={scene} />,
              headerShown: true,
            }}
            drawerContent={(props) => <SideBar {...props} />}>
            <Drawer.Screen
              name="HomeScreen"
              component={HomeScreenContainer}
              options={{title: 'My profile'}}
            />
            <Drawer.Screen name="ChatScreen" component={ChatScreen} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          </Drawer.Navigator>
          <AppFooterContainer />
        </NavigationContainer>
      </Container>
    </Provider>
  );
};
export default App;
