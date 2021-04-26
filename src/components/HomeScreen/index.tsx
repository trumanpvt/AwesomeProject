import React from 'react';
import {Container} from 'native-base';
import Articles from '../Articles';
import Podcasts from '../Podcasts';
import News from '../News';
import AppFooter from '../AppFooter';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

const HomeScreen = observer(() => {
  const {mode} = useStores().footerStore;

  const renderPage = () => {
    switch (mode) {
      case 'PODCASTS': {
        return <Podcasts />;
      }
      case 'NEWS': {
        return <News />;
      }
      default: {
        return <Articles />;
      }
    }
  };

  return (
    <Container style={{paddingTop: 20}}>
      {renderPage()}
      <AppFooter />
    </Container>
  );
});

export default HomeScreen;
