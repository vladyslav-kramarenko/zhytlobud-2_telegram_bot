const handleLanguageCommand = require('../commands/languageCommand');
const handleProjectCommand = require('../commands/projectHandler');

function routeCommand(command, msg, match, bot, userLanguages, messages) {

    const parts = command.split('_');

    console.log(parts);
    const prefix = parts[0];
    const chatId = msg.chat.id;
    const userLang = userLanguages[chatId] || 'en'; // Get the user's language

    switch (prefix) {
        case 'start':
            bot.sendMessage(chatId, messages['start'][userLang], {parseMode: 'Markdown'});
            break;
        case 'language':
            handleLanguageCommand(command,parts, chatId, bot, userLang,userLanguages, messages);
            break;
        case 'projects':
            handleProjectCommand(command,parts, chatId, bot, userLang, messages);
            break;
        default:
            if (messages[command]) {
                // If the command exists in the messages object, send the corresponding message
                bot.sendMessage(chatId, messages[command][userLang], {parseMode: 'Markdown'});
            } else {
                // If the command does not exist in the messages object, send an error message
                bot.sendMessage(chatId, `Sorry, I don't understand the command: /${command}`, {parseMode: 'Markdown'});
            }
    }
}

module.exports = routeCommand;
