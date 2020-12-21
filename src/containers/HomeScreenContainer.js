import React from 'react';
import HomeScreen from '../components/HomeScreen';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const HomeScreenContainer = () => {
  const mode = useSelector((state) => state.mode);
  return <HomeScreen mode={mode} />;
};

HomeScreenContainer.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default HomeScreenContainer;
