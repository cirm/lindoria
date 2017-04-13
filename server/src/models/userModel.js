const crypto = require('../utilities/bcrypt');


function getRawUser(data) {
  return {
    username: data.username,
    display: data.display,
    roles: data.roles,
    password: data.password,
  };
}

const populateUser = async (user, db) => {
  let qr = await db.query(
    'SELECT display, hpassword, salt, roles FROM web.users WHERE username = $1;',
    [user.username]);
  if (!qr[0]) throw new Error(`No record of user: ${user.username}`);
  qr = qr[0];
  return getRawUser({
    username: user.username,
    display: qr.display,
    roles: qr.roles,
    password: qr.hpassword,
  });
};

const validatePassword = async (user, passwordToMatch) => {
  if (!user || !user.username || !passwordToMatch) throw new Error('Wrong username/password combination');
  const canAccess = await crypto.compareHash(passwordToMatch, user.password);
  if (!canAccess) throw new Error('Wrong username/password combination');
  return user;
};

module.exports = {
  validatePassword,
  populateUser,
};
