import * as Immutable from 'immutable';
import createLogger from 'redux-logger';
import createStore from 'redux/lib/createStore';
import applyMiddleware from 'redux/lib/applyMiddleware';
import installDevTools from 'immutable-devtools';
import reducers from './reducers';
import { mapRemoteActions } from './remote/lRemoteActionsListeners';
import remoteActionMiddleware from './remote/lRemoteActionMiddleware';
import { socket } from './remote/lRemoteSocketServer';

const logger = createLogger();
const middlewares = [logger];
middlewares.push(remoteActionMiddleware(socket));
installDevTools(Immutable);

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares,
)(createStore);
const initialState = new Immutable.Map();
const store = createStoreWithMiddleware(reducers, initialState);

mapRemoteActions(socket, store);

export default store;
