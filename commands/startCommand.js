function handleStartCommand(msg, bot, userLanguages, messages) {
    const chatId = msg.chat.id;
    const userLang = userLanguages[chatId] || 'en'; // Get the user's language
    bot.sendMessage(chatId, messages['start'][userLang], {parseMode: 'Markdown'});
}

module.exports = handleStartCommand;