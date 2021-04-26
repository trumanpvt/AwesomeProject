import React from 'react';

import {Text} from 'react-native';
import {Container, Content} from 'native-base';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const ChatScreen = () => {
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

export default ChatScreen;
