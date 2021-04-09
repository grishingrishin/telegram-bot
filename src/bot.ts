require('dotenv').config();
import { Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import logger from './utils/logger';

mongoose.connect(`mongodb://localhost:${process.env.PORT}/`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => logger.error(`Failed to connect to DB ${err}`));
db.on('disconnected', () => logger.debug('Mongoose connection to DB disconnected'));

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

db.once('open', () => {
    bot.start(ctx => ctx.reply('Goodbye world'));
    bot.launch();
});

// Enable graceful stop
process.on('SIGINT', () => gracefulExit).on('SIGTERM', () => gracefulExit);

function gracefulExit() {
    mongoose.connection.close(() => {
        bot.stop('SIGTERM');
        logger.debug('Mongoose connection with DB is disconnected through app termination');
        process.exit(1);
    });
}
