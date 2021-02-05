import React from 'react';
import {Button, Footer, FooterTab, Text} from 'native-base';
import {MODES} from '../../constants';
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import {setMode} from '../../actions';
import {useDataStore} from '../../Store/context';

const AppFooter = () => {
  const footerStore = useDataStore().footerStore;
  const {setMode} = footerStore;
  const mode = useSelector((state) => state.mode);

  const dispatch = useDispatch();

  const setScreenMode = (screenMode) => dispatch(setMode(screenMode));

  return (
    <Footer>
      <FooterTab>
        <Button
          active={mode === MODES.ARTICLES}
          onPress={() => setScreenMode(MODES.ARTICLES)}>
          <Text>Статьи</Text>
        </Button>
        <Button
          active={mode === MODES.PODCAST}
          onPress={() => setScreenMode(MODES.PODCAST)}>
          <Text>Подкасты</Text>
        </Button>
        <Button
          active={mode === MODES.FAQ}
          onPress={() => setScreenMode(MODES.FAQ)}>
          <Text>FAQ</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

AppFooter.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default AppFooter;
