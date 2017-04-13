// @flow
const mapKeys = require('lodash/fp/mapKeys');
const authEvents = require('./authEvents');
const logger = require('../utilities/winston');
const events = require('../constants');
const lindoriaEvents = require('./lindoriaEvents');

const testingEvent = socket => socket.emit('tested');

const protectedRoutes = {
  testing: testingEvent,
  GET_CONTENT: lindoriaEvents.getContent,
  CREATE_PERSON: lindoriaEvents.createPerson,
  CREATE_ORGANIZATION: lindoriaEvents.createOrg,
  CREATE_DOMAIN: lindoriaEvents.createDomain,
  CREATE_PROVINCE: lindoriaEvents.createProvince,
  CREATE_HOLDING: lindoriaEvents.createHolding,
  EDIT_PERSON: lindoriaEvents.editPerson,
  EDIT_PROVINCE: lindoriaEvents.editProvince,
};

const attachProtectedEventsToSocket = socket =>
  mapKeys(key =>
    socket.on(key, async (data) => {
      if (!data || !data.token) {
        socket.emit(events.ERROR, 'Authentication error');
        return;
      }
      const isAllowed = await authEvents.checkToken(data.token);
      if (isAllowed) {
        protectedRoutes[key](socket, data, isAllowed.roles);
      } else socket.emit(events.ERROR, 'Authentication error');
    }))(protectedRoutes);


const socketEvents = (socket) => {
  logger.info(`We got a connection: ${socket.id}`);
  attachProtectedEventsToSocket(socket);
  authEvents.attachAuthEvents(socket);
};

module.exports = socketEvents;
