import React from 'react';
import {Container, Content, Text} from 'native-base';
import {MODES} from '../../constants';
import Articles from '../Articles';
import Podcasts from '../Podcasts';
import Faq from '../Faq';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const ProfileScreen = ({mode = MODES.ARTICLES}) => {
  // const renderPage = () => {
  //   switch (mode) {
  //     case 'PODCAST': {
  //       return <Podcasts />;
  //     }
  //     case 'FAQ': {
  //       return <Faq />;
  //     }
  //     default: {
  //       return <Articles />;
  //     }
  //   }
  // };

  return (
    <Container style={styles.container}>
      <Content>
        <Text>ChatScreen</Text>
      </Content>
    </Container>
  );
};

ProfileScreen.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default ProfileScreen;
