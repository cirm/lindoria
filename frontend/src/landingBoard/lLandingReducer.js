import { Map, fromJS } from 'immutable';
import {
  SET_FOCUS,
  GET_CONTENT,
  BR_DATA,
  TOGGLE_CREATE_MENU,
  TOGGLE_CREATE_MODAL,
} from './lLandingActionConstants';

const updateFocus = (state, data) => state.set('focus', fromJS(data));

const dataUpdate = (state, data) => state
  .set('domains', fromJS(data.domains))
  .set('provinces', fromJS(data.provinces))
  .set('persons', fromJS(data.persons));

const getContent = state => state;

const toggleCreateMenu = (state, data) => state.set('createMenu', fromJS(data));

function landingReducer(state = new Map(), action) {
  switch (action.type) {
    case TOGGLE_CREATE_MENU:
      return toggleCreateMenu(state, action.data);
    case SET_FOCUS:
      return updateFocus(state, action.data);
    case GET_CONTENT:
      return getContent(state);
    case BR_DATA:
      return dataUpdate(state, action.data);
    default:
      return state;
  }
}

export default landingReducer;
