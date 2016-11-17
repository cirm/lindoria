import { Map } from 'immutable';
import { CREATE_TYPE } from './lCreateActionConstants';

const setType = (state, type) => state.set('type', type);

function createReducer(state = new Map(), action) {
  switch (action.type) {
    case CREATE_TYPE:
      return setType(state, action.data);
    default:
      return state;
  }
}

export default createReducer;
