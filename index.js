const TelegramBot = require('node-telegram-bot-api');
const ExcelJS = require('exceljs');

require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Define your language dictionary
let messages = {};

// Define a dictionary to store user language preferences
let userLanguages = {};

// Read data from Excel file
const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('messages.xlsx')
    .then(() => {
        try{
            const worksheet = workbook.getWorksheet(1);
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber !== 1) { // Skip the header row
                    const command = row.getCell(1).value;
                    messages[command] = {};
                    row.eachCell((cell, colNumber) => {
                        if (colNumber !== 1) { // Skip the command column
                            const language = worksheet.getRow(1).getCell(colNumber).value;
                            messages[command][language] = cell.value;
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userLang = userLanguages[chatId] || 'en'; // Get the user's language

    // Send a message in the user's preferred language
    bot.sendMessage(chatId, messages['start'][userLang], {parseMode: 'Markdown'});
});

bot.onText(/\/language/, (msg) => {
    const chatId = msg.chat.id;

    let message = 'Please choose your language by sending one of the following commands:\n';
    for (const langCode in messages['language_name']) {
        message += `/set_language_${langCode} - ${messages['language_name'][langCode]}\n`;
    }

    bot.sendMessage(chatId, message, {parseMode: 'Markdown'});
});


bot.onText(/\/set_language_(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const language = match[1]; // Get the language from the command

    // Check if the language is valid
    if (!messages['language_name'][language]) {
        bot.sendMessage(chatId, `Sorry, I don't support the language: ${language}`, {parseMode: 'Markdown'});
        return;
    }

    // Store the user's language preference
    userLanguages[chatId] = language;

    // Send a message in the user's preferred language
    bot.sendMessage(chatId, `Language changed to ${messages['language_name'][language]}`, {parseMode: 'Markdown'});
});

bot.onText(/\/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const command = match[1]; // Get the command from the message
    const userLang = userLanguages[chatId] || 'en'; // Get the user's language

    if (command === 'start' || command === 'language' || command.startsWith('set_language_')) {
        // Ignore the /start command because it's handled elsewhere
        return;
    }

    if (messages[command]) {
        // If the command exists in the messages object, send the corresponding message
        bot.sendMessage(chatId, messages[command][userLang], {parseMode: 'Markdown'});
    } else {
        // If the command does not exist in the messages object, send an error message
        bot.sendMessage(chatId, `Sorry, I don't understand the command: /${command}`, {parseMode: 'Markdown'});
    }
});

