/* global describe it */
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import authReducer from '../src/reducers/auth_reducer';
import JWT from 'jsonwebtoken';

const tokenSecret = 'SecretSauce';

describe('authReducer', () => {
  it('handles SET_AUTH with no previous state', () => {
    const initialState = undefined;
    const action = {
      type: 'SET_AUTH',
    };
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      is_authenticated: false,
      auth_pending: false,
    }));
  });

  it('handles no action.type', () => {
    const initialState = new Map();
    const action = {};
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(new Map());
  });

  it('handles SET_AUTH with no action.data', () => {
    const initialState = new Map();
    const action = {
      type: 'SET_AUTH',
    };
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(new Map({ is_authenticated: false, auth_pending: false }));
  });

  it('handles SET_AUTH with correct profile token', () => {
    const initialState = new Map({ is_authenticated: false, auth_pending: true });
    const profile = {
      username: 'User',
      display: 'super user',
      roles: ['admin'],
      iat: 123,
    };
    const token = JWT.sign(profile, tokenSecret);

    const action = {
      type: 'SET_AUTH',
      state: { token },
    };
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(new Map({
      is_authenticated: true,
      auth_pending: false,
      profile: fromJS(profile),
    }));
  });
  it('handles SET_AUTH with broken token', () => {
    const initialState = new Map({ is_authenticated: false });
    const action = {
      type: 'SET_AUTH',
      state: {
        token: true,
      },
    };
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(new Map({
      is_authenticated: false,
      auth_pending: false,
    }));
  });
  it('handles START_LOGIN', () => {
    const initialState = new Map({ is_authenticated: false });
    const action = {
      type: 'START_LOGIN',
    };
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(new Map({ is_authenticated: false, auth_pending: true }));
  });
});
