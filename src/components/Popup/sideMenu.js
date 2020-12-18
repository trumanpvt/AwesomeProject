import React from 'react';
import {Container, Content, Text} from 'native-base';
import styles from './style.js';
// import PropTypes from "prop-types";
// import {NavigationActions} from 'react-navigation';
// import { ScrollContent, Text, Content } from "react-native";
// import {StackNavigator} from 'react-navigation';

const SideMenu = (props) => {
  const navigateToScreen = (route) => () => {
    // const navigateAction = NavigationActions.navigate({
    //   routeName: route,
    // });
    // props.navigation.dispatch(navigateAction);
    console.log('click menu item');
  };

  return (
    <Container style={styles.container}>
      <Container>
        <Content>
          <Text style={styles.sectionHeadingStyle}>Section 1</Text>
          <Content style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page1')}>
              Page1
            </Text>
          </Content>
        </Content>
        <Content>
          <Text style={styles.sectionHeadingStyle}>Section 2</Text>
          <Content style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page2')}>
              Page2
            </Text>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page3')}>
              Page3
            </Text>
          </Content>
        </Content>
        <Content>
          <Text style={styles.sectionHeadingStyle}>Section 3</Text>
          <Content style={styles.navSectionStyle}>
            <Text
              style={styles.navItemStyle}
              onPress={navigateToScreen('Page4')}>
              Page4
            </Text>
          </Content>
        </Content>
      </Container>
      <Content style={styles.footerContainer}>
        <Text>This is my fixed footer</Text>
      </Content>
    </Container>
  );
};

// SideMenu.propTypes = {
//   navigation: PropTypes.object,
// };

export default SideMenu;
