import React from 'react';
import AppFooter from '../components/AppFooter';
import {useDispatch, useSelector} from 'react-redux';
import {setMode} from '../actions';
import PropTypes from 'prop-types';

const AppFooterContainer = () => {
  const mode = useSelector((state) => state.mode);

  const dispatch = useDispatch();

  return <AppFooter mode={mode} setMode={(mode) => dispatch(setMode(mode))} />;
};

AppFooterContainer.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};

export default AppFooterContainer;
