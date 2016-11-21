import mapKeys from 'lodash/fp/mapKeys';
import { login, logoutUser } from '../authentication/lAuthActionCreators';
import { dataUpdate } from '../landingBoard/lLandingActionCreators';

const remoteActionsMap = {
  TOKEN: login,
  BR_DATA: dataUpdate,
  ERROR: logoutUser,
};

const mapRemoteActions = (socket, store) =>
  mapKeys(key =>
    socket.on(key, data =>
      store.dispatch(remoteActionsMap[key](data))),
  )(remoteActionsMap);

export default mapRemoteActions;
