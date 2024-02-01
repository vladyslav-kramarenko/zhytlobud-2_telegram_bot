// commands/projectHandler.js
const fetchData = require('../utils/fetchData');
const projects = require('../utils/projects');

async function handleComplexCommand(command, parts, chatId, bot, userLang, messages) {
    const project = parts[1];
    const section = parts[2];
    const section_name = parts[3];

    if (projects[project]) {
        if (section) {
            if(projects[project][section + "_" + section_name]) {
                const url = projects[project][section + "_" + section_name];
                const data = await fetchData(url);
                // Handle the /complex/section command

                let apartmentsByRooms = {};
                let apartmentsWithPatio = 0;
                for (const floor of data.data.floors) {
                    for (const item of floor.items) {
                        if (item.status === 'free') {
                            if (!apartmentsByRooms[item.rooms]) {
                                apartmentsByRooms[item.rooms] = 0;
                            }
                            apartmentsByRooms[item.rooms]++;
                            if (item.squares.some(square => square.type === 'patio')) {
                                apartmentsWithPatio++;
                            }
                        }
                    }
                }
                let message = `Here's the availability in the ${project} complex, section ${section}:\n`;
                for (const [rooms, count] of Object.entries(apartmentsByRooms)) {
                    message += `- **${count}** apartments with **${rooms}** rooms available\n`;
                }
                message += `- **${apartmentsWithPatio}** apartments with a patio available\n`;
                bot.sendMessage(chatId, message, {parseMode: 'Markdown'});
            }else{
                bot.sendMessage(chatId, messages["noCommand"][userLang] + `: /${command}`, {parseMode: 'Markdown'});
            }

        } else {
            // Handle the /complex command
            let totalAvailable = 0;
            let message = `Here's the availability in the ${project} complex:\n`;

            for (const section in projects[project]) {
                const url = projects[project][section];
                const data = await fetchData(url);
                const available = data.data.floors.reduce((sum, floor) => sum + floor.items.filter(item => item.status === 'free').length, 0);
                totalAvailable += available;
                message += `/projects_${project}_${section} - **${available}** apartments available\n`;
            }

            message = `Total available apartments in the ${project} complex: **${totalAvailable}**\n\n` + message;
            bot.sendMessage(chatId, message, {parseMode: 'Markdown'});
        }
    } else if (parts.length === 1) {
        // Handle the /projects command
        var projectNames = messages["projects"][userLang] + "\n\n";

        for (const p of Object.keys(projects)) {
            if (messages["projects_" + p]) {
                if (messages[`projects_${p}`][userLang]) {
                    projectNames += "/projects_" + p + " - " + messages[`projects_${p}`][userLang] + " \n";
                }
            } else {
                console.log("Undefined message for project: " + p);
            }
        }

        bot.sendMessage(chatId, `${projectNames}`, {parseMode: 'Markdown'});
    } else {
        bot.sendMessage(chatId, messages["noCommand"][userLang] + `: /${command}`, {parseMode: 'Markdown'});
    }
}

module.exports = handleComplexCommand;
