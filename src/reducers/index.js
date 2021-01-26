import {SET_MODE, SET_USER} from '../actions/actionTypes';
import {MODES} from '../constants';
import auth from '@react-native-firebase/auth';

export const reducers = (state = [], action) => {
  switch (action.type) {
    case SET_MODE: {
      return {
        ...state,
        mode: action.mode,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

export const initialState = {
  mode: MODES.ARTICLES,
  user: auth().currentUser,
};
