const path = require('path');

const env = process.env.NODE_ENV || 'development';
const rootPath = path.normalize(`${__dirname}/../`);

const config = {
  development: {
    rootPath,
    envString: 'development',
    port: 4545,
    logFormat: 'dev',
    tokenSecret: 'secretString',
    tokenOptions: {
      algorithm: 'HS256',
      expiresIn: 3600,
    },
    db: {
      pgUser: process.env.POSTGRES_USER || 'geegomoonshine',
      pgPass: process.env.POSTGRES_PASSWORD || 'ToomasOnHeaDm123',
      port: process.env.POSTGRES_PORT || 5432,
      host: 'localhost',
      database: process.env.POSTGRES_DB || 'lindoriadb',
    },
  },
};

module.exports = config[env];
