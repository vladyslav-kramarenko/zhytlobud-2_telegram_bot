function handleLanguageCommand(msg, bot, userLanguages, messages) {
    const chatId = msg.chat.id;

    let message = 'Please choose your language by sending one of the following commands:\n';
    for (const langCode in messages['language_name']) {
        message += `/set_language_${langCode} - ${messages['language_name'][langCode]}\n`;
    }

    bot.sendMessage(chatId, message, {parseMode: 'Markdown'});
}

module.exports = handleLanguageCommand;