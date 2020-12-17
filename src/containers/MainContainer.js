import React from 'react';
import Main from '../components/Main';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const MainContainer = () => {
  const mode = useSelector((state) => state.mode);
  return <Main mode={mode} />;
};

MainContainer.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default MainContainer;
