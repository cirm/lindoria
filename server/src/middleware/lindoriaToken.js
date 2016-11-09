import JWT from 'jsonwebtoken';
import Promise from 'bluebird';
import { logger } from '../utilities/winston';

Promise.promisifyAll(JWT);

function extractToken(bearerToken) {
  const parts = bearerToken.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }
  return parts[1];
}

export const lindoriaToken = async(soc, next) => {
  const socket = soc;
  console.log(Object.keys(socket));
  console.log(Object.keys(socket.nsp));
  // if (!socket.request.headers.authorization) {
  //   logger.error(`Auth error: missing token1 @ ${socket.id}`);
  //   return next(new Error('Authentication error'));
  // }
  // const token = extractToken(socket.request.headers.authorization);
  // if (!token) {
  //   logger.error(`Auth error: invalid token2 @ ${socket.id}`);
  //   return next(new Error('Authentication error'));
  // }
  // try {
  //   socket.profile = await JWT.verify(token, 'SecretSauce');
  // } catch (e) {
  //   logger.error(`Auth error: ${e.message} @ ${socket.id}`);
  //   return next(new Error('Authentication error'));
  // }
  // if (!socket.profile) return next(new Error('Authentication error'));
  return next();
};
