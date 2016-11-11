import mapValues from 'lodash/mapValues';
import { attachAuthEvents, checkToken } from './authEvents';
import { logger } from '../utilities/winston';
import { ERROR } from '../constants';
import { getContent, createPerson, createDomain, createOrg, createProvince } from './lindoriaEvents';

const testingEvent = socket => socket.emit('tested');

const protectedRoutes = {
  testing: testingEvent,
  GET_CONTENT: getContent,
  CREATE_PERSON: createPerson,
  CREATE_ORG: createOrg,
  CREATE_DOMAIN: createDomain,
  CREATE_PROVINCE: createProvince,
};

const attachProtectedEventsToSocket = (socket) => {
  mapValues(protectedRoutes, (fn, key) =>
    socket.on(key, async (data) => {
      if (!data || !data.token) {
        socket.emit(ERROR, 'Authentication error');
        return;
      }
      const isAllowed = await checkToken(data.token);
      if (!isAllowed) {
        socket.emit(ERROR, 'Authentication error');
        return;
      }
      fn(socket, data);
    }));
};

const socketEvents = (socket) => {
  logger.info(`We got a connection: ${socket.id}`);
  attachProtectedEventsToSocket(socket);
  attachAuthEvents(socket);
};

export default socketEvents;