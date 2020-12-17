import {SET_MODE} from '../actions/actionTypes';
import {MODES} from "../constants";

export const reducers = (state = [], action) => {
    switch (action.type) {
        case SET_MODE: {
            return Object.assign({}, state, {
                mode: action.mode
            });
        }
        default:
            return state
    }
};

export const initialState = {
    mode: MODES.ARTICLES,
};