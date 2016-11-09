import { logger } from './src/utilities/winston';
import { getEnvConf } from './src/config';
import { startServer } from './src/socketServer';

startServer();

const conf = getEnvConf();
logger.info('Loaded conf for %s env.', conf.envString);

