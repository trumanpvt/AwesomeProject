import React from 'react';
import {Button, Footer, FooterTab, Text} from 'native-base';
import {MODES} from '../../constants';
import PropTypes from 'prop-types';

import styles from './style.js';

const AppFooter = ({mode = MODES.ARTICLES, setMode = () => {}}) => (
  <Footer>
    <FooterTab>
      <Button
        active={mode === MODES.ARTICLES}
        onPress={() => setMode(MODES.ARTICLES)}>
        <Text>Статьи</Text>
      </Button>
      <Button
        active={mode === MODES.PODCAST}
        onPress={() => setMode(MODES.PODCAST)}>
        <Text>Подкасты</Text>
      </Button>
      <Button active={mode === MODES.FAQ} onPress={() => setMode(MODES.FAQ)}>
        <Text>FAQ</Text>
      </Button>
    </FooterTab>
  </Footer>
);

AppFooter.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default AppFooter;
