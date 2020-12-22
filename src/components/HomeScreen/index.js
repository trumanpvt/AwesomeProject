import React from 'react';
import {Container, Content} from 'native-base';
import Articles from '../Articles';
import Podcasts from '../Podcasts';
import Faq from '../Faq';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AppFooter from '../AppFooter';

const styles = StyleSheet.create({
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const HomeScreen = () => {
  const mode = useSelector((state) => state.mode);

  const renderPage = () => {
    switch (mode) {
      case 'PODCAST': {
        return <Podcasts />;
      }
      case 'FAQ': {
        return <Faq />;
      }
      default: {
        return <Articles />;
      }
    }
  };

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>{renderPage()}</Content>
      <AppFooter />
    </Container>
  );
};

HomeScreen.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default HomeScreen;
