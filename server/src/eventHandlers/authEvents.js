const Promise = require('bluebird');
const JWT = Promise.promisifyAll(require('jsonwebtoken'));
const logger = require('../utilities/winston');
const conf = require('../config');
const errors = require('../utilities/errors');
const User = require('../models/userModel');
const db = require('../db/postgres');
const eventConstants = require('../constants');


function extractToken(bearerToken) {
  const parts = bearerToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }
  return parts[1];
}

const checkToken = async(bearer) => {
  if (!bearer) return false;
  let isAllowed;
  try {
    isAllowed = await JWT.verifyAsync(extractToken(bearer), conf.tokenSecret);
  } catch (e) {
    logger.error(errors.tokenError(e.message).message);
  }
  return isAllowed;
};

const isUsernamePresent = (data, socket) => {
  if (!data || !data.username || !data.password) {
    socket.emit(eventConstants.UNAUTHORIZED);
    return false;
  }
  return true;
};

const authenticate = async(data, socket) => {
  if (isUsernamePresent(data, socket)) {
    logger.info(`We got authToken event for username: ${data.username}`);
    let user;
    try {
      user = await User.validatePassword(
        await User.populateUser({ username: data.username.toString() }, db),
        data.password.toString());
      const token = await JWT.signAsync(
        {
          username: user.username,
          display: user.display,
          roles: user.roles,
        },
        conf.tokenSecret,
        { expiresIn: conf.tokenOptions.expiresIn });
      socket.emit(eventConstants.TOKEN, { token });
    } catch (e) {
      logger.error(errors.authenticationError(e.message).message);
      socket.emit(eventConstants.UNAUTHORIZED);
    }
  }
};

const attachAuthEvents = (socket) => {
  socket.on(eventConstants.AUTHENTICATE, data => authenticate(data, socket));
  socket.on('disconnect', () => {
    logger.info(`We got a disconnection: ${socket.id}`);
  });
};

module.exports = {
  checkToken,
  attachAuthEvents,
};
