require('dotenv').config();
import { Telegraf, Context } from 'telegraf';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// prettier-ignore
bot.start(ctx => ctx.reply('Hello i am Giphy bot. I am use api Giphy for delivery some gifs for you. Use eng keyboard for input some text'));

bot.on('message', ctx => {
    const message: any = ctx.message;
    const value: string = message.text.toLowerCase();

    const apiPath = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&rating=g&lang=en&q=${value}`;

    fetch(apiPath)
        .then(res => res.json())
        .then(json => {
            const { data } = json;
            const randomFile = data[Math.floor(Math.random() * data.length)];
            ctx.replyWithDocument(randomFile.images.original.mp4);
        });
});

bot.launch();

// Enable graceful stop
process.on('SIGINT', () => bot.stop('SIGINT')).on('SIGTERM', () => bot.stop('SIGTERM'));
