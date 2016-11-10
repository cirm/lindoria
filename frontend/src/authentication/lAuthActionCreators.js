import { AUTHENTICATE, LOGOUT, LOGIN } from './lAuthConstants';

export function authenticateUser(userData) {
  return {
    meta: { auth: true },
    type: AUTHENTICATE,
    data: userData,
  };
}

export function queriedUpdates() {
  return {
    meta: { remote: true },
    type: 'QUERY_DATA',
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}

export function login(userToken) {
  return {
    type: LOGIN,
    data: userToken,
  };
}