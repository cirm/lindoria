import {
  SET_FOCUS,
  GET_CONTENT,
  BR_DATA,
  TOGGLE_CREATE_MENU,
  TOGGLE_CREATE_MODAL,
} from './lLandingActionConstants';

export function setFocus(data) {
  return {
    type: SET_FOCUS,
    data,
  };
}

export function getContent() {
  return {
    meta: { lindoria: true },
    type: GET_CONTENT,
  };
}

export function createData() {
  return {
    meta: { lindoria: true },
  };
}

export function dataUpdate(data) {
  return {
    type: BR_DATA,
    data,
  };
}

export function toggleCreateMenu(data) {
  return {
    type: TOGGLE_CREATE_MENU,
    data,
  };
}
