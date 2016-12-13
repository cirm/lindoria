const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const createSalt = async () => await bcrypt.genSaltAsync(12);
const compareHash = async (password, hashedPassword) =>
  await bcrypt.compareAsync(password, hashedPassword);

module.exports = {
  createSalt,
  compareHash,
};
