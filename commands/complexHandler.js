// commands/complexHandler.js
const fetchData = require('../utils/fetchData');
const complexes = require('../utils/complexes');

async function handleComplexCommand(parts, chatId, bot, userLang, messages) {

    const complex = parts[1];
    const section = parts[2];

    if (complexes[complex]) {
        if (section) {
            const url = complexes[complex][section];
            const data = await fetchData(url);
            // Handle the /complex/section command
            // ...
        } else {
            // Handle the /complex command
            // ...
        }
    } else {
        bot.sendMessage(chatId, `Sorry, I don't understand the command: /${command}`, {parseMode: 'Markdown'});
    }
}

module.exports = handleComplexCommand;
