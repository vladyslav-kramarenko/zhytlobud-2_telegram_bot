function handleLanguageCommand(parts, chatId, bot, userLang,userLanguages, messages) {

    if (parts.length === 1) {
        // Handle the /language command
        let message = 'Please choose your language by sending one of the following commands:\n';
        for (const langCode in messages['language_name']) {
            message += `/language_set_${langCode} - ${messages['language_name'][langCode]}\n`;
        }
        bot.sendMessage(chatId, message, {parseMode: 'Markdown'});
    } else if (parts[1] === 'set') {
        // Handle the /language_set_<language_code> command
        const language = parts[2];
        if (!messages['language_name'][language]) {
            bot.sendMessage(chatId, `Sorry, I don't support the language: ${language}`, {parseMode: 'Markdown'});
            return;
        }
        userLanguages[chatId] = language;
        bot.sendMessage(chatId, `Language changed to ${messages['language_name'][language]}`, {parseMode: 'Markdown'});
    }
}

module.exports = handleLanguageCommand;
