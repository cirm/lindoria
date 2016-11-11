import { logger } from './src/utilities/winston';
import conf from './src/config';
import { startServer } from './src/socketServer';

startServer();

logger.info('Loaded conf for %s env.', conf.envString);

