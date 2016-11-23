import { Map, fromJS } from 'immutable';
import {
  SET_LANDING_FOCUS,
  GET_CONTENT,
  TOGGLE_CREATE_MENU,
  LOAD_EDIT_FOCUS,
  REMOVE_EDIT_FOCUS,
} from './lLandingActionConstants';

const startEditFocus = (state, data) => state.set('editFocus', data);

const removeEditFocus = state => state.delete('editFocus');

const updateFocus = (state, data) => state.set('focus', fromJS(data));

const getContent = state => state;

const toggleCreateMenu = (state, data) => state.set('createMenu', fromJS(data));

function landingReducer(state = new Map(), action) {
  switch (action.type) {
    case TOGGLE_CREATE_MENU:
      return toggleCreateMenu(state, action.data);
    case SET_LANDING_FOCUS:
      return updateFocus(state, action.data);
    case GET_CONTENT:
      return getContent(state);
    case LOAD_EDIT_FOCUS:
      return startEditFocus(state, action.data);
    case REMOVE_EDIT_FOCUS:
      return removeEditFocus(state, action.data);
    default:
      return state;
  }
}

export default landingReducer;
