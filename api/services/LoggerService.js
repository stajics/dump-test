const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: './log/log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: process.env.ENV === 'development' ? 'debug' : 'info',
});

export const logger = new winston.Logger({ // eslint-disable-line
  transports: [
    transport,
  ],
});
