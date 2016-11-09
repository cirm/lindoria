import { Map } from 'immutable';
import { AUTHENTICATE, LOGIN, LOGOUT } from './lAuthConstants';
import decodeProfile from './lAuthToken';
import browserHistory from 'react-router/lib/browserHistory';

const tokenKey = 'lindoriaToken';

const login1 = state => {
  console.log('wheee');
  return state;
};
const login = (state, data) => {
  const token = data.token;
  const profile = decodeProfile(token);
  localStorage.setItem(tokenKey, JSON.stringify(token));
  return state.merge(new Map(profile));
};

const logout = state => {
  localStorage.removeItem(tokenKey);
  browserHistory.push('/');
  return state.clear();
};

const getInitialState = (state = new Map()) => {
  const token = JSON.parse(localStorage.getItem(tokenKey));
  if (!token) {
    return state;
  }
  const profile = decodeProfile(token);
  return state.merge(new Map(profile));
};

function authReducer(state = getInitialState(), action) {
  switch (action.type) {
    case AUTHENTICATE:
      return login1(state);
    case LOGIN:
      return login(state, action.data);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
}

export default authReducer;
