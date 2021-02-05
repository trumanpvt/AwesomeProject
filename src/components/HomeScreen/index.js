import React from 'react';
import {Container, Content} from 'native-base';
import Articles from '../Articles';
import Podcasts from '../Podcasts';
import Faq from '../Faq';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import AppFooter from '../AppFooter';
import {useDataStore} from '../../store/context';
import {observer} from 'mobx-react-lite';

const styles = StyleSheet.create({
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const HomeScreen = observer(() => {
  const footerStore = useDataStore().footerStore;
  console.log('footerStore', footerStore);
  const {mode} = footerStore;

  const renderPage = () => {
    console.log('render');
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
});

HomeScreen.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default HomeScreen;
