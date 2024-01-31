function handleSetLanguageCommand(msg, match, bot, userLanguages, messages) {
    const chatId = msg.chat.id;
    const command = match[1]; // Get the full command from the match

    // Extract the language code from the command
    const language = command.replace('set_language_', '');

    // Check if the language is valid
    if (!messages['language_name'][language]) {
        bot.sendMessage(chatId, `Sorry, I don't support the language: ${language}`, {parseMode: 'Markdown'});
        return;
    }

    // Store the user's language preference
    userLanguages[chatId] = language;

    // Send a message in the user's preferred language
    bot.sendMessage(chatId, `Language changed to ${messages['language_name'][language]}`, {parseMode: 'Markdown'});
}

module.exports = handleSetLanguageCommand;
