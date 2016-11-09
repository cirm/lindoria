import { logger } from '../utilities/winston';
import JWT from 'jsonwebtoken';
import * as db from '../db/postgres';
import { User } from '../models/userModel';

export const getRoutes = async(router) => {
  router.get('/', getName);
  router.post('/auth', doAuth);
  router.get('/api/landing', (ctx, next) => ctx.body = "Leht töötab");
  router.redirect('/*', '/');
};

const getName = async(ctx, next) => {
  const name = await query('Select display, username, roles from web.users');
  logger.info(name);
  ctx.body = 'Hello ' + name[0].username;
};

const doAuth = async(ctx, next) => {
  logger.info(ctx.request.body.username);
  let username = ctx.request.body.username.toString();
  const user = new User({ username }, { db });
  const password = ctx.request.body.password.toString();
  const isPass = await user.authenticate(password);
  if (!isPass) ctx.throw(401);

  let token = await JWT.sign({ username: user.username, display: user.display, roles: user.roles },
    'SecretSauce',
    { expiresIn: '60m' });
  ctx.body = { token };
};