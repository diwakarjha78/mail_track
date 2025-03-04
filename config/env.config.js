import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;

// Telegram
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
export const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Gmail with nodemailer
export const MAIL_HOST = process.env.MAIL_HOST
export const MAIL_PORT = Number(process.env.MAIL_PORT)
export const MAIL_USER = process.env.MAIL_USER
export const MAIL_PASS = process.env.MAIL_PASS
