import winston from 'winston';
import moment from 'moment';

winston.emitErrs = true;

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExeptions: true,
      json: false,
      colorize: true,
      timestamp: () => moment().format('D MMM HH:mm:ss'),
    }),
  ],
  exitOnError: false,
});

export const stream = {
  write: message => {
    logger.debug(message.slice(0, -1));
  },
};
