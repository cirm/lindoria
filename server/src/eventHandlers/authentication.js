import { logger } from '../utilities/winston';
import { authenticationError } from '../utilities/errors';
import Promise from 'bluebird';
import JWT from 'jsonwebtoken';
import { User } from '../models/userModel';
import * as db from '../db/postgres';
import { AUTHENTICATE, TOKEN, UNAUTHORIZED } from '../constants';
import mapValues from 'lodash/mapValues';
import { getContent, createPerson } from './lindoriaEvents';

const testing = (socket) => {
  socket.emit('tested');
};

const lindoriaActions = {
  testing,
  GET_CONTENT: getContent,
  CREATE_PERSON: createPerson,
};

Promise.promisifyAll(JWT);

function extractToken(bearerToken) {
  const parts = bearerToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }
  return parts[1];
}

const checkToken = async(bearer) => {
  let isAllowed;
  if (!bearer) return false;
  const token = extractToken(bearer);
  try {
    isAllowed = await JWT.verify(token, 'SecretSauce');
  } catch (e) {
    logger.error(`Token verification error: ${e.message}`);
  }
  return isAllowed;
};

const attachLindoriaEventsToSocket = socket => {
  mapValues(lindoriaActions, (fn, key) =>
    socket.on(key, async data => {
      if (!data || !data.token) {
        socket.emit('ERROR', 'Authentication error');
        return;
      }
      const isAllowed = await checkToken(data.token);
      if (!isAllowed) {
        socket.emit('ERROR', 'Authentication error');
        return;
      }
      fn(socket, data);
    }));
};

export const authEvents = async(socket) => {
  logger.info(`We got a connection: ${socket.id}`);
  attachLindoriaEventsToSocket(socket);
  socket.on(AUTHENTICATE, async(data) => {
    logger.info(`We got authToken event for username: ${data.username}`);
    const user = new User({ username: data.username }, { db });
    let shouldAccess;
    try {
      shouldAccess = await user.authenticate(data.password);
    } catch (e) {
      logger.error(authenticationError().message);
    }
    if (shouldAccess) {
      const token = await JWT.sign(
        {
          username: user.username,
          display: user.display,
          roles: user.roles,
        },
        'SecretSauce',
        { expiresIn: '60m' });
      socket.emit(TOKEN, { token });
    } else {
      socket.emit(UNAUTHORIZED);
    }
  });
  socket.on('disconnect', () => {
    logger.info(`We got a disconnection: ${socket.id}`);
  });
};
