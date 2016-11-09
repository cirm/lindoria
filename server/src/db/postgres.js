import Promise from 'bluebird';
import monitor from 'pg-monitor';
import Pgp from 'pg-promise';
import { getEnvConf } from '../../src/config';
const conf = getEnvConf();

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

export const queryFunction = (string, values) => pool.func(string, values);
export const query = (string, values) => pool.query(string, values);
// export const transaction = (string, values) => pool.tx(string, values);

