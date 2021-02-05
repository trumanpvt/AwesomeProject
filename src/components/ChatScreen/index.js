import React from 'react';
import {Container, Content, Text} from 'native-base';
import {MODES} from '../../constants';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const ChatScreen = ({mode = MODES.ARTICLES}) => {
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

ChatScreen.propTypes = {};
export default ChatScreen;
