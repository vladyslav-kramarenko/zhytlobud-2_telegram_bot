const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const importMessagesFromExcel = require('./utils/excelImport');
const routeCommand = require('./utils/commandRouter');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

let userLanguages = {};

// Read data from Excel file
importMessagesFromExcel('data/messages.xlsx')
    .then((messages) => {
        bot.onText(/\/(.+)/, (msg, match) => {
            const command = match[1]; // Get the command from the message
            routeCommand(command, msg, match, bot, userLanguages, messages);
        });
    })
    .catch((error) => {
        console.error('Error during initialization:', error);
    });
