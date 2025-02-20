import { url } from 'inspector';
import { Telegraf } from 'telegraf';

const TOKEN = '8199185372:AAGOo1M6D5j41OGXBE2yraMxIvbrzt7hO7k'
const webLink = 'https://code-quest-dashboard.vercel.app/'
const bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Welcome To Code Quest', {reply_markup: {keyboard: [[{text: "Code Quest", web_app: {url:webLink}}]]}}))

bot.launch()

