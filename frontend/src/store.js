import reducers from './reducers';
import createLogger from 'redux-logger';
import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import { mapRemoteActions } from './remote/lRemoteActionsListeners';
import remoteActionMiddleware from './remote/lRemoteActionMiddleware';
import { socket } from './remote/lRemoteSocketServer';
import { Map } from 'immutable';

const logger = createLogger();
const middlewares = [logger];
middlewares.push(remoteActionMiddleware(socket));

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares
)(createStore);
const store = createStoreWithMiddleware(reducers);

mapRemoteActions(socket, store);

export const getStore = () => store;
