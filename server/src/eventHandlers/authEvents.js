import Promise from 'bluebird';
import JWT from 'jsonwebtoken';
import { logger } from '../utilities/winston';
import conf from '../config';
import { authenticationError, tokenError } from '../utilities/errors';
import { validatePassword, populateUser } from '../models/userModel';
import * as db from '../db/postgres';
import { AUTHENTICATE, TOKEN, UNAUTHORIZED } from '../constants';


Promise.promisifyAll(JWT);

function extractToken(bearerToken) {
  const parts = bearerToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }
  return parts[1];
}

export const checkToken = async (bearer) => {
  let isAllowed;
  if (!bearer) return false;
  try {
    isAllowed = await JWT.verifyAsync(extractToken(bearer), conf.tokenSecret);
  } catch (e) {
    logger.error(tokenError(e.message).message);
  }
  return isAllowed;
};

const authenticate = async (data, socket) => {
  if (!data || !data.username || !data.password) return socket.emit(UNAUTHORIZED);
  logger.info(`We got authToken event for username: ${data.username}`);
  let user;
  try {
    user = await validatePassword(
      await populateUser({ username: data.username.toString() }, db),
      data.password.toString(),
    );
    const token = await JWT.signAsync(
      {
        username: user.username,
        display: user.display,
        roles: user.roles,
      },
      conf.tokenSecret,
      { expiresIn: conf.tokenOptions.expiresIn });
    socket.emit(TOKEN, { token });
  } catch (e) {
    logger.error(authenticationError(e.message).message);
    socket.emit(UNAUTHORIZED);
  }
};

export const attachAuthEvents = (socket) => {
  socket.on(AUTHENTICATE, data => authenticate(data, socket));
  socket.on('disconnect', () => {
    logger.info(`We got a disconnection: ${socket.id}`);
  });
};

