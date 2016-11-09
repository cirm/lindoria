import mapValues from 'lodash/mapValues';
import { login, logoutUser } from '../authentication/lAuthActionCreators';
import { dataUpdate } from '../landingBoard/lLandingActionCreators';

const remoteActionsMap = {
  TOKEN: login,
  BR_DATA: dataUpdate,
  ERROR: logoutUser,
};

export const mapRemoteActions = (socket, store) =>
  mapValues(remoteActionsMap, (value, key) =>
    socket.on(key, data =>
      store.dispatch(value(data))));
