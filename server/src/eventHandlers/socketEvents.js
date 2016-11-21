import mapValues from 'lodash/mapValues';
import { attachAuthEvents, checkToken } from './authEvents';
import { logger } from '../utilities/winston';
import { ERROR } from '../constants';
import {
  getContent,
  createPerson,
  createDomain,
  createOrg,
  createProvince,
  editPerson,
  editProvince,
} from './lindoriaEvents';

const testingEvent = socket => socket.emit('tested');

const protectedRoutes = {
  testing: testingEvent,
  GET_CONTENT: getContent,
  CREATE_PERSON: createPerson,
  CREATE_ORGANIZATION: createOrg,
  CREATE_DOMAIN: createDomain,
  CREATE_PROVINCE: createProvince,
  EDIT_PERSON: editPerson,
  EDIT_PROVINCE: editProvince,
};

const attachProtectedEventsToSocket = (socket) => {
  mapValues(protectedRoutes, (fn, key) =>
    socket.on(key, async(data) => {
      if (!data || !data.token) {
        socket.emit(ERROR, 'Authentication error');
        return;
      }
      const isAllowed = await checkToken(data.token);
      if (!isAllowed) {
        socket.emit(ERROR, 'Authentication error');
        return;
      }
      fn(socket, data, isAllowed.roles);
    }));
};

const socketEvents = (socket) => {
  logger.info(`We got a connection: ${socket.id}`);
  attachProtectedEventsToSocket(socket);
  attachAuthEvents(socket);
};

export default socketEvents;