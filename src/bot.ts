require('dotenv').config();
import { Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import logger from './utils/logger';

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => logger.debug(`Failed to connect to DB ${err}`));

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

db.once('open', () => {
    bot.start(ctx => ctx.reply('Welcome'));
    bot.launch();
});

mongoose.connection.on('disconnected', () => logger.debug('Mongoose connection to DB disconnected'));

// Enable graceful stop
process.on('SIGINT', () => gracefulExit).on('SIGTERM', () => gracefulExit);

function gracefulExit() {
    mongoose.connection.close(() => {
        bot.stop('SIGTERM');
        logger.debug('Mongoose connection with DB is disconnected through app termination');
        process.exit(1);
    });
}
