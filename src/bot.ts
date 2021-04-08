require('dotenv').config();
import { Telegraf } from 'telegraf';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

db.once('open', () => {
    bot.start(ctx => ctx.reply('Welcome'));
    bot.launch();
});

mongoose.connection.on('disconnected', () => console.log('Mongoose connection to DB disconnected'));

// Enable graceful stop
process.on('SIGINT', () => gracefulExit).on('SIGTERM', () => gracefulExit);

function gracefulExit() {
    mongoose.connection.close(() => {
        bot.stop('SIGTERM');
        console.log('Mongoose connection with DB is disconnected through app termination');
        process.exit(1);
    });
}
