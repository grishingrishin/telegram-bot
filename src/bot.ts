import { Telegram } from 'telegraf';
export default new Telegram(process.env.TELEGRAM_TOKEN);
