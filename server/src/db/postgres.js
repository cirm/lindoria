const Promise = require('bluebird');
const monitor = require('pg-monitor');
const Pgp = require('pg-promise');
const conf = require('../config');

const options = { promiseLib: Promise };
monitor.attach(options);

const pgp = new Pgp(options);

const cn = {
  host: conf.db.host,
  port: conf.db.port,
  database: conf.db.database,
  user: conf.db.pgUser,
  password: conf.db.pgPass,
};

const pool = pgp(cn);

const queryFunction = (string, values) => pool.func(string, values);
const query = (string, values) => pool.query(string, values);
// export const transaction = (string, values) => pool.tx(string, values);

module.exports = {
  query,
  queryFunction,
};
