require('dotenv').config();
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.start(ctx => ctx.reply('Welcome'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
