const handleStartCommand = require('../commands/startCommand');
const handleLanguageCommand = require('../commands/languageCommand');
const handleSetLanguageCommand = require('../commands/setLanguageCommand');

function routeCommand(command, msg, match, bot, userLanguages, messages) {
    console.log(command);

    const chatId = msg.chat.id;
    const userLang = userLanguages[chatId] || 'en'; // Get the user's language

    switch (command) {
        case 'start':
            handleStartCommand(msg, bot, userLanguages, messages);
            break;
        case 'language':
            handleLanguageCommand(msg, bot, userLanguages, messages);
            break;
        default:
            if (command.startsWith('set_language_')) {
                handleSetLanguageCommand(msg, match, bot, userLanguages, messages);
            } else if (messages[command]) {
                // If the command exists in the messages object, send the corresponding message
                bot.sendMessage(chatId, messages[command][userLang], {parseMode: 'Markdown'});
            } else {
                // If the command does not exist in the messages object, send an error message
                bot.sendMessage(chatId, `Sorry, I don't understand the command: /${command}`, {parseMode: 'Markdown'});
            }
    }
}

module.exports = routeCommand;
