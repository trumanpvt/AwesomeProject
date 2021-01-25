import React from 'react';
import {Container, Content, Text} from 'native-base';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const ProfileScreen = () => {
  return (
    <Container style={styles.container}>
      <Content>
        <Text>ProfileScreen</Text>
      </Content>
    </Container>
  );
};

ProfileScreen.propTypes = {};
export default ProfileScreen;
