import { transports, format, createLogger } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => `[${timestamp}] [${level}]${message}`);

const logger = createLogger({
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        }),
        new transports.File({ filename: 'debug.log', level: 'debug' }),
    ],
    format: combine(timestamp(), format.splat(), format.simple(), logFormat),
});

export default logger;
