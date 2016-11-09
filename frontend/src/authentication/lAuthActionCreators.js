import { AUTHENTICATE, LOGOUT, LOGIN } from './lAuthConstants';

export function authenticateUser(userData) {
  return {
    meta: { auth: true },
    type: AUTHENTICATE,
    data: userData,
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