const logger = require('./src/utilities/winston');
const conf = require('./src/config');
const startServer = require('./src/socketServer');

startServer();

logger.info('Loaded conf for %s env.', conf.envString);

